import { Link } from "@tanstack/react-router";

const footerLinks = {
  Services: [
    { to: "/services", label: "Smart Chat" },
    { to: "/services", label: "VoiceFlow" },
    { to: "/services", label: "LeadQualify" },
    { to: "/services", label: "BookFlow" },
    { to: "/services", label: "InboxPilot" },
  ],
  Company: [
    { to: "/about", label: "About Us" },
    { to: "/pricing", label: "Pricing" },
    { to: "/demo", label: "Live Demo" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ],
  Industries: [
    { to: "/industries", label: "Dental" },
    { to: "/industries", label: "Legal" },
    { to: "/industries", label: "Real Estate" },
    { to: "/industries", label: "Automotive" },
    { to: "/industries", label: "All Industries →" },
  ],
  Resources: [
    { to: "/demo", label: "Live Demo" },
    { to: "/roi", label: "ROI Calculator" },
    { to: "/booking", label: "Start Free Trial" },
    { to: "/contact", label: "Book a Call" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-obsidian">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-xl font-bold text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal text-base font-black text-obsidian">
                SF
              </span>
              <span>
                Scale<span className="text-teal">Flow</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              We build <strong className="text-white">Digital Employees</strong> for
              service-based businesses. AI agents that handle leads, bookings, and
              admin — so your team can focus on what matters.
            </p>
            <p className="mt-3 text-xs text-gray-500">📍 Proudly based in Birmingham, UK</p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 transition-colors hover:text-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ScaleFlow AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-gray-500 transition-colors hover:text-teal">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 transition-colors hover:text-teal">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}