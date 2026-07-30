import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: Terms,
});

function Terms() {
  return (
    <>
      <section className="hero-gradient section-padding pt-28 pb-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Terms of <span className="text-teal">Service</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">Last updated: July 2026</p>
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