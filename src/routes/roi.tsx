import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/roi")({
  component: ROICalculator,
});

const industryDefaults: Record<string, { leads: number; value: number; hours: number }> = {
  dental: { leads: 80, value: 200, hours: 18 },
  legal: { leads: 40, value: 500, hours: 15 },
  realestate: { leads: 60, value: 300, hours: 12 },
  automotive: { leads: 50, value: 250, hours: 10 },
  other: { leads: 30, value: 150, hours: 15 },
};

const responseTimeLoss = {
  instant: 0.05,
  "1hr": 0.15,
  "4hrs": 0.35,
  "24hrs": 0.55,
  more: 0.75,
};

function formatCurrency(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function ROICalculator() {
  const [industry, setIndustry] = useState("dental");
  const [leads, setLeads] = useState(80);
  const [ticket, setTicket] = useState(200);
  const [responseTime, setResponseTime] = useState("24hrs");
  const [adminHours, setAdminHours] = useState(18);
  const [calculated, setCalculated] = useState(false);

  const defaults = industryDefaults[industry] || industryDefaults.other;

  const handleIndustryChange = (val: string) => {
    setIndustry(val);
    const d = industryDefaults[val] || industryDefaults.other;
    setLeads(d.leads);
    setTicket(d.value);
    setAdminHours(d.hours);
    setCalculated(false);
  };

  const missedRate = responseTimeLoss[responseTime as keyof typeof responseTimeLoss] || 0.5;
  const monthlyMissed = Math.round(leads * missedRate);
  const monthlyRevenueLost = monthlyMissed * ticket;
  const yearlyRevenueLost = monthlyRevenueLost * 12;
  const hoursSaved = Math.round(adminHours * 0.7);
  const hoursCost = hoursSaved * 25 * 4.33; // ~£25/hr burdened cost
  const totalMonthlyValue = monthlyRevenueLost + hoursCost;
  const recommendedTier = totalMonthlyValue > 5000 ? "Enterprise" : totalMonthlyValue > 2000 ? "Growth" : "Starter";
  const tierPrice = recommendedTier === "Starter" ? 500 : recommendedTier === "Growth" ? 950 : 1500;
  const paybackDays = Math.round((tierPrice / totalMonthlyValue) * 30);

  const calculate = () => setCalculated(true);

  return (
    <>
      {/* Header */}
      <section className="hero-gradient section-padding pt-28 pb-16">
        <div className="mx-auto max-w-7xl text-center">
          <span className="mb-4 inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
            ROI Calculator
          </span>
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            See how much{" "}
            <span className="text-teal">your business is losing</span>{" "}
            to slow leads
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Enter your numbers below. We'll show you exactly how much revenue you're
            leaving on the table — and what a ScaleFlow Digital Employee could save you.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Inputs */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-obsidian">Your numbers</h2>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => handleIndustryChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
                  >
                    <option value="dental">Dental Clinic</option>
                    <option value="legal">Law Firm</option>
                    <option value="realestate">Estate Agency</option>
                    <option value="automotive">Car Dealership</option>
                    <option value="other">Other Service Business</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Monthly leads: <span className="text-teal font-bold">{leads}</span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={500}
                    value={leads}
                    onChange={(e) => { setLeads(Number(e.target.value)); setCalculated(false); }}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>5</span><span>500</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Average lead value: <span className="text-teal font-bold">{formatCurrency(ticket)}</span>
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={2000}
                    step={10}
                    value={ticket}
                    onChange={(e) => { setTicket(Number(e.target.value)); setCalculated(false); }}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>£20</span><span>£2,000</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Current lead response time</label>
                  <select
                    value={responseTime}
                    onChange={(e) => { setResponseTime(e.target.value); setCalculated(false); }}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
                  >
                    <option value="instant">Instant (within seconds)</option>
                    <option value="1hr">Within an hour</option>
                    <option value="4hrs">2–4 hours</option>
                    <option value="24hrs">Same day / next day</option>
                    <option value="more">More than 24 hours</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Hours spent on admin/week: <span className="text-teal font-bold">{adminHours}h</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={60}
                    value={adminHours}
                    onChange={(e) => { setAdminHours(Number(e.target.value)); setCalculated(false); }}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>2h</span><span>60h</span>
                  </div>
                </div>

                <button
                  onClick={calculate}
                  className="btn-primary w-full justify-center text-base"
                >
                  Calculate My Savings
                </button>
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-obsidian">Your potential savings</h2>

              {!calculated ? (
                <div className="flex h-[400px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-off-white">
                  <div className="text-center">
                    <div className="mb-4 text-5xl">📊</div>
                    <p className="text-gray-400">Adjust the sliders and click</p>
                    <p className="font-semibold text-teal">"Calculate My Savings"</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Revenue Lost */}
                  <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
                    <p className="text-sm font-medium text-red-600">Monthly revenue lost to slow responses</p>
                    <p className="mt-1 text-4xl font-black text-red-600">{formatCurrency(monthlyRevenueLost)}</p>
                    <p className="mt-1 text-sm text-red-400">
                      {monthlyMissed} of {leads} leads go unanswered due to response lag
                    </p>
                  </div>

                  {/* Hours Wasted */}
                  <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
                    <p className="text-sm font-medium text-amber-600">Admin time that could be automated</p>
                    <p className="mt-1 text-4xl font-black text-amber-600">{hoursSaved}h</p>
                    <p className="mt-1 text-sm text-amber-400">per month — worth {formatCurrency(hoursCost)} in staff time</p>
                  </div>

                  {/* Total Value */}
                  <div className="rounded-2xl border border-teal bg-teal/5 p-6">
                    <p className="text-sm font-medium text-teal">Total monthly value with ScaleFlow</p>
                    <p className="mt-1 text-4xl font-black text-teal">{formatCurrency(totalMonthlyValue)}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {yearlyRevenueLost > 10000
                        ? `That's ${formatCurrency(yearlyRevenueLost)} per year in recovered revenue!`
                        : "Recovered revenue + saved staff time"}
                  </p>
                  </div>

                  {/* Recommendation */}
                  <div className="rounded-2xl bg-obsidian p-6 text-center">
                    <p className="text-sm font-medium text-gray-400">Recommended plan for your business</p>
                    <p className="mt-1 text-3xl font-black text-white">{recommendedTier}</p>
                    <p className="mt-1 text-sm text-gray-400">
                      From {formatCurrency(tierPrice)}/month — pays for itself in ~{paybackDays} days
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Link to="/pricing" className="btn-primary text-sm">
                        View Pricing
                      </Link>
                      <Link to="/booking" className="btn-outline border-white/30 text-white hover:bg-white/10 text-sm">
                        Book a Free Discovery Call
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white section-padding text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-obsidian sm:text-3xl">
            Want a more precise calculation?
          </h2>
          <p className="mb-8 text-gray-500">
            We'll analyse your actual numbers and build a custom ROI report for your business.
            No commitment, just honest data.
          </p>
          <Link to="/booking" className="btn-primary">
            Get Your Custom Report
          </Link>
        </div>
      </section>
    </>
  );
}