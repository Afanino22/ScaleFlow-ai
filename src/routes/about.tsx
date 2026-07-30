import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

const stats = [
  { value: "5+", label: "Premium AI Services" },
  { value: "Launched 2026", label: "Birmingham UK" },
  { value: "Our goal", label: "Pays for itself within 30 days" },
  { value: "24/7", label: "Digital Employee Uptime" },
];

const values = [
  {
    title: "Results First",
    desc: "We measure success in leads converted and hours saved — not vanity metrics. If our service doesn't deliver measurable ROI, we haven't done our job.",
    icon: "📊",
  },
  {
    title: "Deep Integration",
    desc: "We don't bolt on a chatbot. We connect deeply with your existing tools — CRM, calendar, phone, email — so everything works as one seamless system.",
    icon: "🔌",
  },
  {
    title: "Industry Understanding",
    desc: "We specialise in service-based businesses. We understand the nuance of dental triage, legal intake, property viewings, and car sales. Our agents speak your language.",
    icon: "🏢",
  },
  {
    title: "Continuous Improvement",
    desc: "Our agents get smarter over time. We monitor conversations, analyse patterns, and deploy improvements monthly. Your Digital Employee grows with your business.",
    icon: "📈",
  },
];

function About() {
  return (
    <>
      {/* ═══ HERO: Mission ═══ */}
      <section className="ai-hero">
        <div className="ai-hero-grid" />
        <div className="ai-hero-glow ai-hero-glow-1 parallax-slow" />
        <div className="ai-hero-glow ai-hero-glow-3 parallax-fast" />
        <div className="hero-particle hero-particle-1" />
        <div className="hero-particle hero-particle-4" />
        <div className="section-padding relative mx-auto w-full max-w-7xl pt-28 pb-20 md:pt-32 md:pb-28 z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="hero-badge animate-fade-in-up inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
              🏢 About Us
            </span>
            <h1 className="animate-fade-in-up delay-100 mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              We're on a mission to give every service business a{" "}
              <span className="gradient-text">24/7 team member</span>
            </h1>
            <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              ScaleFlow AI was founded on a simple insight: service-based businesses don't
              need more software. They need <strong className="text-white">people who never sleep</strong> — AI agents that
              handle the repetitive work so humans can focus on what humans do best.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="-mt-10 px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 rounded-2xl bg-white/[0.02] p-8 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-black text-teal">{stat.value}</div>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  We saw the same pattern over and over: brilliant dentists, lawyers, estate
                  agents, and dealers spending hours on admin that a well-designed AI could
                  handle in seconds. Missed calls. Slow emails. Manual booking. Spreadsheet
                  hell.
                </p>
                <p>
                  The traditional solution — hire more staff — doesn't scale for SMBs.
                  The tech solution — buy more software — adds complexity without solving
                  the core problem.
                </p>
                <p>
                  So we built something different: <strong className="text-white">Digital Employees</strong>.
                  Not tools. Not dashboards. AI agents that do the work, integrated into your
                  actual workflow, that deliver measurable ROI from day one.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-8">
              <h3 className="mb-6 text-xl font-bold text-white">Our Values</h3>
              <div className="space-y-6">
                {values.map((v) => (
                  <div key={v.title} className="flex gap-4">
                    <span className="mt-1 text-2xl">{v.icon}</span>
                    <div>
                      <h4 className="font-bold text-white">{v.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white/[0.03] section-padding">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Who we <span className="gradient-text">serve</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-500">
            We specialise in high-intent, service-based businesses where lead response time
            directly equals revenue.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Dental Clinics", emoji: "🦷" },
              { name: "Law Firms", emoji: "⚖️" },
              { name: "Estate Agents", emoji: "🏠" },
              { name: "Car Dealerships", emoji: "🚗" },
            ].map((ind) => (
              <div key={ind.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-teal">
                <span className="text-4xl">{ind.emoji}</span>
                <h3 className="mt-4 font-bold text-white">{ind.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Want to work with us?
          </h2>
          <p className="mb-8 text-gray-500">
            Let's start with a no-obligation discovery call. We'll show you exactly what
            a Digital Employee can do for your business.
          </p>
          <Link to="/booking" className="btn-primary">
            Book Your Discovery Call
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}