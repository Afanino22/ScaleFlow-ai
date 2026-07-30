// Production server for the built site. The TanStack Start build emits a portable
// fetch handler (dist/server/server.js) plus static client assets (dist/client);
// this wraps them in a Bun server on port 3000 — static files first, SSR for the
// rest. Also handles API endpoints for form submissions (contact + booking).
// Run `bun run build` before starting. Restart it with `bun run publish`.
import handler from "./dist/server/server.js";

// Pinned, NOT read from the environment.
const PORT = 3000;
const HOST = "0.0.0.0";
const CLIENT_DIR = `${import.meta.dir}/dist/client`;
const BUSINESS_EMAIL = "contact@scaleflowai.co.uk";

// Knock API config — env vars set via Knock integration
const KNOCK_API_KEY = process.env.KNOCK_API_KEY;
const KNOCK_SIGNING_KEY = process.env.KNOCK_SIGNING_KEY;
const KNOCK_API_BASE = "https://api.knock.app/v1";

// Free PORT regardless of which user owns the current listener.
const freePort =
  `for _ in $(seq 1 25); do ` +
  `pids=$(lsof -t -iTCP:${String(PORT)} -sTCP:LISTEN 2>/dev/null || true); ` +
  `if [ -z "$pids" ]; then exit 0; fi; ` +
  `kill $pids 2>/dev/null || true; sleep 0.2; ` +
  `done`;

// ─── Form Handlers ──────────────────────────────────────────────────────────

type ContactForm = {
  name: string;
  email: string;
  company: string;
  industry: string;
  message: string;
};

type FreeTrialForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  size: string;
  type?: string;
};

async function sendKnockNotification(
  subject: string,
  body: string,
): Promise<boolean> {
  if (!KNOCK_API_KEY) return false;

  try {
    // Knock Trigger Workflow API — send notification to the business email
    const res = await fetch(`${KNOCK_API_BASE}/workflows/form-submission/trigger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KNOCK_API_KEY}`,
      },
      body: JSON.stringify({
        recipients: [{ id: "business", email: BUSINESS_EMAIL }],
        data: {
          subject,
          body,
        },
        tenant: "scaleflow-ai",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendKnockBroadcast(
  subject: string,
  body: string,
): Promise<boolean> {
  if (!KNOCK_API_KEY) return false;

  try {
    // Knock Notify API — alternative approach
    const res = await fetch(`${KNOCK_API_BASE}/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KNOCK_API_KEY}`,
      },
      body: JSON.stringify({
        recipients: [{ id: "business", email: BUSINESS_EMAIL }],
        workflow: "default",
        actor: { id: "website", name: "ScaleFlow AI Website" },
        data: {
          subject,
          message: body,
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function notify(subject: string, body: string): Promise<boolean> {
  // Try both Knock approaches, log fallback if both fail
  const ok =
    (await sendKnockNotification(subject, body)) ||
    (await sendKnockBroadcast(subject, body));

  if (!ok) {
    // Fallback: log to file
    const logLine = `[${new Date().toISOString()}] ${subject}\n${body}\n---\n`;
    try {
      await Bun.write(Bun.file("/home/team/shared/form_submissions.log"), logLine, {
        append: true,
      });
    } catch {}
  }

  return ok;
}

// ─── Request Router ─────────────────────────────────────────────────────────

async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { pathname } = url;

  // ── API: Contact Form ───────────────────────────────────────────────────
  if (pathname === "/api/contact" && req.method === "POST") {
    try {
      const data: ContactForm = await req.json();
      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Industry: ${data.industry}`,
        ``,
        `Message:`,
        data.message,
      ].join("\n");

      const notified = await notify(
        `Contact Form — ${data.name} from ${data.company}`,
        body,
      );

      return Response.json({ ok: true, notified });
    } catch (err) {
      return Response.json({ ok: false, error: String(err) }, { status: 400 });
    }
  }

  // ── API: Free Trial Signup ──────────────────────────────────────────────────
  if (pathname === "/api/booking" && req.method === "POST") {
    try {
      const data: FreeTrialForm = await req.json();
      const isTrial = data.type === "free-trial" || !data.leads;
      const prefix = isTrial ? "FREE TRIAL SIGNUP" : "Booking Request";

      const body = [
        `=== ${prefix} ===`,
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Company: ${data.company}`,
        `Industry: ${data.industry}`,
        `Team Size: ${data.size}`,
      ].join("\n");

      const notified = await notify(
        `${prefix} — ${data.name} from ${data.company}`,
        body,
      );

      if (!notified) {
        // Also write to a file the owner can easily check
        await Bun.write(
          Bun.file("/home/team/shared/leads.log"),
          `[${new Date().toISOString()}] ${data.name} — ${data.email} — ${data.company} (${data.industry})\n`,
          { append: true },
        ).catch(() => {});
      }

      return Response.json({ ok: true, notified });
    } catch (err) {
      return Response.json({ ok: false, error: String(err) }, { status: 400 });
    }
  }

  // ── Static Files ─────────────────────────────────────────────────────────
  if (pathname !== "/") {
    const file = Bun.file(CLIENT_DIR + pathname);
    if (await file.exists()) return new Response(file);
  }

  // ── SSR — TanStack app handles routing ────────────────────────────────────
  return (
    handler as { fetch: (r: Request) => Response | Promise<Response> }
  ).fetch(req);
}

// ─── Server ─────────────────────────────────────────────────────────────────

for (let attempt = 1; ; attempt++) {
  await Bun.$`sudo sh -c ${freePort}`.quiet().nothrow();
  try {
    Bun.serve({
      port: PORT,
      hostname: HOST,
      fetch: handleRequest,
    });
    break;
  } catch (err) {
    if (attempt >= 10) throw err;
    await Bun.sleep(200);
  }
}

console.log(`team-site serving on http://${HOST}:${String(PORT)}`);
