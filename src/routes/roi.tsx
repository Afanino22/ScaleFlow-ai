import { useState, useEffect, useRef } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/roi")({
  component: ROICalculator,
});

// ─── Count-up hook ───
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!trigger) { setCount(0); return; }
    let start = 0;
    const step = () => {
      start++;
      const progress = start / (duration / 16);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(target * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    frameRef.current = requestAnimationFrame(step);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration, trigger]);

  return count;
}

// ─── Animated bar hook ───
function useAnimatedHeight(target: number, trigger: boolean) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!trigger) { setHeight(0); return; }
    const timeout = setTimeout(() => setHeight(target), 50);
    return () => clearTimeout(timeout);
  }, [target, trigger]);

  return height;
}

// ─── Industry defaults ───
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

// ─── SVG Doughnut Chart ───
function DoughnutChart({ percentage, size = 140, trigger }: { percentage: number; size?: number; trigger: boolean }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    if (!trigger) { setOffset(circumference); return; }
    const timeout = setTimeout(() => {
      setOffset(circumference - (circumference * Math.min(percentage, 100)) / 100);
    }, 100);
    return () => clearTimeout(timeout);
  }, [percentage, circumference, trigger]);

  const displayPct = useCountUp(Math.min(Math.round(percentage), 999), 1500, trigger);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="url(#doughnutGradient)" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.25, 0.8, 0.25, 1)" }}
        />
        <defs>
          <linearGradient id="doughnutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5D4" />
            <stop offset="100%" stopColor="#4361EE" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white">{displayPct}%</span>
        <span className="text-[10px] text-gray-500">ROI</span>
      </div>
    </div>
  );
}

// ─── Animated Bar ───
function AnimatedBar({ value, max, color, label, trigger, delay }: { value: number; max: number; color: string; label: string; trigger: boolean; delay: number }) {
  const targetPct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const [animatedPct, setAnimatedPct] = useState(0);

  useEffect(() => {
    if (!trigger) { setAnimatedPct(0); return; }
    const timeout = setTimeout(() => setAnimatedPct(targetPct), delay);
    return () => clearTimeout(timeout);
  }, [targetPct, trigger, delay]);

  const count = useCountUp(value, 1800, trigger);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="font-semibold text-white">{formatCurrency(count)}</span>
      </div>
      <div className="h-8 w-full rounded-md bg-white/[0.04] overflow-hidden">
        <div
          className="h-full rounded-md transition-all duration-[1.5s] ease-out"
          style={{ width: `${animatedPct}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───
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
  const hoursCost = hoursSaved * 25 * 4.33;
  const totalMonthlyValue = monthlyRevenueLost + hoursCost;
  const recommendedTier = totalMonthlyValue > 5000 ? "Enterprise" : totalMonthlyValue > 2000 ? "Growth" : "Starter";
  const tierPrice = recommendedTier === "Starter" ? 500 : recommendedTier === "Growth" ? 950 : 1500;
  const paybackDays = Math.round((tierPrice / totalMonthlyValue) * 30);
  const roiPercentage = tierPrice > 0 ? Math.round((totalMonthlyValue / tierPrice) * 100) : 0;

  const calculate = () => setCalculated(true);

  // Count-up values
  const displayLost = useCountUp(monthlyRevenueLost, 1500, calculated);
  const displaySaved = useCountUp(hoursCost, 1500, calculated);
  const displayTotal = useCountUp(totalMonthlyValue, 1500, calculated);
  const displayYearly = useCountUp(yearlyRevenueLost, 1800, calculated);
  const displayHours = useCountUp(hoursSaved, 1200, calculated);
  const displayLeads = useCountUp(monthlyMissed, 1200, calculated);
  const displayPayback = useCountUp(paybackDays, 1000, calculated);

  // For bar max scaling
  const barMax = Math.max(monthlyRevenueLost, hoursCost, totalMonthlyValue, 100);

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

      {/* Calculator — dark bg */}
      <section className="section-padding" style={{ background: "#0A0A0F" }}>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Inputs */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">Your numbers</h2>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => handleIndustryChange(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-teal/50 focus:bg-white/[0.06]"
                  >
                    <option value="dental">🦷 Dental Clinic</option>
                    <option value="legal">⚖️ Law Firm</option>
                    <option value="realestate">🏠 Estate Agency</option>
                    <option value="automotive">🚗 Car Dealership</option>
                    <option value="other">🏢 Other Service Business</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Monthly leads: <span className="text-teal font-bold">{leads}</span>
                  </label>
                  <input
                    type="range" min={5} max={500}
                    value={leads}
                    onChange={(e) => { setLeads(Number(e.target.value)); setCalculated(false); }}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-gray-500"><span>5</span><span>500</span></div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Average lead value: <span className="text-teal font-bold">{formatCurrency(ticket)}</span>
                  </label>
                  <input
                    type="range" min={20} max={2000} step={10}
                    value={ticket}
                    onChange={(e) => { setTicket(Number(e.target.value)); setCalculated(false); }}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-gray-500"><span>£20</span><span>£2,000</span></div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">Current lead response time</label>
                  <select
                    value={responseTime}
                    onChange={(e) => { setResponseTime(e.target.value); setCalculated(false); }}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-teal/50 focus:bg-white/[0.06]"
                  >
                    <option value="instant">⚡ Instant (within seconds)</option>
                    <option value="1hr">🕐 Within an hour</option>
                    <option value="4hrs">🕓 2–4 hours</option>
                    <option value="24hrs">📅 Same day / next day</option>
                    <option value="more">🐌 More than 24 hours</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Hours spent on admin/week: <span className="text-teal font-bold">{adminHours}h</span>
                  </label>
                  <input
                    type="range" min={2} max={60}
                    value={adminHours}
                    onChange={(e) => { setAdminHours(Number(e.target.value)); setCalculated(false); }}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-gray-500"><span>2h</span><span>60h</span></div>
                </div>

                <button onClick={calculate} className="btn-primary w-full justify-center text-base">
                  Calculate My Savings
                </button>
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">Your potential savings</h2>

              {!calculated ? (
                <div className="flex h-[420px] items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.01]">
                  <div className="text-center">
                    <div className="mb-4 text-5xl">📊</div>
                    <p className="text-gray-500">Adjust the sliders and click</p>
                    <p className="font-semibold text-teal">"Calculate My Savings"</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Key Stat Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-red-400">Revenue Lost/mo</p>
                      <p className="mt-1 text-2xl font-black text-red-400">{formatCurrency(displayLost)}</p>
                      <p className="mt-0.5 text-[11px] text-red-400/60">{displayLeads} missed leads</p>
                    </div>
                    <div className="rounded-xl border border-teal/20 bg-teal/[0.04] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-teal">Hours Saved/mo</p>
                      <p className="mt-1 text-2xl font-black text-teal">{displayHours}h</p>
                      <p className="mt-0.5 text-[11px] text-teal/60">Worth {formatCurrency(displaySaved)}</p>
                    </div>
                  </div>

                  {/* Doughnut + Bars */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                      <DoughnutChart percentage={roiPercentage} trigger={calculated} />
                      <div className="flex-1 space-y-3 w-full">
                        <AnimatedBar value={monthlyRevenueLost} max={barMax} color="rgba(239,68,68,0.7)" label="Revenue lost" trigger={calculated} delay={200} />
                        <AnimatedBar value={hoursCost} max={barMax} color="rgba(251,191,36,0.7)" label="Staff time wasted" trigger={calculated} delay={500} />
                        <AnimatedBar value={totalMonthlyValue} max={barMax} color="linear-gradient(90deg, #00F5D4, #4361EE)" label="Total recovered" trigger={calculated} delay={800} />
                      </div>
                    </div>
                  </div>

                  {/* Yearly projection */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Yearly recovered revenue</p>
                    <p className="text-3xl font-black gradient-text">{formatCurrency(displayYearly)}</p>
                  </div>

                  {/* Recommendation */}
                  <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 text-center">
                    <p className="text-sm font-medium text-gray-400">Recommended plan for your business</p>
                    <p className="mt-1 text-3xl font-black text-white">{recommendedTier}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      From {formatCurrency(tierPrice)}/month — pays for itself in ~{displayPayback} days
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Link to="/pricing" className="btn-primary text-sm">
                        View Pricing →
                      </Link>
                      <Link to="/booking" className="btn-outline border-white/30 text-white hover:bg-white/10 text-sm">
                        Book a Free Discovery Call
                      </Link>
                    </div>
                  </div>

                  {/* See how we compare */}
                  <div className="text-center">
                    <Link to="/pricing" className="text-xs text-gray-500 hover:text-teal transition-colors">
                      🔍 See how our plans compare →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center" style={{ background: "#06060C", padding: "80px 24px" }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Want a more precise calculation?
          </h2>
          <p className="mb-8 text-gray-400">
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
