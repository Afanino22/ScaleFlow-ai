import { useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/industries")({
  component: Industries,
});

const industries = [
  {
    id: "dental",
    icon: "🦷",
    name: "Dental Clinics",
    benefit: "3 extra patients/week",
    desc: "AI handles new patient enquiries, insurance questions, and appointment booking — so your front desk focuses on in-clinic patients.",
    stats: [
      { label: "Avg. new patients/mo", value: "+12" },
      { label: "No-show reduction", value: "70%" },
      { label: "After-hours capture", value: "100%" },
    ],
  },
  {
    id: "hvac",
    icon: "🔧",
    name: "HVAC",
    benefit: "100% after-hours capture",
    desc: "Emergency calls at 2 AM? Your AI answers instantly, qualifies the urgency, and books a technician — no voicemail, no missed revenue.",
    stats: [
      { label: "Emergency response", value: "< 5 sec" },
      { label: "Booking rate increase", value: "45%" },
      { label: "Dispatcher time saved", value: "25 hrs/wk" },
    ],
  },
  {
    id: "plumbing",
    icon: "🚿",
    name: "Plumbing",
    benefit: "Never miss an emergency call",
    desc: "Plumbing emergencies don't wait for business hours. Your AI captures every burst-pipe call, qualifies the job, and dispatches instantly.",
    stats: [
      { label: "Emergency capture rate", value: "99%" },
      { label: "Response time", value: "< 3 sec" },
      { label: "Revenue recovery", value: "£18k/yr" },
    ],
  },
  {
    id: "electricians",
    icon: "⚡",
    name: "Electricians",
    benefit: "24/7 call handling",
    desc: "From fuse-box failures to full rewiring quotes — your AI qualifies the job size, checks availability, and books the right electrician.",
    stats: [
      { label: "Call answer rate", value: "100%" },
      { label: "Qualified leads", value: "+35%" },
      { label: "Admin time saved", value: "18 hrs/wk" },
    ],
  },
  {
    id: "law-firms",
    icon: "⚖️",
    name: "Law Firms",
    benefit: "12 hrs saved/week",
    desc: "Client intake, conflict checks, and appointment booking — all handled by AI. Your solicitors spend their time on billable work, not admin.",
    stats: [
      { label: "Admin hours saved", value: "12/wk" },
      { label: "Client intake speed", value: "< 2 min" },
      { label: "Missed enquiry reduction", value: "90%" },
    ],
  },
  {
    id: "healthcare",
    icon: "🏥",
    name: "Healthcare",
    benefit: "Zero missed appointments",
    desc: "Patient registration, appointment reminders, and follow-up scheduling — automated. Fewer no-shows, happier patients, fuller schedules.",
    stats: [
      { label: "No-show reduction", value: "65%" },
      { label: "Patient satisfaction", value: "94%" },
      { label: "Staff time recovered", value: "20 hrs/wk" },
    ],
  },
  {
    id: "estate-agents",
    icon: "🏠",
    name: "Estate Agents",
    benefit: "2x viewing bookings",
    desc: "Your AI answers property questions 24/7, qualifies buyers and tenants, and books viewings directly into your calendar — even at 11 PM.",
    stats: [
      { label: "Viewing bookings", value: "+110%" },
      { label: "Lead-to-viewing rate", value: "3× higher" },
      { label: "Out-of-hours capture", value: "40%" },
    ],
  },
  {
    id: "hospitality",
    icon: "🏨",
    name: "Hospitality",
    benefit: "Instant booking confirmations",
    desc: "Room reservations, event enquiries, and special requests — handled 24/7 in any language. Your guests get instant answers, not hold music.",
    stats: [
      { label: "Direct bookings", value: "+28%" },
      { label: "Response time", value: "< 2 sec" },
      { label: "Guest satisfaction", value: "96%" },
    ],
  },
  {
    id: "gyms",
    icon: "🏋️",
    name: "Gyms",
    benefit: "Membership enquiries 24/7",
    desc: "Trial sign-ups, class bookings, membership questions — your AI handles them all, converts curious visitors into paying members around the clock.",
    stats: [
      { label: "Trial sign-ups", value: "+40%" },
      { label: "Membership conversion", value: "+22%" },
      { label: "Class fill rate", value: "95%" },
    ],
  },
  {
    id: "construction",
    icon: "🏗️",
    name: "Construction",
    benefit: "Qualified leads only",
    desc: "Your AI pre-qualifies every enquiry — project type, budget range, timeline — so your estimators only spend time on serious, ready-to-proceed jobs.",
    stats: [
      { label: "Lead quality score", value: "+60%" },
      { label: "Estimator efficiency", value: "2×" },
      { label: "Quote-to-job rate", value: "+35%" },
    ],
  },
];

function IndustryCard({ industry }: { industry: (typeof industries)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * 8, y: x * -8 });
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  };

  return (
    <Link
      to="/demo"
      search={{ industry: industry.id }}
      className="block"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-sm p-6 transition-shadow duration-300 hover:border-teal/20"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Glow spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(0,245,212,0.08) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10">
          <span className="text-4xl mb-4 block">{industry.icon}</span>
          <h3 className="text-lg font-bold text-white mb-2">{industry.name}</h3>
          <p className="text-sm font-semibold text-teal mb-3">{industry.benefit}</p>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">{industry.desc}</p>
          <div className="space-y-1.5">
            {industry.stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{s.label}</span>
                <span className="font-semibold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function Industries() {
  return (
    <>
      {/* Hero */}
      <section className="ai-hero">
        <div className="ai-hero-grid" />
        <div className="ai-hero-glow ai-hero-glow-1 parallax-slow" />
        <div className="ai-hero-glow ai-hero-glow-2 parallax-slow" />

        <div className="section-padding relative mx-auto w-full max-w-7xl pt-28 pb-16 text-center md:pt-32 md:pb-20">
          <span className="mb-4 inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
            Industries We Serve
          </span>
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            AI-powered <span className="gradient-text">service businesses</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            From dental clinics to construction firms — our Digital Employees are trained on your industry's
            language, workflows, and customer expectations. No generic chatbots. Just results.
          </p>
        </div>
      </section>

      {/* Industry Cards Grid */}
      <section className="bento-section section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <IndustryCard key={ind.id} industry={ind} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-obsidian section-padding text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Don't see your industry?
          </h2>
          <p className="mb-10 text-lg text-gray-400">
            Our AI adapts to any service business. Book a demo and we'll show you
            exactly how ScaleFlow AI would work in your world.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/demo" className="btn-primary text-base">
              Book a Demo →
            </Link>
            <Link to="/contact" className="btn-secondary text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
