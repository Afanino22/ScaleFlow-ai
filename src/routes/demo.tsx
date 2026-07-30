import { useState, useEffect, useRef } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo")({
  component: DemoPage,
});

type Industry = "dental" | "legal" | "realestate" | "automotive";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  status?: string;
}

// ─── AI Response Engine ───

interface ResponseRule {
  keywords: string[];
  response: string;
  status: string;
  followUp?: string;
}

const industryResponses: Record<Industry, ResponseRule[]> = {
  dental: [
    {
      keywords: ["appointment", "book", "see", "visit", "check", "checkup", "check-up", "toothache", "pain", "emergency", "urgent"],
      response: "I can book you in right away. We have availability today at 2pm and tomorrow at 9:30am or 11am. Which works best? If it's an emergency, I can squeeze you in even sooner.",
      status: "✅ Lead qualified — appointment needed",
      followUp: "I'll need to know: are you a new or returning patient, and NHS or private?",
    },
    {
      keywords: ["price", "cost", "how much", "fee", "charge", "nhs"],
      response: "Great question! Our private check-ups start at £65, NHS Band 1 at £25.80. Fillings from £95, and we offer 0% payment plans on treatments over £500. Which treatment are you interested in?",
      status: "💰 Pricing shared — NHS & private options",
    },
    {
      keywords: ["insurance", "bupa", "cover", "covered", "plan"],
      response: "We work with most major insurers including Bupa, AXA, and Denplan. I can verify your cover instantly — just let me know your provider and policy number and I'll check what's covered before your visit.",
      status: "📋 Insurance verification offered",
    },
    {
      keywords: ["open", "hours", "weekend", "saturday", "sunday", "late", "after hours"],
      response: "We're open Monday–Friday 8am–7pm and Saturdays 9am–2pm. But our AI handles bookings 24/7 — so you can book anytime, even at 2am! Sundays we're closed but emergency slots are available via our on-call dentist.",
      status: "ℹ️ Hours shared — 24/7 booking available",
    },
    {
      keywords: ["hygienist", "clean", "cleaning", "scale", "polish"],
      response: "Our hygienists are highly rated and available. A standard scale and polish is £55, and we have appointments this week. Would you like me to book you in with Sarah (rated 4.9 ⭐)?",
      status: "📅 Hygienist appointment offered — £55",
    },
  ],
  legal: [
    {
      keywords: ["appointment", "book", "consult", "meet", "talk", "speak", "call"],
      response: "I can arrange a consultation for you. We offer free 30-minute initial consultations with our specialist solicitors. Would you prefer a phone call, video call, or in-person meeting? Mornings or afternoons?",
      status: "✅ Lead qualified — consultation offered",
    },
    {
      keywords: ["price", "cost", "how much", "fee", "charge", "fixed", "quote"],
      response: "Our fees depend on the case type. For reference: fixed-fee divorce (amicable) starts at £1,500 + VAT, conveyancing from £850 + VAT, and we offer conditional fee arrangements (no win, no fee) for personal injury claims. What type of legal matter is this regarding?",
      status: "💰 Fee structure shared",
    },
    {
      keywords: ["divorce", "separation", "family", "child", "custody"],
      response: "Our family law team is led by Sarah Khalil, who has 15+ years of experience. Amicable divorces can be handled on a fixed-fee basis from £1,500. For more complex cases, we'll provide a clear cost estimate after the initial consultation. Would you like me to book you in?",
      status: "📋 Family law specialist identified",
    },
    {
      keywords: ["property", "conveyanc", "house", "buying", "selling", "mortgage"],
      response: "Our conveyancing team handles residential and commercial property. Standard conveyancing starts at £850 + VAT plus disbursements. We typically complete in 8–12 weeks. I can book you in with our property team for a free initial chat — they'll give you a full breakdown.",
      status: "🏠 Conveyancing lead captured",
    },
    {
      keywords: ["business", "commercial", "contract", "company", "startup"],
      response: "Our commercial team advises on contracts, shareholder agreements, IP, and M&A. Hourly rates from £250 + VAT, with fixed-fee packages available for standard work. I can arrange a call with our head of commercial — when works?",
      status: "💼 Commercial enquiry qualified",
    },
  ],
  realestate: [
    {
      keywords: ["view", "viewing", "see", "visit", "look", "tour", "appointment"],
      response: "Excellent — I can book you a viewing right now. Our agents have slots this Saturday: 10am, 11:30am, 2pm, or Sunday at 11am. Which property are you interested in, and which time works? I'll need to know if you're a cash buyer or mortgage buyer too.",
      status: "📅 Viewing slots offered",
    },
    {
      keywords: ["price", "offer", "negotiate", "worth", "value", "valuation"],
      response: "I can arrange a free, no-obligation valuation for your property. Our local experts know the market inside out and typically achieve 2–5% above asking price. Would you like an in-person valuation or an instant online estimate first?",
      status: "💰 Valuation offered — free & no obligation",
    },
    {
      keywords: ["mortgage", "aip", "pre-approved", "lender", "finance"],
      response: "Great that you're thinking about financing. We have in-house mortgage advisors who can compare 90+ lenders and get you an Agreement in Principle often within 24 hours — completely free. Shall I book you a call with them?",
      status: "🏦 Mortgage advisor referral offered",
    },
    {
      keywords: ["sell", "selling", "list", "market", "estate agent"],
      response: "We'd love to help you sell. Our typical fee is 1.25% + VAT (sole agency), and we include professional photography, floorplans, and premium Rightmove listing. Properties we list average 3 viewings in the first week. Can I book a valuation?",
      status: "📋 Vendor enquiry captured — 1.25% fee",
    },
    {
      keywords: ["area", "location", "schools", "transport", "neighbourhood"],
      response: "I've got detailed area guides for all our listings. I can pull up school ratings, transport links, and local amenities for any property. Let me know the postcode or area you're looking at and I'll send you the full breakdown.",
      status: "🗺️ Area info offered",
    },
  ],
  automotive: [
    {
      keywords: ["book", "test drive", "test-drive", "try", "drive", "appointment"],
      response: "Absolutely — test drives are the best way to decide! Which model are you interested in? We have the new 3 Series, 5 Series, X3, and X5 available this week. I can book you in for a 30-minute drive with one of our specialists. When works?",
      status: "🚗 Test drive offered",
    },
    {
      keywords: ["price", "cost", "finance", "monthly", "lease", "pCP", "PCP", "deal"],
      response: "Great question. For the 3 Series, PCP starts from £349/month with £3k deposit. The 5 Series from £479/month. We also offer personal contract hire from £299/month. I can send you a personalised quote — just tell me which model and your budget.",
      status: "💰 Finance options shared",
    },
    {
      keywords: ["service", "mot", "MOT", "repair", "maintenance", "oil", "brake"],
      response: "Our service centre is BMW-approved with manufacturer-trained technicians. Annual service from £249, MOT £45, brake pads from £180. I can book you in this week — we have slots Tuesday and Thursday. What's your registration number?",
      status: "🔧 Service appointment offered",
    },
    {
      keywords: ["part exchange", "part-ex", "trade", "trade-in", "sell my", "value my"],
      response: "We offer competitive part-exchange valuations — typically beating WBAC by 5–10%. I can give you an instant online valuation now (takes 2 minutes) or book you in for an in-person appraisal. Which car are you looking to trade in?",
      status: "🔄 Part-exchange valuation offered",
    },
    {
      keywords: ["stock", "available", "in stock", "delivery", "wait", "lead time"],
      response: "We have over 200 approved-used BMWs in stock, most available within 7 days. New factory orders typically take 8–12 weeks. I can check specific model availability instantly — which model and spec are you interested in?",
      status: "📋 Stock check — 200+ vehicles available",
    },
  ],
};

const suggestions: Record<Industry, string[]> = {
  dental: [
    "I need an emergency appointment for toothache",
    "How much is a check-up?",
    "Do you take Bupa insurance?",
    "Can I book a hygienist clean?",
  ],
  legal: [
    "I need a divorce lawyer — what's the cost?",
    "Can I book a free consultation?",
    "I'm buying a house — conveyancing quote?",
    "Business contract review — can you help?",
  ],
  realestate: [
    "I'd like to view a property this Saturday",
    "How much is my house worth?",
    "I need a mortgage advisor",
    "What are your selling fees?",
  ],
  automotive: [
    "I want to test drive the new 5 Series",
    "What are the PCP deals on a 3 Series?",
    "Book my car in for a service",
    "Part-exchange valuation for my car?",
  ],
};

const defaultResponse: Record<Industry, ResponseRule> = {
  dental: {
    keywords: [],
    response: "Thanks for reaching out! 😊 I can help with booking appointments, checking insurance, treatment pricing, and more. Just let me know what you need and I'll sort it out. We have appointments available this week — what works for you?",
    status: "👋 Welcome — ready to help",
  },
  legal: {
    keywords: [],
    response: "Thank you for contacting us. I can help with family law, conveyancing, commercial matters, and more. Let me know what you need and I'll connect you with the right specialist. Would you like to book a free initial consultation?",
    status: "👋 Welcome — ready to help",
  },
  realestate: {
    keywords: [],
    response: "Welcome! 🏠 I can help with property viewings, valuations, mortgage advice, and selling your home. Our team is available 24/7. What can I assist you with today?",
    status: "👋 Welcome — ready to help",
  },
  automotive: {
    keywords: [],
    response: "Hi there! 🚗 I can help with test drives, finance quotes, service bookings, and part-exchange valuations. Just tell me what you're looking for and I'll get you sorted. What can I do for you today?",
    status: "👋 Welcome — ready to help",
  },
};

const industryNames: Record<Industry, string> = {
  dental: "🦷 Dental Clinic",
  legal: "⚖️ Law Firm",
  realestate: "🏠 Estate Agency",
  automotive: "🚗 Car Dealership",
};

const stats: Record<Industry, { leads: number; booked: number; hours: number; revenue: number }> = {
  dental: { leads: 47, booked: 23, hours: 34, revenue: 14200 },
  legal: { leads: 31, booked: 18, hours: 28, revenue: 38000 },
  realestate: { leads: 64, booked: 12, hours: 41, revenue: 520000 },
  automotive: { leads: 53, booked: 19, hours: 38, revenue: 87000 },
};

// ─── Match enquiry to response ───

function findResponse(industry: Industry, userText: string): ResponseRule {
  const rules = industryResponses[industry];
  const text = userText.toLowerCase();
  let bestMatch: ResponseRule | null = null;
  let bestScore = 0;

  for (const rule of rules) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (text.includes(kw.toLowerCase())) {
        score += kw.length; // longer keyword = stronger match
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule;
    }
  }

  return bestMatch && bestScore > 0 ? bestMatch : defaultResponse[industry];
}

// ─── Component ───

function DemoPage() {
  const [industry, setIndustry] = useState<Industry>("dental");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      sender: "ai",
      text: defaultResponse.dental.response,
      status: defaultResponse.dental.status,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [msgId, setMsgId] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function changeIndustry(ind: Industry) {
    setIndustry(ind);
    setMessages([
      { id: 0, sender: "ai", text: defaultResponse[ind].response, status: defaultResponse[ind].status },
    ]);
    setMsgId(1);
    setInput("");
  }

  function handleSend(text?: string) {
    const msg = (text || input).trim();
    if (!msg || isTyping) return;

    const userMsg: Message = { id: msgId, sender: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setMsgId((id) => id + 2);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const result = findResponse(industry, msg);
      const aiMsg: Message = { id: msgId + 1, sender: "ai", text: result.response, status: result.status };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSend();
  }

  const s = stats[industry];

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-grid" />
        <div className="page-hero-orb page-hero-orb-teal" />
        <div className="page-hero-orb page-hero-orb-blue" />
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <span className="page-hero-badge mb-5">💬 Live Interactive Demo</span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Talk to a <span className="gradient-text">Digital Employee</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Type any question you'd ask a real receptionist — our AI handles it instantly.
            Bookings, pricing, insurance checks — try it yourself.
          </p>
        </div>
      </section>

      <section className="section-padding demo-sim-section">
        <div className="mx-auto max-w-7xl">
          {/* Industry picker */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {(Object.entries(industryNames) as [Industry, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => changeIndustry(key)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  industry === key
                    ? "bg-teal text-obsidian shadow-lg shadow-teal/20"
                    : "border border-white/10 bg-white/5 text-gray-300 hover:border-teal/50 hover:text-teal"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* ─── Chat Column ─── */}
            <div className="lg:col-span-3">
              <div className="demo-chat-window">
                {/* Chat header */}
                <div className="demo-chat-header">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-sm font-bold text-obsidian">
                    SF
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">ScaleFlow Digital Employee</p>
                    <p className="text-xs text-teal">🟢 Online — responding 24/7</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="demo-chat-body">
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      {msg.sender === "user" ? (
                        <div className="demo-msg-user">{msg.text}</div>
                      ) : (
                        <>
                          <div className="demo-msg-ai">{msg.text}</div>
                          {msg.status && (
                            <div className="demo-status-card">{msg.status}</div>
                          )}
                        </>
                      )}
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="demo-msg-ai flex items-center gap-1">
                      <span className="typing-indicator" />
                      <span className="typing-indicator" style={{ animationDelay: "0.2s" }} />
                      <span className="typing-indicator" style={{ animationDelay: "0.4s" }} />
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input area */}
                <div className="demo-chat-input-area">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your enquiry... e.g. 'I need an appointment'"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-teal/50 focus:bg-white/[0.07]"
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="rounded-xl bg-teal px-5 py-3 text-sm font-bold text-obsidian transition-all hover:shadow-lg hover:shadow-teal/20 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>

              {/* Suggestion chips */}
              <div className="mt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Try these questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions[industry].map((sugg, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sugg)}
                      disabled={isTyping}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400 transition-all hover:border-teal/30 hover:text-teal disabled:opacity-30"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Stats Sidebar ─── */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <h3 className="mb-1 text-lg font-bold text-white">{industryNames[industry]}</h3>
                <p className="mb-6 text-xs text-gray-500">Simulated 7-day performance with ScaleFlow</p>

                <div className="space-y-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Leads captured
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {s.leads}
                      <span className="ml-2 text-sm font-normal text-green-400">↑ 100%</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">Every query answered, 24/7</div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Appointments booked
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {s.booked}
                      <span className="ml-2 text-sm font-normal text-green-400">↑ 40%</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">Auto-scheduled without human input</div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Admin hours saved
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {s.hours}h
                      <span className="ml-2 text-sm font-normal text-green-400">this week</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">Time your team gets back</div>
                  </div>

                  <div className="rounded-xl border border-teal/20 bg-teal/[0.04] p-5">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal">
                      Revenue impact
                    </div>
                    <div className="text-3xl font-bold text-white">
                      £{s.revenue.toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">From captured & converted leads</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link to="/booking" className="btn-primary w-full justify-center text-sm">
                    Start Free Trial →
                  </Link>
                  <Link to="/roi" className="btn-secondary w-full justify-center text-sm">
                    Calculate Your ROI
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom disclaimer */}
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-sm text-gray-500">
              ⚡ This is a live simulator — type anything and the AI responds in real time.
              When you start a free trial, we build a custom version for your actual business
              with your services, pricing, and calendar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
