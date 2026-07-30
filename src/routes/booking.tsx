import { useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/booking")({
  component: Booking,
});

const BUSINESS_EMAIL = "contact@scaleflowai.co.uk";

function Booking() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const fd = new FormData(e.currentTarget);
    const data = {
      name: (fd.get("t-name") as string) || "",
      email: (fd.get("t-email") as string) || "",
      phone: (fd.get("t-phone") as string) || "",
      company: (fd.get("t-company") as string) || "",
      industry: (fd.get("t-industry") as string) || "",
      size: (fd.get("t-size") as string) || "",
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "free-trial" }),
      });

      if (res.ok) {
        setSent(true);
        setSending(false);
        return;
      }
    } catch {
      // Network error — fallback to mailto below
    }

    // Fallback: open email client with data pre-filled
    const body = [
      `=== Free Trial Signup ===`,
      ``,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "—"}`,
      `Company: ${data.company}`,
      `Industry: ${data.industry}`,
      `Team Size: ${data.size}`,
    ].join("\n");

    window.location.href =
      `mailto:${BUSINESS_EMAIL}?subject=Free Trial — ${encodeURIComponent(data.name)} from ${encodeURIComponent(data.company)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setSending(false);
  };

  return (
    <>
      {/* Header */}
      <section className="hero-gradient section-padding pt-28 pb-20">
        <div className="mx-auto max-w-7xl text-center">
          {sent ? (
            <>
              <span className="mb-4 inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
                Trial Started 🎉
              </span>
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                You're all set, <span className="text-teal">we're on it</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                We'll be in touch within 24 hours to set up your free trial environment.
                No calls needed — we'll do everything over email.
              </p>
              <Link to="/" className="btn-primary mt-8 inline-flex">
                Back to Home
              </Link>
            </>
          ) : (
            <>
              <span className="mb-4 inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
                Start Free Trial
              </span>
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                Start your <span className="text-teal">7-day free trial</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                No calls. No commitment. Just tell us about your business and we'll set up a
                personalised demo environment so you can see your Digital Employee in action.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Left Info */}
            <div className="lg:col-span-2">
              {!sent && (
                <>
                  <h2 className="mb-6 text-2xl font-bold text-obsidian">How the free trial works</h2>

                  <div className="space-y-6">
                    {[
                      {
                        step: "01",
                        title: "Tell us about your business",
                        desc: "Fill in the form. Takes 1 minute. No call needed.",
                      },
                      {
                        step: "02",
                        title: "We build your demo",
                        desc: "We customise a Digital Employee for your industry and needs.",
                      },
                      {
                        step: "03",
                        title: "We send you access",
                        desc: "You get a link to your live demo environment — try it out, share it with your team.",
                      },
                      {
                        step: "04",
                        title: "Love it? Upgrade or buy",
                        desc: "If it works for you, choose a plan and go live. No pressure.",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-teal/10 text-sm font-bold text-teal">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="font-semibold text-obsidian">{item.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 rounded-2xl border border-teal/20 bg-teal/5 p-6">
                    <h3 className="font-bold text-obsidian">Already know what you want?</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Browse our plans on the{" "}
                      <Link to="/pricing" className="font-semibold text-teal underline">
                        pricing page
                      </Link>{" "}
                      and buy directly — no call needed.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Right: Trial Form */}
            <div className="lg:col-span-3">
              {!sent && (
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <h2 className="mb-6 text-xl font-bold text-obsidian">Start your free trial</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="t-name" className="mb-2 block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <input type="text" name="t-name" id="t-name" required placeholder="Jane Smith" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20" />
                      </div>
                      <div>
                        <label htmlFor="t-email" className="mb-2 block text-sm font-medium text-gray-700">
                          Email Address *
                        </label>
                        <input type="email" name="t-email" id="t-email" required placeholder="jane@example.com" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20" />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="t-phone" className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="t-phone" id="t-phone" placeholder="+44 7700 900000" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20" />
                      </div>
                      <div>
                        <label htmlFor="t-company" className="mb-2 block text-sm font-medium text-gray-700">Business Name *</label>
                        <input type="text" name="t-company" id="t-company" required placeholder="Smith Dental Clinic" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20" />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="t-industry" className="mb-2 block text-sm font-medium text-gray-700">Industry *</label>
                        <select name="t-industry" id="t-industry" required className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20">
                          <option value="">Select industry</option>
                          <option value="dental">Dental Clinic</option>
                          <option value="legal">Law Firm</option>
                          <option value="real-estate">Estate Agency</option>
                          <option value="automotive">Car Dealership</option>
                          <option value="healthcare">Healthcare Practice</option>
                          <option value="agency">Marketing Agency</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="t-size" className="mb-2 block text-sm font-medium text-gray-700">Team Size *</label>
                        <select name="t-size" id="t-size" required className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20">
                          <option value="">Select size</option>
                          <option value="1-5">1–5 employees</option>
                          <option value="5-15">5–15 employees</option>
                          <option value="15-30">15–30 employees</option>
                          <option value="30+">30+ employees</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full justify-center text-base disabled:opacity-50">
                      {sending ? "Submitting..." : "Start My Free Trial"}
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </form>

                  <p className="mt-4 text-center text-xs text-gray-400">
                    By submitting, you agree to our{" "}<Link to="/privacy" className="underline">Privacy Policy</Link>. No spam, no calls unless you ask for one.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-off-white section-padding text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-obsidian sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mb-8 text-gray-500">
            Check out our FAQ or chat with the demo assistant on this page.
          </p>
          <Link to="/faq" className="btn-secondary">
            Read Our FAQ
          </Link>
        </div>
      </section>
    </>
  );
}