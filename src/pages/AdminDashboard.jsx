import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, IndianRupee, Users, Wrench, Star } from "lucide-react";
import ProfessionalHeader from "@/components/revora/ProfessionalHeader";
import { useRevora } from "@/lib/revoraStore";
import { Image } from "@/components/ui/image";
import {
  ADMIN_STATS,
  ADMIN_RECENT_BOOKINGS,
  PROFESSIONALS,
  SERVICES,
  formatINR,
} from "@/lib/revoraData";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { state } = useRevora();
  const name = state.professional.name || "THE REVORA Admin";

  useEffect(() => {
    if (!state.professional.signedIn || state.professional.role !== "admin") {
      navigate("/professional-login");
    }
  }, [state.professional, navigate]);

  if (!state.professional.signedIn || state.professional.role !== "admin") return null;

  const stats = [
    { icon: Calendar, label: "Total Bookings", value: ADMIN_STATS.totalBookings.toLocaleString("en-IN"), sub: "+" + ADMIN_STATS.monthlyGrowth + "% this month" },
    { icon: IndianRupee, label: "Total Revenue", value: formatINR(ADMIN_STATS.totalRevenue), sub: "All-time" },
    { icon: Users, label: "Active Professionals", value: String(ADMIN_STATS.activeProfessionals), sub: "Across all cities" },
    { icon: Wrench, label: "Services Offered", value: String(ADMIN_STATS.servicesOffered), sub: "Across Fix, Clean, Care" },
  ];

  return (
    <div className="bg-revora-canvas min-h-screen">
      <ProfessionalHeader role="admin" name={name} />

      {/* Welcome */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pt-8 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-revora-ink">Admin Dashboard</h1>
        <p className="text-revora-muted mt-1">Overview of THE REVORA operations.</p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-revora-surface border border-revora-border rounded-2xl p-5">
            <div className="w-10 h-10 rounded-full bg-revora-primary/10 flex items-center justify-center mb-3">
              <s.icon className="w-5 h-5 text-revora-primary" />
            </div>
            <div className="text-2xl font-bold text-revora-ink">{s.value}</div>
            <div className="text-xs text-revora-muted mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Recent bookings */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-10">
        <h2 className="text-xl font-bold text-revora-ink mb-5">Recent Bookings</h2>
        <div className="bg-revora-surface border border-revora-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4 px-3 md:px-5 py-3 border-b border-revora-border text-xs font-semibold text-revora-muted uppercase tracking-wide">
            <div className="min-w-0">Booking ID</div>
            <div className="hidden md:block">Customer</div>
            <div className="min-w-0">Service</div>
            <div>Date</div>
            <div className="text-right">Amount</div>
          </div>
          {ADMIN_RECENT_BOOKINGS.map((b) => (
            <div key={b.id} className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4 px-3 md:px-5 py-3 border-b border-revora-border last:border-0 items-center text-sm">
              <div className="font-mono text-revora-ink text-xs min-w-0 truncate">{b.id}</div>
              <div className="hidden md:block text-revora-ink">{b.customerName}</div>
              <div className="text-revora-ink min-w-0 truncate">{b.serviceName}</div>
              <div className="text-revora-muted">{b.date}</div>
              <div className="text-right flex items-center justify-end gap-2">
                <span className="font-semibold text-revora-ink">{formatINR(b.amount)}</span>
                <span
                  className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                    b.status === "confirmed"
                      ? "text-revora-success bg-revora-success/10"
                      : b.status === "completed"
                      ? "text-revora-fixink bg-revora-fixsurface"
                      : "text-revora-danger bg-revora-danger/10"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professionals overview */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-10">
        <h2 className="text-xl font-bold text-revora-ink mb-5">Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROFESSIONALS.map((p) => (
            <div key={p.id} className="bg-revora-surface border border-revora-border rounded-2xl p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                <Image src={p.photo} alt={p.name} className="w-full h-full" fittingType="fill" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-revora-ink">{p.name}</div>
                <div className="text-xs text-revora-muted">{p.skills.join(" · ")}</div>
                <div className="flex items-center gap-1 text-sm mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-revora-gold text-revora-gold" /> {p.ratingAvg}
                  <span className="text-revora-muted">({p.ratingCount} jobs)</span>
                </div>
              </div>
              <span
                className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                  p.available ? "text-revora-success bg-revora-success/10" : "text-revora-muted bg-revora-canvas"
                }`}
              >
                {p.available ? "Available" : "Off duty"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services overview */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-16">
        <h2 className="text-xl font-bold text-revora-ink mb-5">Services Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <div key={s.id} className="bg-revora-surface border border-revora-border rounded-2xl p-5">
              <div className="font-semibold text-revora-ink text-sm">{s.name}</div>
              <div className="text-xs text-revora-muted mt-1">{s.category}</div>
              <div className="text-sm font-bold text-revora-primary mt-2">
                From {formatINR(s.packages[0]?.price || 0)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
