import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudies,
});

const caseStudies = [
  {
    id: "dental-clinic",
    industry: "Dental",
    icon: "🦷",
    title: "SmileCare Dental recovers £52k in missed revenue",
    client: "Dr. James Patel, SmileCare Dental",
    location: "Birmingham, UK",
    problem: "SmileCare was losing an estimated 60% of after-hours and weekend enquiries to voicemail. Front-desk staff spent 3+ hours daily answering the same questions: 'Do you take NHS patients?', 'How much is a check-up?', 'Can I book an emergency appointment?' — leaving little time for in-clinic patient care.",
    solution: "ScaleFlow deployed a Smart Chat agent on their website and a VoiceFlow agent for phone calls. The AI now answers 100% of enquiries, qualifies urgency, checks insurance, and books directly into their practice management software.",
    results: [
      { label: "Lead response rate", before: "40%", after: "100%", improvement: "+150%" },
      { label: "New patients/month", before: "18", after: "30", improvement: "+67%" },
      { label: "Staff hours saved", before: "15 hrs/wk", after: "2 hrs/wk", improvement: "87% less" },
    ],
    quote: "We recovered £52,000 in our first year — revenue that was literally going to voicemail. Our hygienists are fully booked two weeks out.",
  },
  {
    id: "law-firm",
    industry: "Legal",
    icon: "⚖️",
    title: "Thornton Legal saves 22 hours a week on client intake",
    client: "Rebecca Thornton, Thornton Legal",
    location: "Manchester, UK",
    problem: "Thornton Legal's solicitors were spending their first hour every morning triaging overnight enquiries — family law emergencies, property conveyancing questions, and corporate client requests all mixed together. Paralegals spent 22+ hours/week on initial qualification and data entry.",
    solution: "ScaleFlow built a LeadQualify pipeline that automatically classifies enquiries by practice area, scores urgency, and routes qualified leads to the right solicitor. AI handles conflict checks and books initial consultations.",
    results: [
      { label: "Admin hours saved", before: "22 hrs/wk", after: "4 hrs/wk", improvement: "82% less" },
      { label: "Client intake speed", before: "4+ hours", after: "< 2 minutes", improvement: "99% faster" },
      { label: "Billable hours recovered", before: "0", after: "18 hrs/wk", improvement: "£94k/yr" },
    ],
    quote: "Our solicitors now start their day with qualified leads, not a cluttered inbox. We've recovered nearly two full days of billable time every week.",
  },
  {
    id: "estate-agent",
    industry: "Property",
    icon: "🏠",
    title: "Davies Estates captures 100% of after-hours enquiries",
    client: "Mark Davies, Davies Estates",
    location: "London, UK",
    problem: "Davies Estates was missing an estimated 40% of viewing requests that came in after 6 PM and on weekends — exactly when most buyers browse. Manual follow-ups the next morning meant a 12+ hour delay, by which time many buyers had already booked with competitors.",
    solution: "ScaleFlow deployed a 24/7 AI agent on their website and integrated it with their property CRM. The AI answers property questions instantly, qualifies buyers (budget, timeline, mortgage status), and books viewings directly into agents' calendars — even at 11 PM.",
    results: [
      { label: "After-hours capture", before: "60%", after: "100%", improvement: "+67%" },
      { label: "Viewings booked", before: "12/wk", after: "26/wk", improvement: "+117%" },
      { label: "Response time", before: "12 hours", after: "< 5 seconds", improvement: "8,640× faster" },
    ],
    quote: "Our AI agent handles viewing requests at 11 PM just as well as at 11 AM. We've doubled our viewing bookings and our agents now only talk to qualified, ready-to-view buyers.",
  },
  {
    id: "car-dealership",
    industry: "Automotive",
    icon: "🚗",
    title: "AutoPrime Motors doubles test-drive bookings",
    client: "Lisa Chen, AutoPrime Motors",
    location: "Leeds, UK",
    problem: "AutoPrime's sales team was drowning in manual follow-ups — every web enquiry meant 3-4 phone calls and emails just to book a test drive. Over 50% of web leads went cold because the follow-up took too long. Sales reps spent more time on admin than selling.",
    solution: "ScaleFlow deployed an AI agent that captures web enquiries, qualifies budget and vehicle preferences, and books test drives instantly. The AI sends automated SMS and email confirmations with calendar invites, and follows up post-test-drive to answer questions.",
    results: [
      { label: "Test drives booked", before: "8/mo", after: "22/mo", improvement: "+175%" },
      { label: "Lead-to-test-drive", before: "23%", after: "68%", improvement: "3× higher" },
      { label: "Sales rep admin time", before: "18 hrs/wk", after: "3 hrs/wk", improvement: "83% less" },
    ],
    quote: "The AI has paid for itself 10 times over. Every enquiry gets an instant response, and our sales team spends their time selling cars — not playing phone tag.",
  },
];

function CaseStudies() {
  return (
    <>
      {/* Hero */}
      <section className="ai-hero">
        <div className="ai-hero-grid" />
        <div className="ai-hero-glow ai-hero-glow-1 parallax-slow" />
        <div className="ai-hero-glow ai-hero-glow-2 parallax-slow" />

        <div className="section-padding relative mx-auto w-full max-w-7xl pt-28 pb-16 text-center md:pt-32 md:pb-20">
          <span className="mb-4 inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
            📊 Real Results
          </span>
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            See how service businesses like yours transformed their operations with ScaleFlow AI.
            Real companies, real metrics, real revenue recovered.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bento-section section-padding">
        <div className="mx-auto max-w-5xl space-y-12">
          {caseStudies.map((cs, i) => (
            <div key={cs.id} className="rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:border-teal/20 transition-all duration-300">
              {/* Header strip */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 sm:p-8 border-b border-white/5">
                <span className="text-4xl">{cs.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="rounded-full bg-teal/10 px-3 py-0.5 text-xs font-semibold text-teal">
                      {cs.industry}
                    </span>
                    <span className="text-xs text-gray-500">{cs.location}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{cs.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{cs.client}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400 mb-2">The Problem</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{cs.problem}</p>

                  <h3 className="text-sm font-semibold uppercase tracking-wider text-teal mb-2">Our Solution</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{cs.solution}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Results</h3>
                  <div className="space-y-3">
                    {cs.results.map((r) => (
                      <div key={r.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                        <p className="text-xs text-gray-500 mb-2">{r.label}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-red-400 line-through">{r.before}</span>
                          <svg className="h-4 w-4 text-teal flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          <span className="text-sm font-bold text-white">{r.after}</span>
                          <span className="ml-auto rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal">{r.improvement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="border-t border-white/5 bg-teal/[0.03] px-6 sm:px-8 py-5">
                <div className="flex gap-3">
                  <span className="text-teal text-2xl flex-shrink-0 leading-none">"</span>
                  <p className="text-sm text-gray-300 italic leading-relaxed">{cs.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-obsidian section-padding text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to write your own <span className="gradient-text">success story</span>?
          </h2>
          <p className="mb-10 text-lg text-gray-400">
            Book a demo and we'll show you exactly how ScaleFlow AI would work for your business —
            with real projections based on your current metrics.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/demo" className="btn-primary text-base">
              Book a Demo →
            </Link>
            <Link to="/roi" className="btn-secondary text-base">
              Calculate Your ROI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
