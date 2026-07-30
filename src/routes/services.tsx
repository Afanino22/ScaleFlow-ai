import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: Services,
});

const services = [
  {
    id: "smart-chat",
    icon: "💬",
    title: "Smart Chat",
    subtitle: "AI Web & SMS Chat Agent",
    tier: "Starter • Growth • Enterprise",
    desc: "A 24/7 intelligent chat widget for your website + SMS channel that answers FAQs, qualifies leads, and books appointments directly into your calendar.",
    problem: "Slow lead response times. Missed after-hours enquiries. Front-desk staff overwhelmed juggling channels.",
    features: [
      "Website chat widget with your branding",
      "SMS channel for mobile leads",
      "AI-powered FAQ & qualification",
      "Direct calendar booking integration",
      "CRM contact capture & enrichment",
      "Multi-language support",
    ],
    implementation: "1–2 weeks",
  },
  {
    id: "voiceflow",
    icon: "🎙️",
    title: "VoiceFlow",
    subtitle: "AI Voice Receptionist",
    tier: "Enterprise",
    desc: "Natural-sounding AI voice agent that answers inbound calls 24/7 — qualifies leads, answers questions, and books appointments. Transfers to a human when needed.",
    problem: "Calls go to voicemail after hours. Voicemail often goes unchecked. Every missed call is lost revenue.",
    features: [
      "Natural conversation with custom persona",
      "Real-time speech recognition & synthesis",
      "Smart call routing & escalation",
      "CRM integration for lead logging",
      "Call transcript & analytics dashboard",
      "Custom hold music & greetings",
    ],
    implementation: "2–3 weeks",
  },
  {
    id: "leadqualify",
    icon: "🎯",
    title: "LeadQualify",
    subtitle: "Intelligent Lead Scoring Engine",
    tier: "Growth • Enterprise",
    desc: "An AI pipeline that scores every lead on readiness, budget fit, and urgency. Hot leads get instant responses; cold leads get automated nurture sequences.",
    problem: "Staff spend hours on unqualified leads that don't convert. Team morale drops when effort doesn't convert.",
    features: [
      "Multi-source lead capture (web, email, chat, phone)",
      "AI-driven scoring & classification",
      "Smart routing to right team member",
      "Automated nurture sequences for cold leads",
      "Performance dashboard & reporting",
      "Custom scoring criteria per business",
    ],
    implementation: "1–2 weeks",
  },
  {
    id: "bookflow",
    icon: "📅",
    title: "BookFlow",
    subtitle: "Automated Booking & Scheduling",
    tier: "Starter • Growth • Enterprise",
    desc: "Smart scheduling that syncs with your calendar, shows real-time availability, books appointments, and sends automated reminders that slash no-shows by 70%.",
    problem: "Manual booking creates phone tag, double-bookings, and costly no-shows cutting into revenue.",
    features: [
      "Real-time calendar sync (Google, Outlook)",
      "Custom service types & duration rules",
      "Staff rota & buffer time management",
      "Automated SMS & email reminders",
      "Rescheduling & cancellation workflows",
      "Waitlist management for booked-out slots",
    ],
    implementation: "1–2 weeks",
  },
  {
    id: "inboxpilot",
    icon: "✉️",
    title: "InboxPilot",
    subtitle: "AI Email Response Agent",
    tier: "Growth • Enterprise",
    desc: "Connects to your inbox, analyses incoming emails, drafts intelligent responses, and logs interactions to your CRM. Human reviews sensitive replies first.",
    problem: "Professionals spend hours each day on repetitive emails. This blocks billable work and causes slow response.",
    features: [
      "Gmail & Outlook integration",
      "AI email classification & prioritisation",
      "Smart draft generation for approval",
      "Auto-reply for known patterns (FAQs, pricing)",
      "CRM enrichment & activity logging",
      "Weekly response-time & savings reports",
    ],
    implementation: "2–3 weeks",
  },
  {
    id: "datasync",
    icon: "🔗",
    title: "DataSync",
    subtitle: "CRM & Workflow Automation",
    tier: "Add-on for any tier",
    desc: "Connects all your tools into unified automated workflows. New form submission → CRM contact → calendar check → welcome email — all in seconds.",
    problem: "4–8 disconnected tools. Staff manually copy data between them. Leads fall through cracks. Reporting is impossible.",
    features: [
      "Tool audit & workflow mapping",
      "1000+ app connectors via Make.com / n8n",
      "Custom automation recipes per business",
      "Error handling & fallback logic",
      "Activity logging & monitoring",
      "Scheduled reporting & alerts",
    ],
    implementation: "1–2 weeks per workflow",
  },
];

function Services() {
  return (
    <>
      {/* ═══ HERO: Service Constellation ═══ */}
      <section className="ai-hero">
        <div className="ai-hero-grid" />
        <div className="ai-hero-glow ai-hero-glow-1 parallax-slow" />
        <div className="ai-hero-glow ai-hero-glow-2 parallax-slow" />
        <div className="ai-hero-glow ai-hero-glow-3 parallax-fast" />
        <div className="hero-particle hero-particle-1" />
        <div className="hero-particle hero-particle-2" />
        <div className="hero-particle hero-particle-4" />

        <div className="section-padding relative mx-auto w-full max-w-7xl pt-28 pb-20 text-center md:pt-32 md:pb-28 z-10">
          <span className="hero-badge animate-fade-in-up inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
            ⚡ Our Services
          </span>
          <h1 className="animate-fade-in-up delay-100 mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Meet the{" "}
            <span className="gradient-text">Digital Employee</span> suite
          </h1>
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            Six AI services designed to cover every aspect of your lead and admin workflow.
            Mix and match to build your perfect automated office.
          </p>

          {/* Service constellation grid */}
          <div className="animate-fade-in-up delay-300 mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <div key={s.title} className="hero-service-card text-center cursor-default" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-xs font-semibold text-white">{s.title}</div>
                <div className="text-[10px] text-gray-500 mt-1">{s.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section-padding" style={{ background: "#0A0A0F" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:gap-16">
            {services.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className={`flex flex-col gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <span className="mb-2 inline-block rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                    {s.tier}
                  </span>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-4xl">{s.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        {s.title}
                      </h2>
                      <p className="text-sm text-gray-400">{s.subtitle}</p>
                    </div>
                  </div>
                  <p className="mb-4 text-gray-400">{s.desc}</p>
                  <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/[0.05] p-4">
                    <p className="text-sm font-semibold text-red-400">The Problem</p>
                    <p className="mt-1 text-sm text-red-400/80">{s.problem}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-400">Implementation: <span className="text-white">{s.implementation}</span></p>
                  </div>
                  <Link to="/booking" className="btn-primary text-sm">
                    Get Started
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Features */}
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                  <h3 className="mb-4 text-lg font-bold text-white">What's included</h3>
                  <ul className="space-y-3">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0F] section-padding text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Not sure which service you need?
          </h2>
          <p className="mb-10 text-lg text-gray-400">
            Book a free discovery call and we'll map out the perfect combination
            of Digital Employees for your business.
          </p>
          <Link to="/booking" className="btn-primary text-base">
            Book a Free Discovery Call
          </Link>
        </div>
      </section>
    </>
  );
}