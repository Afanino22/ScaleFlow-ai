import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: Terms,
});

function Terms() {
  return (
    <>
      <section className="ai-hero">
        <div className="ai-hero-grid" />
        <div className="ai-hero-glow ai-hero-glow-1 parallax-slow" />
        <div className="hero-particle hero-particle-2" />
        <div className="section-padding relative mx-auto w-full max-w-7xl pt-28 pb-16 md:pt-32 md:pb-24 z-10 text-center">
          <span className="hero-badge animate-fade-in-up inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">📄 Legal</span>
          <h1 className="animate-fade-in-up delay-100 mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mt-4 text-sm text-gray-500">Last updated: July 2026</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="prose prose-gray mx-auto max-w-3xl">
          <h2>1. Services</h2>
          <p>ScaleFlow AI provides AI-powered digital employee services for service-based businesses. We set up, configure, and maintain AI agents tailored to your business needs.</p>
          
          <h2>2. Payment Terms</h2>
          <p>Services are billed on a setup fee + monthly retainer basis. Setup fees are due upon agreement. Monthly retainers are billed on the first of each month. Late payments may result in service suspension.</p>
          
          <h2>3. Service Level</h2>
          <p>We strive for 99.9% uptime for our AI agents. We provide support based on your tier: email (Starter), priority email+chat (Growth), dedicated manager (Enterprise).</p>
          
          <h2>4. Cancellation</h2>
          <p>You may cancel at any time with 30 days notice. Upon cancellation, your AI agent will be deactivated and your data will be deleted within 90 days.</p>
          
          <h2>5. Limitation of Liability</h2>
          <p>ScaleFlow AI is not liable for indirect damages. Our liability is limited to the fees paid in the 12 months preceding a claim.</p>
          
          <div className="mt-10 text-center">
            <Link to="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}