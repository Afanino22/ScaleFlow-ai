import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";

type Message = {
  role: "user" | "bot";
  text: string;
};

const faqKnowledge: Record<string, string> = {
  "pricing": "We have three tiers. **Starter**: £2,000 setup + £500/month — web-based AI agent with basic CRM sync. **Growth**: £3,500 setup + £950/month — multi-channel (web, SMS, email) with advanced CRM & calendar. **Enterprise**: from £5,000 setup + £1,500/month — bespoke workflow automation, VoIP/phone AI, dedicated monitoring. All prices also available in USD.",
  "cost": "Our Starter tier starts at £2,000 setup / $2,500, then £500/month / $600/month. Every plan is designed to pay for itself within weeks. Try it free and see.",
  "price": "Our Starter tier starts at £2,000 setup / $2,500, then £500/month / $600/month. Every plan is designed to pay for itself within weeks. Try it free and see.",
  "trial": "Yes! You can start a free trial right here on this site. No calls needed. Just fill in your details and we'll set up a limited-time demo environment for your business.",
  "free": "Absolutely. Start a free trial right now — no credit card required, no calls. We'll show you exactly what ScaleFlow can do for your business.",
  "demo": "Sure! You're talking to one right now. I'm a demo of what your Digital Employee could do. Want to see how I can help your business? Just ask, or start a free trial above.",
  "how it works": "We build a custom AI agent — a 'Digital Employee' — tailored to your business. It lives on your website, answers leads 24/7, qualifies them, books appointments into your calendar, and automates repetitive admin. It integrates with your CRM and existing tools.",
  "how does it work": "We build a custom AI agent — a 'Digital Employee' — tailored to your business. It lives on your website, answers leads 24/7, qualifies them, books appointments into your calendar, and automates repetitive admin. It integrates with your CRM and existing tools.",
  "industries": "We primarily serve dental clinics, law firms, estate agents, car dealerships, marketing agencies, and healthcare providers. Any service-based SMB with high-value leads and repetitive admin can benefit.",
  "dental": "Perfect fit! Dental practices love ScaleFlow. We handle evening/weekend lead capture, appointment booking, insurance verification follow-ups, and recall reminders — all automated, 24/7.",
  "law": "Great fit. Law firms use us for 24/7 intake triage — the AI qualifies prospects against your criteria, books consultations, and only passes qualified leads to solicitors. No more missed calls on evenings or weekends.",
  "estate agents": "Estate agents use ScaleFlow to capture property inquiries around the clock, qualify buyers, schedule viewings automatically, and follow up on leads that go cold. Never miss a buyer again.",
  "car dealerships": "Car dealerships use us to handle test drive bookings, service appointment scheduling, and sales lead qualification — all automated, 24/7.",
  "roi": "ROI depends on your lead volume, average value, and response times. Most service businesses can cover their monthly retainer within the first few converted leads. Use our ROI calculator at /roi to model your specific scenario.",
  "setup": "Setup takes 1–2 weeks for Starter, 2–3 weeks for Growth, and 3–5 weeks for Enterprise. We handle everything — you just provide the details about your business.",
  "time": "Setup takes 1–2 weeks for Starter, 2–3 weeks for Growth, and 3–5 weeks for Enterprise. We handle everything — you just provide the details about your business.",
  "integration": "We integrate with major CRMs (HubSpot, Salesforce, Pipedrive), calendar systems (Google Calendar, Outlook, Cal.com), and communication channels (website chat, SMS, email, phone).",
  "crm": "We integrate with HubSpot, Salesforce, Pipedrive, and most major CRMs. Custom integrations are available on the Enterprise plan.",
  "support": "Starter includes email support during business hours. Growth includes priority email + chat. Enterprise includes a dedicated account manager with 24/7 monitoring.",
  "start": "Great! Click the 'Start Free Trial' button above or tell me your name and email and I'll get you set up.",
  "hello": "Hey there! 👋 I'm ScaleFlow's Digital Employee demo. Ask me about pricing, industries we serve, how it works, or start a free trial. What can I help with?",
  "hi": "Hey there! 👋 I'm ScaleFlow's Digital Employee demo. Ask me about pricing, industries we serve, how it works, or start a free trial. What can I help with?",
  "help": "I can tell you about pricing, how ScaleFlow works, which industries we serve, setup time, integrations, ROI — or help you start a free trial. What would you like to know?",
  "contact": "You can reach us through the contact page, or just tell me your name and email and I'll have someone get in touch. Or better yet — start a free trial and we'll reach out to set everything up!",
  "who": "I'm a demo of ScaleFlow's Digital Employee! I'm here to answer your questions and show you how AI can automate your lead response and admin. Think of me as a preview of what your own custom AI agent could do.",
  "what is scaleflow": "ScaleFlow AI builds custom 'Digital Employees' for service-based businesses. We replace manual admin, lead qualification, and appointment booking with AI agents and automated workflows. We don't sell AI — we sell recovered time and increased revenue.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  // Check for exact matches first
  for (const [key, answer] of Object.entries(faqKnowledge)) {
    if (lower === key || lower.includes(key)) {
      return answer;
    }
  }

  // Check for partial matches
  if (lower.includes("hello") || lower.includes("hi ") || lower.startsWith("hey")) {
    return faqKnowledge["hello"];
  }
  if (lower.includes("thank")) {
    return "You're welcome! Anything else you'd like to know? Or if you're ready, just tell me your name and business and I'll start your free trial.";
  }
  if (lower.includes("bye") || lower.includes("goodbye")) {
    return "Thanks for chatting! If you're interested, click 'Start Free Trial' above — no call needed, we'll set everything up for you.";
  }

  // Lead capture keywords
  if (lower.includes("sign up") || lower.includes("signup") || lower.includes("register") || lower.includes("get started") || lower.includes("buy")) {
    return "Let's get you started! Please tell me your name, business name, and email address and I'll kick off your free trial right away.";
  }

  // Default fallback
  return "Great question! I don't have that exact answer ready, but I'd love to help. Could you try asking about pricing, industries, how ScaleFlow works, or just tell me your name and email to start a free trial? Or check out our FAQ page for more details.";
}

export default function ChatDemo() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "👋 Hey! I'm a demo of ScaleFlow's Digital Employee. Ask me anything about pricing, how it works, or tell me your name to start a free trial!" },
  ]);
  const [input, setInput] = useState("");
  const [capturedLead, setCapturedLead] = useState<{ name?: string; email?: string; business?: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Check for lead capture patterns
    const lower = userMsg.toLowerCase();
    const nameMatch = lower.match(/(?:my name is|i'm |i am |call me )(.+?)(?: and|\.|$)/i);
    const emailMatch = lower.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const businessMatch = lower.match(/(?:i (?:run|own|work at|have a) |my (?:business|practice|firm|clinic|company|dealership) is )(.+?)(?:\.|$)/i);

    const lead: { name?: string; email?: string; business?: string } = {};
    if (nameMatch) lead.name = nameMatch[1].trim();
    if (emailMatch) lead.email = emailMatch[0].trim();
    if (businessMatch) lead.business = businessMatch[1].trim();

    setTimeout(() => {
      const botText = getBotResponse(userMsg);
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);

      if (lead.name || lead.email || lead.business) {
        setCapturedLead((prev) => ({ ...prev, ...lead }));
        // If we have name + email, prompt signup
        if (lead.name && lead.email) {
          setTimeout(() => {
            setMessages((prev) => [...prev, {
              role: "bot",
              text: `Excellent ${lead.name}! I've got your details. Click below to confirm your free trial — no call needed, we'll set everything up for you. 🎉`,
            }]);
          }, 1500);
        }
      }
    }, 600);
  }

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-obsidian shadow-lg transition-all hover:shadow-xl hover:shadow-teal/30 md:bottom-6"
        style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
        aria-label="Open chat demo"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-36 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col rounded-2xl border border-white/10 bg-[#0A0A0F] shadow-2xl md:bottom-20 md:right-6 animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-2xl bg-[#0A0A0F] px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-sm font-bold text-obsidian">SF</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">ScaleFlow Demo</p>
              <p className="text-xs text-teal">Online • Ask me anything</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex h-80 flex-col gap-3 overflow-y-auto px-5 py-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-teal text-obsidian"
                      : "rounded-bl-md bg-white/[0.06] text-gray-300"
                  }`}
                >
                  {msg.text.split('\n').map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Lead capture / CTA */}
          {capturedLead?.name && capturedLead?.email && (
            <div className="border-t border-white/5 px-5 py-3">
              <Link
                to="/booking"
                className="btn-primary w-full justify-center text-xs"
                onClick={() => setOpen(false)}
              >
                Start Free Trial — {capturedLead.name}
              </Link>
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-white/5 px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-teal/50 focus:bg-white/[0.06]"
            />
            <button
              onClick={handleSend}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal text-obsidian transition-colors hover:bg-teal/90"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}