import { useState, useEffect, useRef } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo")({
  component: DemoPage,
});

type Industry = "dental" | "legal" | "realestate" | "automotive";

interface Scenario {
  customerMsg: string;
  aiResponse: string;
  actionLabel: string;
}

const scenarios: Record<Industry, Scenario[]> = {
  dental: [
    {
      customerMsg: "Hi, do you accept new patients? I've got a toothache and need to be seen ASAP.",
      aiResponse: "Absolutely! We're accepting new patients. I can book you in today at 4pm or tomorrow at 10am — which works better? Also, are you NHS or private?",
      actionLabel: "✅ Appointment offered — 4pm today",
    },
    {
      customerMsg: "I'm private. 4pm today works. Do I need to bring anything?",
      aiResponse: "Perfect, you're booked for 4pm today with Dr. Patel. Just bring your ID and any dental records if you have them. I'll send a confirmation text now. Anything else I can help with?",
      actionLabel: "📅 Appointment booked — Dr. Patel, 4pm",
    },
    {
      customerMsg: "Actually, can you also check if my insurance covers root canals? I'm with Bupa.",
      aiResponse: "Sure! I've checked — Bupa covers root canal treatment under your plan (80% covered). Would you like me to follow up with a full cost breakdown before your appointment? I can email that to you.",
      actionLabel: "📋 Insurance verified — Bupa (80% cover)",
    },
  ],
  legal: [
    {
      customerMsg: "I need a divorce lawyer. My wife and I have been separated for 2 years and we agree on everything — house, kids, finances. How much would it cost?",
      aiResponse: "Thank you for reaching out. Based on what you've described (amicable, pre-agreed terms), our fixed-fee divorce package starts at £1,500 + VAT. I can book you in for a free 30-minute consultation with our family law team. Are mornings or afternoons better for you?",
      actionLabel: "✅ Lead qualified — amicable divorce",
    },
    {
      customerMsg: "Afternoons work. Can you also tell me what documents I need to bring?",
      aiResponse: "You're booked for Wednesday at 2pm with Sarah Khalil. For the consultation, please bring: 1) Marriage certificate, 2) Proof of address for both parties, 3) Any existing financial agreements. I'll send a pre-consultation checklist by email now.",
      actionLabel: "📅 Consultation booked — Wed 2pm",
    },
    {
      customerMsg: "Great, thanks. What's your cancellation policy just in case?",
      aiResponse: "No problem at all. You can cancel or reschedule up to 24 hours before with no charge. Less than 24 hours, we may need to charge a £50 fee. You'll get a reminder email 48 hours before. Is there anything else I can help with?",
      actionLabel: "📋 Policy shared — 24hr free cancellation",
    },
  ],
  realestate: [
    {
      customerMsg: "Hi, I saw the 3-bedroom house on Elm Street listed for £425k. Is it still available? I'd like to view it this weekend.",
      aiResponse: "Great news — the property on Elm Street is still available! I have Saturday at 10am, 11:30am, or Sunday at 2pm. Do you have a preference? Also, will you be buying with a mortgage or as a cash buyer?",
      actionLabel: "✅ Lead captured — Elm Street property",
    },
    {
      customerMsg: "Saturday 10am works. We're mortgage buyers — already have an AIP.",
      aiResponse: "Excellent, you're booked for Saturday at 10am with our agent Mark. Since you have an AIP ready, you're in a strong position. I've sent you the property info pack and directions by email. Would you like me to also check a few similar properties in case this one isn't quite right?",
      actionLabel: "📅 Viewing booked — Saturday 10am",
    },
    {
      customerMsg: "Yes please, anything similar under £450k in the same area.",
      aiResponse: "I've found 3 similar properties in the area: 1) Oak Road — 3-bed, £435k, 2) Maple Close — 4-bed, £449k, 3) Park View — 3-bed, £410k. I've added them to your viewing list. Mark can show you all of them on Saturday if you'd like. See you then!",
      actionLabel: "📋 3 additional properties added",
    },
  ],
  automotive: [
    {
      customerMsg: "Hi, I'm looking to book my BMW 3 Series for its annual service. It's a 2021 plate. Can you do this Saturday?",
      aiResponse: "Of course! A 2021 BMW 3 Series — we can do Saturday at 9am or 1pm. The full annual service takes about 2 hours and costs £299. Would you like a courtesy car while you wait?",
      actionLabel: "✅ Service booked — Saturday 9am",
    },
    {
      customerMsg: "1pm works. No courtesy car needed — I'll wait. Can you also give me a quote for new front brake pads while it's in?",
      aiResponse: "You're booked for Saturday at 1pm. I've added a brake inspection to the job — I'll have a quote for front pads ready by the time you arrive (typically around £180-£250 fitted depending on wear). You'll get a confirmation text shortly. Anything else?",
      actionLabel: "📅 Service + brake inspection booked",
    },
    {
      customerMsg: "Actually yeah — I've been looking at the new 5 Series. Got any demo models I can test drive?",
      aiResponse: "Great timing — we've just got a new 520i M Sport in stock. I can book a 30-minute test drive while you're here on Saturday. Just let me know at the desk when you arrive and I'll have it ready. Would you like me to prepare a part-exchange valuation on your current 3 Series too?",
      actionLabel: "📋 Test drive + part-ex valuation booked",
    },
  ],
};

const industryNames: Record<Industry, string> = {
  dental: "🦷 Dental Clinic",
  legal: "⚖️ Law Firm",
  realestate: "🏠 Estate Agency",
  automotive: "🚗 Car Dealership",
};

function DemoPage() {
  const [industry, setIndustry] = useState<Industry>("dental");
  const [step, setStep] = useState(0);
  const [showAiMessage, setShowAiMessage] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentScenarios = scenarios[industry];
  const current = currentScenarios[step];

  useEffect(() => {
    if (autoPlaying) {
      setShowAiMessage(false);
      const timeout = setTimeout(() => setShowAiMessage(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [step, autoPlaying]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [showAiMessage, step]);

  function nextStep() {
    if (step < currentScenarios.length - 1) {
      setStep(step + 1);
      setShowAiMessage(false);
      setAutoPlaying(true);
    }
  }

  function prevStep() {
    if (step > 0) {
      setStep(step - 1);
      setShowAiMessage(false);
      setAutoPlaying(true);
    }
  }

  function changeIndustry(ind: Industry) {
    setIndustry(ind);
    setStep(0);
    setShowAiMessage(false);
    setAutoPlaying(true);
  }

  // Stats for demo
  const stats = {
    dental: { leads: 47, booked: 23, hours: 34, revenue: 14200 },
    legal: { leads: 31, booked: 18, hours: 28, revenue: 38000 },
    realestate: { leads: 64, booked: 12, hours: 41, revenue: 520000 },
    automotive: { leads: 53, booked: 19, hours: 38, revenue: 87000 },
  };
  const s = stats[industry];

  return (
    <>
      {/* Header */}
      <section className="hero-gradient section-padding pt-28 pb-16">
        <div className="mx-auto max-w-7xl text-center">
          <span className="mb-4 inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
            Live Interactive Demo
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            See a <span className="text-teal">Digital Employee</span> in action
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Pick your industry and watch how ScaleFlow handles real customer conversations — 
            qualifying leads, booking appointments, and saving you hours — all on autopilot.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          {/* Industry picker */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {(Object.entries(industryNames) as [Industry, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => changeIndustry(key)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  industry === key
                    ? "bg-teal text-obsidian shadow-lg shadow-teal/20"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-teal hover:text-teal"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Chat demo */}
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {/* Chat header */}
                <div className="flex items-center justify-between border-b border-gray-100 bg-obsidian px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-sm font-bold text-obsidian">
                      SF
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">ScaleFlow Digital Employee</p>
                      <p className="text-xs text-teal">🟢 Online — responding 24/7</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-teal/20 px-3 py-1 text-xs font-medium text-teal">
                    Demo mode
                  </span>
                </div>

                {/* Chat messages */}
                <div className="flex h-96 flex-col gap-4 overflow-y-auto bg-gray-50/50 px-6 py-5">
                  {/* Customer message */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-gray-100 px-5 py-3.5 text-sm leading-relaxed text-gray-700">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Customer inquiry
                      </p>
                      {current.customerMsg}
                    </div>
                  </div>

                  {/* AI response */}
                  {showAiMessage && (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-br-md border border-teal/20 bg-white px-5 py-3.5 text-sm leading-relaxed text-gray-700 shadow-sm">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal">
                          ScaleFlow AI response
                        </p>
                        {current.aiResponse}
                      </div>
                    </div>
                  )}

                  {/* Action card */}
                  {showAiMessage && (
                    <div className="flex justify-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-5 py-2 text-sm font-medium text-teal">
                        {current.actionLabel}
                      </div>
                    </div>
                  )}

                  {/* Progress indicator */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    {currentScenarios.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition-all ${
                          i === step
                            ? "w-6 bg-teal"
                            : i < step
                              ? "bg-teal/40"
                              : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <div ref={chatEndRef} />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
                  <button
                    onClick={prevStep}
                    disabled={step === 0}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-teal hover:text-teal disabled:opacity-30"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs text-gray-400">
                    Conversation {step + 1} of {currentScenarios.length}
                  </span>
                  <button
                    onClick={nextStep}
                    disabled={step >= currentScenarios.length - 1}
                    className="btn-primary text-sm"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Stats dashboard */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-1 text-lg font-bold text-obsidian">
                  {industryNames[industry]}
                </h3>
                <p className="mb-6 text-xs text-gray-400">
                  Simulated 7-day performance with ScaleFlow
                </p>

                <div className="space-y-5">
                  <div className="rounded-xl border border-gray-100 bg-off-white p-5">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Leads captured
                    </div>
                    <div className="text-3xl font-bold text-obsidian">
                      {s.leads}
                      <span className="ml-2 text-sm font-normal text-green-500">↑ 100%</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Every query answered, 24/7 — zero missed leads
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-off-white p-5">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Appointments booked
                    </div>
                    <div className="text-3xl font-bold text-obsidian">
                      {s.booked}
                      <span className="ml-2 text-sm font-normal text-green-500">↑ 40%</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Automatically scheduled without human input
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-off-white p-5">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Admin hours saved
                    </div>
                    <div className="text-3xl font-bold text-obsidian">
                      {s.hours}h
                      <span className="ml-2 text-sm font-normal text-green-500">this week</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Time your team gets back from automation
                    </div>
                  </div>

                  <div className="rounded-xl border border-teal/20 bg-teal/5 p-5">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal">
                      Estimated revenue impact
                    </div>
                    <div className="text-3xl font-bold text-obsidian">
                      £{s.revenue.toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      From captured leads and converted appointments
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link to="/booking" className="btn-primary w-full justify-center text-sm">
                    Start Free Trial →
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link to="/roi" className="btn-secondary w-full justify-center text-sm">
                    Calculate Your ROI
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <p className="text-sm text-gray-400">
              ⚡ This is a simulated demo showing how ScaleFlow's Digital Employee handles
              real customer conversations. When you start a free trial, we build a custom
              version for your actual business — with your services, pricing, and calendar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}