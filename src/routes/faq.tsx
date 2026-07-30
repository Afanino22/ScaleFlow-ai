import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  component: FAQ,
});

const faqs = [
  {
    category: "Getting Started",
    items: [
      {
        q: "How quickly can we go live?",
        a: "Most services are up and running within 1–3 weeks. After your discovery call, we build, test, and deploy your Digital Employee. The timeline depends on complexity — Smart Chat can go live in a week; VoiceFlow may take 2–3 weeks for full voice tuning.",
      },
      {
        q: "What happens during the discovery call?",
        a: "We spend 15–30 minutes understanding your business, your current lead workflow, and where you're losing time or revenue. We'll recommend the right combination of services and give you a fixed-price quote.",
      },
      {
        q: "Do I need to sign a long-term contract?",
        a: "No. There's a one-time setup fee, then month-to-month billing. Cancel with 30 days' notice. We're confident you'll stay because of the results, not because we lock you in.",
      },
    ],
  },
  {
    category: "Technology & Integration",
    items: [
      {
        q: "What tools do you integrate with?",
        a: "We connect with 1000+ tools through our automation stack. Key integrations include: Cliniko, Clio, HubSpot, Pipedrive, Salesforce, Google Calendar, Outlook, Calendly, Cal.com, Twilio, Gmail, and Microsoft 365. If your tool has an API, we can connect it.",
      },
      {
        q: "Is my data secure?",
        a: "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest. We use SOC 2-compliant infrastructure (Supabase, Vercel, OpenAI). We sign NDAs and data processing agreements. Your data is never used to train public AI models.",
      },
      {
        q: "What if my internet goes down?",
        a: "Your Digital Employees run in the cloud, not on your premises. They stay online 24/7 regardless of your local connection. You can monitor everything from our dashboard.",
      },
    ],
  },
  {
    category: "ROI & Results",
    items: [
      {
        q: "How do you measure ROI?",
        a: "We track: leads captured vs missed, response times, appointments booked, no-show rates, and hours saved. We provide a monthly dashboard so you can see exactly what your Digital Employee delivered.",
      },
      {
        q: "What ROI should I expect?",
        a: "Our clients typically see 5–10x ROI within the first 3 months. A dental clinic capturing 3 extra high-value patients covers their annual retainer in under 2 months. A law firm saving 3 hours/day of billable time recovers their monthly retainer in a single day.",
      },
      {
        q: "Can I see a demo before committing?",
        a: "Yes! Book a discovery call and we'll show you a live demo tailored to your industry. No obligation, no sales pitch — just a real demonstration of what's possible.",
      },
    ],
  },
  {
    category: "Support & Maintenance",
    items: [
      {
        q: "What support is included?",
        a: "Starter plans include email support with same-day response. Growth plans add phone support. Enterprise plans include a dedicated account manager and 24/7 monitoring. All plans include ongoing AI tuning and optimisation.",
      },
      {
        q: "What if the AI handles something wrong?",
        a: "All agents include human-in-the-loop safeguards. Sensitive actions (cancellations, complaints, complex enquiries) are flagged for human review. We monitor conversations and continuously improve accuracy. You're always in control.",
      },
      {
        q: "Do you provide training for my team?",
        a: "Yes. Every implementation includes a 30-minute training session for your team. Enterprise plans include full staff training. We provide documentation, video walkthroughs, and ongoing support.",
      },
    ],
  },
];

function FAQ() {
  return (
    <>
      {/* Header */}
      <section className="hero-gradient section-padding pt-28 pb-16">
        <div className="mx-auto max-w-7xl text-center">
          <span className="mb-4 inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
            FAQ
          </span>
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Questions? <span className="text-teal">We've got answers.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Everything you need to know about ScaleFlow AI. Still have questions?
            We're happy to chat.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding" style={{ background: "#0A0A0F" }}>
        <div className="mx-auto max-w-4xl">
          {faqs.map((group) => (
            <div key={group.category} className="mb-16 last:mb-0">
              <h2 className="mb-8 text-2xl font-bold text-white">{group.category}</h2>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-white transition-colors hover:text-teal">
                      {item.q}
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </summary>
                    <p className="border-t border-white/5 px-6 py-5 text-sm leading-relaxed text-gray-400">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding text-center" style={{ background: "#06060C" }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Can't find what you're looking for?
          </h2>
          <p className="mb-8 text-gray-400">
            Reach out and we'll get back to you within 24 hours.
          </p>
          <a href="mailto:afanosman261@gmail.com" className="btn-primary">
            Email Us
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}