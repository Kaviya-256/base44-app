import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, CheckCircle2 } from "lucide-react";
import Header from "@/components/revora/Header";
import { CARE_PLANS, formatINR } from "@/lib/revoraData";

function upcomingDates(intervalDays, count) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i * intervalDays);
    dates.push(d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }));
  }
  return dates;
}

export default function CarePlanReview() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const packageId = urlParams.get("package");
  const plan = CARE_PLANS.find((p) => p.id === planId);
  const pkg = plan?.packages.find((p) => p.id === packageId) || plan?.packages[0];
  const [confirmed, setConfirmed] = React.useState(false);

  if (!plan || !pkg) {
    return (
      <div className="min-h-screen bg-revora-canvas">
        <Header />
        <div className="text-center py-24 text-revora-ink font-semibold">Plan not found.</div>
      </div>
    );
  }

  const interval = pkg.intervalDays;
  const count = pkg.visitCount;
  const dates = upcomingDates(interval, count);

  return (
    <div className="min-h-screen bg-revora-canvas">
      <Header />
      <div className="mx-auto max-w-[700px] px-4 md:px-8 py-8">
        <button onClick={() => navigate("/care-plans")} className="flex items-center gap-1.5 text-sm text-revora-muted mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Care Plans
        </button>

        {!confirmed ? (
          <>
            <h1 className="text-2xl font-bold text-revora-ink">{plan.name} — {pkg.name}</h1>
            <p className="text-revora-muted mt-1">{pkg.frequency} · {pkg.visits}</p>

            <div className="bg-revora-surface border border-revora-border rounded-2xl p-5 mt-6">
              <div className="flex items-center gap-2 font-semibold text-revora-ink mb-3">
                <Calendar className="w-4 h-4 text-revora-gold" /> Upcoming schedule
              </div>
              <div className="flex flex-wrap gap-2">
                {dates.map((d) => (
                  <span key={d} className="text-xs bg-revora-canvas border border-revora-border rounded-full px-3 py-1.5">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-revora-surface border border-revora-border rounded-2xl p-5 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-revora-muted text-sm">Plan price</span>
                <span className="font-bold text-revora-primary text-lg">{formatINR(pkg.price)}</span>
              </div>
              <p className="text-xs text-revora-muted mt-1">Prepaid demo price. Manual renewal — never auto-charged.</p>
            </div>

            <div className="rounded-xl bg-revora-caresurface text-revora-careink text-sm px-4 py-3 mt-4">
              This is a simulated review screen. Selecting a plan does not automatically confirm a subscription.
            </div>

            <button
              onClick={() => setConfirmed(true)}
              className="w-full mt-6 rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
            >
              Review & Confirm Plan
            </button>
          </>
        ) : (
          <div className="text-center py-16">
            <CheckCircle2 className="w-14 h-14 text-revora-success mx-auto mb-4" />
            <h2 className="text-xl font-bold text-revora-ink">Plan reviewed</h2>
            <p className="text-sm text-revora-muted mt-2 max-w-sm mx-auto">
              This prototype stops here — in production, this step would proceed to demo payment like a regular
              booking.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-6 rounded-xl bg-revora-primary text-white font-semibold px-6 py-3 min-h-[48px]"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
