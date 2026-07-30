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
    { to: "/booking", label: "Book a Demo" },
    { to: "/contact", label: "Contact Us" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#06060C]">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 sm:px-8 lg:px-16">
        {/* Main grid */}
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand Column — wider */}
          <div className="md:col-span-2">
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal/70 text-base font-black text-obsidian shadow-lg shadow-teal/20 transition-all duration-300 group-hover:shadow-teal/40 group-hover:scale-105">
                SF
              </span>
              <span className="text-xl font-bold text-white">
                Scale<span className="text-teal">Flow</span>
                <span className="ml-1.5 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal">AI</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              We build <span className="font-semibold text-white">Digital Employees</span> for
              service-based businesses — AI agents that handle leads, bookings, and
              admin so your team can focus on what matters.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Based in Birmingham, UK — serving clients worldwide
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-300">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-all duration-200 hover:text-teal"
                    >
                      <span className="h-px w-0 bg-teal/50 transition-all duration-200 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ScaleFlow AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-sm text-gray-500 transition-colors hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 transition-colors hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
