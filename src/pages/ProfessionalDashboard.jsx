import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, IndianRupee, Star, TrendingUp, Clock, MapPin, CheckCircle2, BadgeCheck } from "lucide-react";
import ProfessionalHeader from "@/components/revora/ProfessionalHeader";
import { useRevora } from "@/lib/revoraStore";
import { Image } from "@/components/ui/image";
import {
  PROFESSIONAL_JOBS,
  PROFESSIONAL_EARNINGS,
  PROFESSIONAL_REVIEWS,
  getProfessionalById,
  getServiceById,
  formatINR,
} from "@/lib/revoraData";

const STAT_CARDS = [
  { key: "jobs", icon: Calendar, label: "Today's Jobs", getValue: (e) => String(PROFESSIONAL_JOBS.length), sub: "2 confirmed" },
  { key: "earnings", icon: IndianRupee, label: "This Week", getValue: () => formatINR(PROFESSIONAL_EARNINGS.week), sub: "₹3,200 pending" },
  { key: "rating", icon: Star, label: "Rating", getValue: () => "4.8", sub: "320+ jobs" },
  { key: "completion", icon: TrendingUp, label: "Completion", getValue: () => "98%", sub: "This month" },
];

export default function ProfessionalDashboard() {
  const navigate = useNavigate();
  const { state } = useRevora();
  const [available, setAvailable] = useState(true);

  const professional = getProfessionalById("pro-1");
  const name = state.professional.name || professional?.name || "Arjun Menon";

  useEffect(() => {
    if (!state.professional.signedIn) {
      navigate("/professional-login");
    }
  }, [state.professional.signedIn, navigate]);

  if (!state.professional.signedIn) return null;

  return (
    <div className="bg-revora-canvas min-h-screen">
      <ProfessionalHeader role="professional" name={name} />

      {/* Welcome */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image src={professional?.photo} alt={name} className="w-full h-full" fittingType="fill" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-revora-ink">{name}</h1>
              {professional?.verified && <BadgeCheck className="w-5 h-5 text-revora-cleanink" />}
            </div>
            <div className="text-sm text-revora-muted mt-0.5">
              {professional?.skills.join(" · ")} · ⭐ {professional?.ratingAvg} ({professional?.ratingCount} jobs)
            </div>
          </div>
        </div>

        {/* Availability toggle */}
        <div className="mt-5 inline-flex items-center gap-3 bg-revora-surface border border-revora-border rounded-xl px-4 py-3">
          <span className="text-sm font-medium text-revora-ink">Availability</span>
          <button
            onClick={() => setAvailable((a) => !a)}
            className={`relative w-11 h-6 rounded-full transition-colors ${available ? "bg-revora-primary" : "bg-revora-border"}`}
            aria-label="Toggle availability"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${available ? "translate-x-5" : ""}`}
            />
          </button>
          <span className={`text-sm font-medium ${available ? "text-revora-success" : "text-revora-muted"}`}>
            {available ? "Available for jobs" : "Unavailable"}
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CARDS.map((s) => (
          <div key={s.key} className="bg-revora-surface border border-revora-border rounded-2xl p-5">
            <div className="w-10 h-10 rounded-full bg-revora-primary/10 flex items-center justify-center mb-3">
              <s.icon className="w-5 h-5 text-revora-primary" />
            </div>
            <div className="text-2xl font-bold text-revora-ink">{s.getValue()}</div>
            <div className="text-xs text-revora-muted mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Today's schedule */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-10">
        <h2 className="text-xl font-bold text-revora-ink mb-5">Today's Schedule</h2>
        <div className="space-y-3">
          {PROFESSIONAL_JOBS.map((job) => {
            const svc = getServiceById(job.serviceId);
            return (
              <div key={job.id} className="bg-revora-surface border border-revora-border rounded-2xl p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={svc?.image} alt={svc?.name} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-revora-ink">{svc?.name}</div>
                  <div className="text-xs text-revora-muted mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {job.date} · {job.timeWindow}
                  </div>
                  <div className="text-xs text-revora-muted mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.customerArea}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-revora-ink">{formatINR(job.amount)}</div>
                  <span
                    className={`inline-block mt-1 text-xs font-medium rounded-full px-2 py-0.5 ${
                      job.status === "confirmed"
                        ? "text-revora-success bg-revora-success/10"
                        : "text-revora-careink bg-revora-caresurface"
                    }`}
                  >
                    {job.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent reviews */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-16">
        <h2 className="text-xl font-bold text-revora-ink mb-5">Recent Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROFESSIONAL_REVIEWS.map((rev) => (
            <div key={rev.id} className="bg-revora-surface border border-revora-border rounded-2xl p-5">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-revora-gold text-revora-gold" : "text-revora-border"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-revora-ink/80">"{rev.text}"</p>
              <div className="text-xs text-revora-muted mt-3">— {rev.customerName}, {rev.date}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
