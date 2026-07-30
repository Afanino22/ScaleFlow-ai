import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
});

const tiers = [
  {
    name: "Starter",
    subtitle: "The 'Front Desk' Agent",
    setup: "£2,000",
    monthly: "£500",
    desc: "Perfect for small practices and firms that want a 24/7 AI front desk without the complexity.",
    popular: false,
    buyUrl: "https://buy.stripe.com/fZu3cvfZp03ha5M8MXb7y00",
    includes: ["1 AI Agent (Smart Chat or BookFlow)", "Basic CRM Sync", "Standard Support (email)", "Weekly performance report"],
    addons: ["DataSync workflow integration — +£250/mo"],
  },
  {
    name: "Growth",
    subtitle: "The 'Full-Cycle' Agent",
    setup: "£3,500",
    monthly: "£950",
    desc: "For growing businesses ready to automate lead qualification, booking, and multi-channel communication.",
    popular: true,
    buyUrl: "https://buy.stripe.com/bJe7sL8wX9DR6TA3sDb7y01",
    includes: [
      "Smart Chat (Web + SMS)",
      "BookFlow automated scheduling",
      "LeadQualify OR InboxPilot",
      "Advanced CRM & calendar sync",
      "Priority support (email + phone)",
      "Monthly performance review",
    ],
    addons: ["VoiceFlow upgrade — tailored quote", "DataSync workflows — +£250/mo each"],
  },
  {
    name: "Enterprise",
    subtitle: "The 'Automated Office'",
    setup: "£5,000+",
    monthly: "£1,500+",
    desc: "Full-stack automation for businesses ready to transform every aspect of their lead and admin workflow.",
    popular: false,
    buyUrl: "https://buy.stripe.com/4gMfZhcNdaHVdhY0grb7y02",
    includes: [
      "VoiceFlow AI Voice Receptionist",
      "Smart Chat (Web + SMS)",
      "LeadQualify + InboxPilot",
      "BookFlow automated scheduling",
      "Bespoke workflow automation",
      "Dedicated account manager",
      "24/7 system monitoring",
      "Quarterly business review",
    ],
    addons: ["Unlimited custom workflows", "Custom integrations", "Staff training sessions"],
  },
];

const faqs = [
  { q: "How long does implementation take?", a: "Most services go live in 1–3 weeks. The discovery call identifies your needs, we build and test the agent, then deploy. Ongoing tweaks are included in your retainer." },
  { q: "Do I need technical knowledge?", a: "None at all. We handle everything — from connecting APIs to training the AI on your specific business. You'll get a simple dashboard to monitor performance." },
  { q: "What if the AI makes a mistake?", a: "All agents have human oversight built in. Sensitive actions (e.g., replying to complaints) require approval. We monitor conversations and improve accuracy over time." },
  { q: "Can I cancel anytime?", a: "Yes. There's a 30-day minimum on the setup fee. After that, you can cancel your monthly retainer with 30 days' notice. No lock-in contracts." },
  { q: "Which industries do you serve?", a: "We specialise in Dental Clinics, Law Firms, Estate Agents, Car Dealerships, and general service-based SMBs. Our AI is trained on industry-specific language." },
  { q: "Do you integrate with my existing tools?", a: "Almost certainly. We connect with Cliniko, Clio, HubSpot, Pipedrive, Salesforce, Google Calendar, Outlook, Calendly, and 1000+ other tools via our automation stack." },
];

function Pricing() {
  return (
    <>
      {/* Header */}
      <section className="hero-gradient section-padding pt-28 pb-16">
        <div className="mx-auto max-w-7xl text-center">
          <span className="mb-4 inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
            Pricing
          </span>
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Simple pricing.{" "}
            <span className="text-teal">Massive ROI.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Every plan pays for itself within weeks. Our average client sees a 5–10x return
            on their investment.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border-2 p-8 transition-all duration-300 ${
                  tier.popular
                    ? "border-teal shadow-lg shadow-teal/10"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-1 text-xs font-bold text-obsidian">
                    Most Popular
                  </span>
                )}

                <h2 className="text-xl font-bold text-obsidian">{tier.name}</h2>
                <p className="mt-1 text-sm text-gray-500">{tier.subtitle}</p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-obsidian">{tier.setup}</span>
                    <span className="text-sm text-gray-400">setup</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-teal">{tier.monthly}</span>
                    <span className="text-sm text-gray-400">/month</span>
                  </div>
                </div>

                <p className="mb-6 text-sm text-gray-500">{tier.desc}</p>

                <ul className="mb-8 space-y-3">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                {tier.addons.length > 0 && (
                  <div className="mb-8 rounded-lg bg-off-white p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Available Add-ons</p>
                    {tier.addons.map((addon) => (
                      <p key={addon} className="text-sm text-gray-500">+ {addon}</p>
                    ))}
                  </div>
                )}

                {/* Pay setup fee — Stripe checkout */}
                <a
                  href={tier.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mb-2 block w-full rounded-lg py-3 text-center text-sm font-bold transition-all ${
                    tier.popular
                      ? "bg-teal text-obsidian hover:shadow-lg hover:shadow-teal/30"
                      : "border-2 border-obsidian text-obsidian hover:bg-obsidian hover:text-white"
                  }`}
                >
                  Pay Setup Fee — {tier.setup}
                </a>

                {/* Free trial — soft secondary CTA */}
                <Link
                  to="/booking"
                  className="block w-full rounded-lg py-2 text-center text-xs font-medium text-gray-400 transition-colors hover:text-teal"
                >
                  Start 7-day free trial instead
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white section-padding">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-obsidian sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-gray-200 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold text-obsidian transition-colors hover:text-teal">
                  {faq.q}
                  <svg className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-gray-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-obsidian sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mb-8 text-gray-500">
            We'll help you find the perfect plan. No pushy sales — just honest advice.
          </p>
          <Link to="/contact" className="btn-primary">
            Talk to Us
          </Link>
        </div>
      </section>
    </>
  );
}
