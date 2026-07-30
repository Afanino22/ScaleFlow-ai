import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-grid" />
        <div className="page-hero-orb page-hero-orb-teal" />
        <div className="page-hero-orb page-hero-orb-blue" />
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <span className="page-hero-badge mb-5">📄 Legal</span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-gray-300">Last updated: July 2026</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="prose prose-gray mx-auto max-w-3xl">
          <h2>1. Information We Collect</h2>
          <p>When you use ScaleFlow AI, we collect information you provide directly: name, email address, phone number, business name, and industry. We also collect usage data about how you interact with our website and demo.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, communicate with you about your account or trial, and send occasional product updates (you can opt out anytime).</p>
          
          <h2>3. Data Sharing</h2>
          <p>We never sell your personal data. We may share data with trusted service providers who help us operate our business (e.g., Stripe for payments).</p>
          
          <h2>4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
          
          <h2>5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data at any time. Contact us at contact@scaleflowai.co.uk to exercise these rights.</p>
          
          <h2>6. Contact</h2>
          <p>Questions about this policy? Email us at contact@scaleflowai.co.uk.</p>
          
          <div className="mt-10 text-center">
            <Link to="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}