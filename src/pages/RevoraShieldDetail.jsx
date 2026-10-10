import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, X, ShieldCheck, Clock, MapPin, AlertTriangle } from "lucide-react";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import { Image } from "@/components/ui/image";
import { IMAGES, REVORA_SHIELD, formatINR } from "@/lib/revoraData";

export default function RevoraShieldDetail() {
  const navigate = useNavigate();

  return (
    <div className="bg-revora-canvas min-h-screen">
      <Header />
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 pt-6">
        <button onClick={() => navigate("/care-plans")} className="flex items-center gap-1.5 text-sm text-revora-muted hover:text-revora-ink">
          <ChevronLeft className="w-4 h-4" /> Back to Care Plans
        </button>
      </div>

      <div className="mx-auto max-w-[1360px] px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-revora-gold uppercase">
            <ShieldCheck className="w-4 h-4" /> {REVORA_SHIELD.tagline}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-revora-ink mt-2">{REVORA_SHIELD.name}</h1>
          <p className="text-sm text-revora-muted mt-3">{REVORA_SHIELD.description}</p>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="rounded-xl border border-revora-border p-4">
              <div className="flex items-center gap-1.5 text-revora-gold text-xs font-semibold uppercase tracking-wide"><Clock className="w-3.5 h-3.5" /> Duration</div>
              <div className="text-sm font-medium text-revora-ink mt-1">{REVORA_SHIELD.duration}</div>
            </div>
            <div className="rounded-xl border border-revora-border p-4">
              <div className="flex items-center gap-1.5 text-revora-gold text-xs font-semibold uppercase tracking-wide"><MapPin className="w-3.5 h-3.5" /> Coverage</div>
              <div className="text-sm font-medium text-revora-ink mt-1">{REVORA_SHIELD.coverage}</div>
            </div>
            <div className="rounded-xl border border-revora-border p-4">
              <div className="text-revora-gold text-xs font-semibold uppercase tracking-wide">Price</div>
              <div className="text-xl font-bold text-revora-ink mt-1">{formatINR(REVORA_SHIELD.price)}</div>
              <div className="text-[11px] text-revora-muted mt-0.5">per visit</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-revora-ink mb-3">What's included</h3>
            <ul className="space-y-2">
              {REVORA_SHIELD.included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-revora-ink/90">
                  <Check className="w-4 h-4 text-revora-success flex-shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-revora-ink mb-3">Not included</h3>
            <ul className="space-y-2">
              {REVORA_SHIELD.excluded.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-revora-muted">
                  <X className="w-4 h-4 text-revora-danger flex-shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl bg-revora-caresurface border border-revora-border p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-revora-careink flex-shrink-0 mt-0.5" />
            <p className="text-xs text-revora-careink/90 leading-relaxed">{REVORA_SHIELD.disclaimer}</p>
          </div>

          <button
            onClick={() => navigate("/care-plans/shield/book")}
            className="mt-8 w-full rounded-xl bg-revora-primary text-white font-semibold px-6 py-3.5 min-h-[52px] hover:bg-revora-primarydark transition-colors"
          >
            Book Now — {formatINR(REVORA_SHIELD.price)}
          </button>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden border border-revora-border aspect-[4/3] lg:aspect-[3/4] lg:sticky lg:top-24">
            <Image src={IMAGES.revoraShield} alt={REVORA_SHIELD.name} focalPointX={0.4} focalPointY={0.3} className="w-full h-full" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
