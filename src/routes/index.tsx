import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  {
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="rgba(0,245,212,0.12)" />
        <path d="M12 14h16M12 20h12M12 26h8" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Smart Chat",
    desc: "AI chat & SMS agent that qualifies leads and books appointments 24/7.",
  },
  {
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="rgba(67,97,238,0.12)" />
        <path d="M14 14l4 4-4 4M22 24h5" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "VoiceFlow",
    desc: "AI voice receptionist that never misses a call — natural conversation, instant booking.",
  },
  {
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="rgba(0,245,212,0.12)" />
        <circle cx="16" cy="16" r="4" stroke="#00F5D4" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" stroke="#00F5D4" strokeWidth="2" />
        <line x1="18.5" y1="18.5" x2="21.5" y2="21.5" stroke="#00F5D4" strokeWidth="2" />
      </svg>
    ),
    title: "LeadQualify",
    desc: "Intelligent lead scoring that routes hot leads instantly and nurtures the rest.",
  },
  {
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="rgba(67,97,238,0.12)" />
        <rect x="12" y="12" width="16" height="16" rx="3" stroke="#4361EE" strokeWidth="2" />
        <path d="M12 17h16M16 12v5M24 12v5" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "BookFlow",
    desc: "Automated scheduling with smart reminders that slash no-shows by 70%.",
  },
  {
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="rgba(0,245,212,0.12)" />
        <rect x="10" y="12" width="20" height="16" rx="2" stroke="#00F5D4" strokeWidth="2" />
        <path d="M14 17l4 4 8-8" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "InboxPilot",
    desc: "AI email agent that drafts and replies to repetitive enquiries in seconds.",
  },
  {
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="rgba(67,97,238,0.12)" />
        <path d="M14 20l4 4 8-8" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12h16v16H12z" stroke="#4361EE" strokeWidth="2" rx="2" />
      </svg>
    ),
    title: "DataSync",
    desc: "Workflow automation connecting your CRM, calendar, email, and tools.",
  },
];

const industries = [
  { name: "Dental Clinics", stat: "3 extra patients/week" },
  { name: "Law Firms", stat: "12 hrs saved/week" },
  { name: "Estate Agents", stat: "100% lead capture" },
  { name: "Car Dealerships", stat: "2x test-drive bookings" },
];

const pricingPreview = [
  { name: "Starter", setup: "£2,000", monthly: "£500/mo", desc: "AI front desk for small practices" },
  { name: "Growth", setup: "£3,500", monthly: "£950/mo", desc: "Full-cycle AI agent" },
  { name: "Enterprise", setup: "£5,000+", monthly: "£1,500+/mo", desc: "Bespoke automation suite" },
];

function Home() {
  return (
    <>
      {/* ════════════════════════════════════════════ */}
      {/* HERO */}
      {/* ════════════════════════════════════════════ */}
      <section className="hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Floating particles */}
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />

        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-teal/5 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-slate-blue/5 blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />

        <div className="section-padding relative mx-auto grid w-full max-w-7xl items-center gap-12 pt-28 pb-20 md:grid-cols-2 md:pt-32 md:pb-28">
          {/* Left: Text */}
          <div className="text-center md:text-left">
            <span className="hero-badge animate-fade-in-up inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
              🚀 Introducing Digital Employees
            </span>

            <h1 className="animate-fade-in-up delay-100 mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                            Your business never sleeps. <span className="gradient-text">Now your front desk doesn't either.</span>
                          </h1>

            <p className="animate-fade-in-up delay-200 mt-6 max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl">
              ScaleFlow builds a <strong className="text-white">cloud-based AI agent</strong> for your business. It lives on your website, answers every lead 24/7, books appointments into your calendar, and connects to your CRM — <strong className="text-white">no software to install.</strong>
            </p>

            <div className="animate-fade-in-up delay-300 mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              <Link to="/demo" className="btn-primary-lg animate-pulse-glow">
                Try Live Demo →
              </Link>
              <Link to="/pricing" className="btn-outline text-base">
                See Pricing
              </Link>
            </div>

            {/* Free trial badge */}
            <div className="animate-fade-in-up delay-400 mt-4">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-5 py-2 text-sm font-medium text-teal transition-all hover:bg-teal/10">
                🎯 Start your 7-day free trial — no call needed
              </Link>
            </div>

            {/* Trust badges */}
            <div className="animate-fade-in-up delay-400 mt-8 flex flex-wrap items-center justify-center gap-8 md:justify-start">
              <div className="flex items-center gap-2 text-base text-gray-500">
                <svg className="h-4 w-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75z" clipRule="evenodd" />
                </svg>
                <span>Birmingham-built</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-500">
                <svg className="h-4 w-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Zero setup fees for pilot clients</span>
              </div>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="animate-fade-in-up delay-200 flex justify-center md:justify-end">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-header-dot" />
                  <span className="phone-header-text">SCALEFLOW AI</span>
                </div>
                <div className="phone-chat">
                  <div className="phone-msg-incoming" style={{ animationDelay: '1.5s' }}>
                    Hi, do you accept new patients? I've got a toothache.
                  </div>
                  <div className="phone-msg-outgoing">
                    Absolutely! Dr. Patel can see you at 4pm or tomorrow 10am — which works?
                  </div>
                  <div className="phone-msg-action">
                    ✅ Booked — Dr. Patel, 4pm today
                  </div>
                  <div className="phone-msg-incoming" style={{ animationDelay: '2.5s' }}>
                    Can you check if Bupa covers root canals?
                  </div>
                  <div className="phone-msg-outgoing" style={{ animationDelay: '3s' }}>
                    Yes — Bupa covers 80%. I'll email the breakdown. Anything else?
                  </div>
                  <div className="phone-msg-action" style={{ animationDelay: '3.5s' }}>
                    📋 Insurance verified — Bupa 80%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* INTEGRATIONS */}
      {/* ════════════════════════════════════════════ */}
      <section className="border-b border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
            Works with your existing tools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            <span className="integration-logo text-base font-bold text-gray-400">Google Calendar</span>
            <span className="integration-logo text-base font-bold text-gray-400">HubSpot</span>
            <span className="integration-logo text-base font-bold text-gray-400">Salesforce</span>
            <span className="integration-logo text-base font-bold text-gray-400">Cal.com</span>
            <span className="integration-logo text-base font-bold text-gray-400">Pipedrive</span>
            <span className="integration-logo text-base font-bold text-gray-400">Outlook</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* PROBLEM / AGITATION */}
      {/* ════════════════════════════════════════════ */}
      <section className="bg-off-white section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-obsidian sm:text-4xl">
              The problem with <span className="gradient-text">leads, one by one</span>
            </h2>
            <p className="text-lg text-gray-600">
              Every missed call, slow email reply, and manual booking costs you revenue.
              Your team spends hours on admin when they could be serving clients.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Missed Opportunities",
                desc: "60% of leads never get a response. After-hours enquiries vanish.",
                stat: "£50k+",
                label: "lost annually",
              },
              {
                title: "Wasted Hours",
                desc: "Staff spend 15–25 hours/week on repetitive admin and data entry.",
                stat: "20 hrs",
                label: "per week per person",
              },
              {
                title: "Slow Response",
                desc: "Average SMB takes 12+ hours to reply. Speed-to-lead = revenue.",
                stat: "12 hrs",
                label: "average response time",
              },
            ].map((item) => (
              <div key={item.title} className="service-card text-center">
                <div className="mb-4 text-5xl font-black text-teal">{item.stat}</div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">{item.label}</p>
                <h3 className="mb-3 mt-4 text-xl font-bold text-obsidian">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* SERVICES OVERVIEW */}
      {/* ════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-obsidian sm:text-4xl">
              Meet your new <span className="gradient-text">Digital Employees</span>
            </h2>
            <p className="text-lg text-gray-600">
              A full suite of AI agents that handle the work your team shouldn't have to.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.title} to="/services" className="service-card group block">
                <span className="mb-4 inline-block text-3xl">{s.icon}</span>
                <h3 className="mb-2 text-xl font-bold text-obsidian group-hover:text-teal transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services" className="btn-secondary">
              View All Services
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* HOW IT WORKS */}
      {/* ════════════════════════════════════════════ */}
      <section className="bg-obsidian section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
              How it works — <span className="text-teal">3 simple steps</span>
            </h2>
            <p className="text-lg text-gray-400">
              We build, connect, and manage your Digital Employee. No coding. No hardware. No calls needed.
            </p>
          </div>

          {/* Connection Flow Diagram */}
          <div className="mb-16 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
              How your AI agent connects
            </h3>
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
              {/* Customer */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal/10 text-4xl">👤</div>
                <p className="text-sm font-medium text-gray-400">Your Customer</p>
                <p className="text-sm text-gray-500">Sends an enquiry</p>
              </div>

              {/* Arrow */}
              <div className="text-2xl text-teal">→</div>

              {/* Website / Chat */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal/10 text-4xl">💬</div>
                <p className="text-sm font-medium text-gray-400">Your Website</p>
                <p className="text-sm text-gray-500">AI chat widget</p>
              </div>

              {/* Arrow */}
              <div className="text-2xl text-teal">→</div>

              {/* ScaleFlow AI */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-teal bg-obsidian text-4xl">🤖</div>
                <p className="text-sm font-medium text-teal">ScaleFlow AI</p>
                <p className="text-sm text-gray-500">Our cloud servers</p>
              </div>

              {/* Arrow */}
              <div className="text-2xl text-teal">→</div>

              {/* Your Tools */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal/10 text-4xl">📅</div>
                <p className="text-sm font-medium text-gray-400">Your Calendar & CRM</p>
                <p className="text-sm text-gray-500">Google, HubSpot, etc.</p>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-gray-500">
              🖥️ Cloud-based. Nothing to install. Works on any device with a browser.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Tell us about your business",
                desc: "Industry, services, pricing, calendar link, and CRM. We take it from there.",
                icon: "📋",
                color: "bg-teal/10 text-teal",
              },
              {
                num: "02",
                title: "We build & connect your AI",
                desc: "We configure a Digital Employee that lives on your website, knows your business, and connects to your calendar & CRM via secure API.",
                icon: "⚙️",
                color: "bg-slate-blue/10 text-slate-blue",
              },
              {
                num: "03",
                title: "Go live — 24/7 lead capture",
                desc: "Your AI agent answers every lead, books appointments, and updates your CRM. Your team just serves clients.",
                icon: "🚀",
                color: "bg-teal/10 text-teal",
              },
            ].map((step) => (
              <div key={step.num} className="rounded-2xl border border-white/10 p-8 text-center transition-all hover:border-teal/30">
                <div className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-2xl text-4xl ${step.color}`}>
                  {step.icon}
                </div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-teal">{step.num}</p>
                <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="grid gap-6 text-center md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal">🖥️ Frontend</p>
                <p className="mt-1 text-sm text-gray-400">AI chat widget on your website. Works on desktop, tablet, and mobile.</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal">☁️ Backend</p>
                <p className="mt-1 text-sm text-gray-400">Secure cloud servers. Nothing to install. No IT team required.</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal">🔗 Integrations</p>
                <p className="mt-1 text-sm text-gray-400">Connects to Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, and more.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* INDUSTRIES */}
      {/* ════════════════════════════════════════════ */}
      <section className="bg-off-white section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-obsidian sm:text-4xl">
              Built for <span className="text-teal">service businesses</span>
            </h2>
            <p className="text-lg text-gray-600">
              Industry-specific intelligence that understands your world — from emergency
              dental triage to property viewing availability.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {industries.map((ind) => (
              <Link key={ind.name} to="/demo" className="industry-card group block">
                <div className="icon-wrap">
                  <span className="text-2xl">
                    {ind.name === "Dental Clinics" ? "🦷" : 
                     ind.name === "Law Firms" ? "⚖️" : 
                     ind.name === "Estate Agents" ? "🏠" : "🚗"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-obsidian">{ind.name}</h3>
                <p className="mt-2 text-base font-semibold text-teal">{ind.stat}</p>
                <p className="mt-1 text-sm text-gray-400">See how it works →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* PRICING PREVIEW */}
      {/* ════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-obsidian sm:text-4xl">
              Simple pricing. <span className="gradient-text">Real results.</span>
            </h2>
            <p className="text-lg text-gray-600">
              One setup fee, one monthly rate. No hidden costs.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {pricingPreview.map((tier) => (
              <Link key={tier.name} to="/pricing" className="service-card group block">
                <p className="mb-1 text-sm font-bold uppercase tracking-wider text-teal">{tier.name}</p>
                <p className="mb-4 text-xs text-gray-400">{tier.desc}</p>
                <p className="text-2xl font-bold text-obsidian">{tier.setup}</p>
                <p className="text-sm text-gray-500">setup + <strong className="text-teal">{tier.monthly}</strong></p>
                <p className="mt-4 text-xs text-teal transition-all group-hover:translate-x-1">
                  See full plan →
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/pricing" className="btn-secondary text-sm">
              Compare All Features
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden bg-off-white">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal/5 blur-3xl" />

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-obsidian sm:text-4xl">
            Ready to try your first <span className="gradient-text">Digital Employee</span>?
          </h2>
          <p className="mb-10 text-lg text-gray-600">
            Try the live demo above to see it in action — then pick a plan and go live within days.
            No calls. No commitment.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/demo" className="btn-primary text-base">
              Try Live Demo →
            </Link>
            <Link to="/pricing" className="btn-secondary text-base">
              See Plans & Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">Free demo. No signup required.</p>
        </div>
      </section>
    </>
  );
}