import { useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

const BUSINESS_EMAIL = "contact@scaleflowai.co.uk";
const BUSINESS_PHONE = "+44 7405 916374";
const WHATSAPP_NUMBER = "447405916374";
const CALENDLY_URL = "https://calendly.com/scaleflow-ai/discovery-call";

function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: (fd.get("name") as string) || "",
      email: (fd.get("email") as string) || "",
      company: (fd.get("company") as string) || "",
      industry: (fd.get("industry") as string) || "",
      message: (fd.get("message") as string) || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSent(true);
        return;
      }
    } catch {
      // Network error — will fallback to mailto below
    }

    // Fallback: open email client
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company}`,
      `Industry: ${data.industry}`,
      ``,
      `Message:`,
      data.message,
    ].join("\n");
    window.location.href =
      `mailto:${BUSINESS_EMAIL}?subject=Contact Form — ${encodeURIComponent(data.name)} from ${encodeURIComponent(data.company)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setSending(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-grid" />
        <div className="page-hero-orb page-hero-orb-teal" />
        <div className="page-hero-orb page-hero-orb-blue" />
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <span className="page-hero-badge mb-5">📬 Contact Us</span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Let's{" "}
            <span className="gradient-text">talk</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Have a question? Want a demo? Just want to say hello?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Info — dark bg */}
      <section className="section-padding" style={{ background: "#0A0A0F" }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">Send us a message</h2>

              {sent ? (
                <div className="rounded-2xl border border-teal/20 bg-teal/[0.04] p-8 text-center">
                  <div className="mb-4 text-4xl">✅</div>
                  <h3 className="mb-2 text-xl font-bold text-white">Message sent!</h3>
                  <p className="text-gray-400">
                    Thanks for reaching out! We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-400">
                        Full Name
                      </label>
                      <input
                        type="text" name="name" id="name" required
                        placeholder="Jane Smith"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-teal/50 focus:bg-white/[0.06]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-400">
                        Email Address
                      </label>
                      <input
                        type="email" name="email" id="email" required
                        placeholder="jane@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-teal/50 focus:bg-white/[0.06]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-400">
                      Business Name
                    </label>
                    <input
                      type="text" name="company" id="company" required
                      placeholder="Smith Dental Clinic"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-teal/50 focus:bg-white/[0.06]"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="mb-2 block text-sm font-medium text-gray-400">
                      Industry
                    </label>
                    <select
                      name="industry" id="industry"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-teal/50 focus:bg-white/[0.06]"
                    >
                      <option value="">Select your industry</option>
                      <option value="dental">🦷 Dental Clinic</option>
                      <option value="legal">⚖️ Law Firm</option>
                      <option value="real-estate">🏠 Estate Agency</option>
                      <option value="automotive">🚗 Car Dealership</option>
                      <option value="healthcare">🏥 Healthcare Practice</option>
                      <option value="agency">📊 Marketing Agency</option>
                      <option value="hvac">🔧 HVAC / Trades</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-400">
                      Message
                    </label>
                    <textarea
                      name="message" id="message" rows={5} required
                      placeholder="Tell us about your business and what you're looking for..."
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-teal/50 focus:bg-white/[0.06] resize-none"
                    />
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="submit" disabled={sending}
                    className="btn-primary w-full justify-center text-sm disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send Message"}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">Other ways to reach us</h2>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10">
                    <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <a href={`mailto:${BUSINESS_EMAIL}`} className="mt-1 block text-sm text-gray-400 transition-colors hover:text-teal">
                      {BUSINESS_EMAIL}
                    </a>
                    <p className="mt-1 text-xs text-gray-500">We reply within 24 hours</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-blue/10">
                    <svg className="h-6 w-6 text-slate-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <a href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`} className="mt-1 block text-sm text-gray-400 transition-colors hover:text-teal">
                      {BUSINESS_PHONE}
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Mon–Fri, 9am–6pm GMT</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                    <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20ScaleFlow%2C%20I'd%20like%20to%20learn%20more%20about%20your%20AI%20agents`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-gray-400 transition-colors hover:text-green-400"
                    >
                      Chat with us on WhatsApp
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Quick responses, no bots</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10">
                    <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Location</h3>
                    <p className="mt-1 text-sm text-gray-400">Birmingham, United Kingdom</p>
                    <p className="mt-1 text-xs text-gray-500">Serving clients across the UK, US, Canada & Europe</p>
                  </div>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="mt-12 rounded-2xl border border-white/8 bg-white/[0.03] p-8 text-center">
                <h3 className="text-xl font-bold text-white">Ready to get started?</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Book a free discovery call. No commitment, no pressure.
                </p>
                <Link to="/booking" className="btn-primary mt-6 text-sm">
                  Book Your Free Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="section-padding" style={{ background: "#06060C" }}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Book a <span className="gradient-text">discovery call</span></h2>
          <p className="mb-10 text-gray-400">
            Pick a time that works for you. We'll learn about your business and show you
            exactly how ScaleFlow can help — in 15 minutes or less.
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/8">
            <iframe
              src="https://cal.com/SCALEFLOWAI?embed_type=Inline&embed_domain=scaleflow.ctonew.app&theme=dark"
              width="100%"
              height="650"
              frameBorder="0"
              title="Book a discovery call"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
