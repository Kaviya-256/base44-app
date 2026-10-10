import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import { CARE_PLANS, formatINR } from "@/lib/revoraData";

export default function CarePlanPackages() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = CARE_PLANS.find((p) => p.id === planId);

  if (!plan) {
    return (
      <div className="bg-revora-canvas min-h-screen">
        <Header />
        <div className="text-center py-24 text-revora-ink font-semibold">Plan not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-revora-canvas min-h-screen">
      <Header />
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 py-10">
        <button onClick={() => navigate("/care-plans")} className="flex items-center gap-1.5 text-sm text-revora-muted hover:text-revora-ink mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Care Plans
        </button>
        <p className="text-xs font-semibold tracking-[0.2em] text-revora-gold uppercase mb-2">Care</p>
        <h1 className="text-2xl md:text-4xl font-bold text-revora-ink">{plan.name}</h1>
        <p className="text-revora-muted mt-2 max-w-lg">{plan.description}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {plan.packages.map((pkg) => (
            <div key={pkg.id} className="bg-revora-surface border border-revora-border rounded-2xl p-6 flex flex-col">
              <h2 className="text-xl font-bold text-revora-ink">{pkg.name}</h2>
              <p className="text-sm text-revora-muted mt-1">{pkg.frequency} · {pkg.visits}</p>
              <div className="mt-4 text-3xl font-bold text-revora-primary">{formatINR(pkg.price)}</div>
              <p className="text-xs text-revora-muted mb-5">Demo pricing, prepaid, manual renewal.</p>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.included.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-revora-ink/80">
                    <Check className="w-4 h-4 text-revora-success flex-shrink-0 mt-0.5" /> {i}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(`/care-plans/${plan.id}?package=${pkg.id}`)}
                className="w-full rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
              >
                Choose {pkg.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
