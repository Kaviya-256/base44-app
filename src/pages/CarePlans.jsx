import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowRight } from "lucide-react";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import { Image } from "@/components/ui/image";
import { CARE_PLANS, IMAGES, REVORA_SHIELD, formatINR } from "@/lib/revoraData";

export default function CarePlans() {
  const navigate = useNavigate();

  return (
    <div className="bg-revora-canvas min-h-screen">
      <Header />
      <div className="relative min-h-[240px] flex items-center">
        <Image src={IMAGES.carePlansBanner} alt="Care plans" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-revora-ink/60" />
        <div className="relative z-10 mx-auto max-w-[1360px] px-4 md:px-8 w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-white/80 mb-4">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl md:text-4xl font-bold text-white">THE REVORA Care Plans</h1>
          <p className="text-white/80 mt-2 max-w-lg">
            Recurring home care on a schedule you can see. Not every service is included — you choose what fits.
          </p>
        </div>
      </div>

      {/* Home Passport — one-time home audit under Care */}
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 pt-10">
        <div className="bg-revora-surface border border-revora-border rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
            <Image src={IMAGES.careQuarterly} alt="Home Passport" className="w-full h-full" />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-revora-gold uppercase mb-2">Care</p>
            <h2 className="text-xl md:text-2xl font-bold text-revora-ink">Home Passport</h2>
            <p className="text-sm text-revora-muted mt-2">
              A one-time audit of your home's appliances, fixtures, plumbing and electrical points — with a visit
              report and maintenance reminders to keep everything running smoothly.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-revora-primary">From ₹999</span>
              <span className="text-xs text-revora-muted">One-time visit</span>
            </div>
            <button
              onClick={() => navigate("/home-passport")}
              className="mt-5 inline-flex items-center gap-2 self-start rounded-xl bg-revora-primary text-white font-semibold px-6 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
            >
              Get your Home Passport <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Revora Shield — preventive care plan */}
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 pt-8">
        <div className="bg-revora-surface border border-revora-border rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
            <Image src={IMAGES.revoraShield} alt={REVORA_SHIELD.name} focalPointX={0.4} focalPointY={0.3} className="w-full h-full" />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-revora-gold uppercase mb-2">Care</p>
            <h2 className="text-xl md:text-2xl font-bold text-revora-ink">{REVORA_SHIELD.name}</h2>
            <p className="text-sm text-revora-muted mt-2">{REVORA_SHIELD.description}</p>
            <div className="mt-4 text-xs text-revora-muted">
              <span>{REVORA_SHIELD.coverage}</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-revora-primary">{formatINR(REVORA_SHIELD.price)}</span>
              <span className="text-xs text-revora-muted">per visit</span>
            </div>
            <button
              onClick={() => navigate(`/care-plans/shield`)}
              className="mt-5 inline-flex items-center gap-2 self-start rounded-xl bg-revora-primary text-white font-semibold px-6 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
            >
              View Plan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recurring care plans */}
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 py-12 space-y-8">
        {CARE_PLANS.map((plan) => {
          const minPrice = Math.min(...plan.packages.map((p) => p.price));
          return (
            <div key={plan.id} className="bg-revora-surface border border-revora-border rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                <Image src={IMAGES.bathroomCare} alt={plan.name} focalPointX={0.5} focalPointY={0.35} className="w-full h-full" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-xs font-semibold tracking-[0.2em] text-revora-gold uppercase mb-2">Care</p>
                <h2 className="text-xl md:text-2xl font-bold text-revora-ink">{plan.name}</h2>
                <p className="text-sm text-revora-muted mt-2">{plan.description}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-bold text-revora-primary">From {formatINR(minPrice)}</span>
                  <span className="text-xs text-revora-muted">{plan.packages.length} plans available</span>
                </div>
                <button
                  onClick={() => navigate(`/care-plans/${plan.id}/packages`)}
                  className="mt-5 inline-flex items-center gap-2 self-start rounded-xl bg-revora-primary text-white font-semibold px-6 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
                >
                  See Plans <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
