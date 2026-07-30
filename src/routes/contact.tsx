import { useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

const BUSINESS_EMAIL = "contact@scaleflowai.co.uk";

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

    // Fallback: open email client with data pre-filled
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
      {/* Header */}
      <section className="hero-gradient section-padding pt-28 pb-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="mb-4 inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
            Contact
          </span>
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Let's <span className="text-teal">talk</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Have a question? Want a demo? Just want to say hello?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-obsidian">Send us a message</h2>

              {sent ? (
                <div className="rounded-2xl bg-teal/10 p-8 text-center">
                  <div className="mb-4 text-4xl">✅</div>
                  <h3 className="mb-2 text-xl font-bold text-obsidian">Message sent!</h3>
                  <p className="text-gray-500">
                    Thanks for reaching out! We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Jane Smith"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="jane@example.com"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      required
                      placeholder="Smith Dental Clinic"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="mb-2 block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <select
                      name="industry"
                      id="industry"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
                    >
                      <option value="">Select your industry</option>
                      <option value="dental">Dental Clinic</option>
                      <option value="legal">Law Firm</option>
                      <option value="real-estate">Estate Agency</option>
                      <option value="automotive">Car Dealership</option>
                      <option value="healthcare">Healthcare Practice</option>
                      <option value="agency">Marketing Agency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      placeholder="Tell us about your business and what you're looking for..."
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
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
              <h2 className="mb-6 text-2xl font-bold text-obsidian">Other ways to reach us</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10">
                    <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-obsidian">Email</h3>
                    <a href={`mailto:${BUSINESS_EMAIL}`} className="mt-1 block text-sm text-gray-500 transition-colors hover:text-teal">
                      {BUSINESS_EMAIL}
                    </a>
                    <p className="mt-1 text-xs text-gray-400">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-blue/10">
                    <svg className="h-6 w-6 text-slate-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-obsidian">Book a Call</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Schedule a 15-minute discovery call to see how we can help.
                    </p>
                    <Link to="/booking" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-teal/80">
                      Book Now
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10">
                    <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-obsidian">Location</h3>
                    <p className="mt-1 text-sm text-gray-500">Birmingham, United Kingdom</p>
                    <p className="text-xs text-gray-400">Serving clients across the UK, US & Europe</p>
                  </div>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="mt-12 rounded-2xl bg-obsidian p-8 text-center">
                <h3 className="text-xl font-bold text-white">
                  Ready to get started?
                </h3>
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
    </>
  );
}
