import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Calendar, MapPin, Search, ArrowRight, Star, BadgeCheck, ShieldCheck, Wallet, HeadphonesIcon, FileCheck } from "lucide-react";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import CategoryCard from "@/components/revora/CategoryCard";
import ServiceCard from "@/components/revora/ServiceCard";
import FindRightService from "@/components/revora/FindRightService";
import { Image } from "@/components/ui/image";
import { useRevora } from "@/lib/revoraStore";
import { CATEGORIES, SERVICES, getServiceById, getProfessionalById } from "@/lib/revoraData";

export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useRevora();
  const firstName = state.user.name || "Welcome";

  const nextBooking = state.bookings.find((b) => b.status === "confirmed" || b.status === "in_progress");
  const favouritePro = state.favouriteProfessionalId ? getProfessionalById(state.favouriteProfessionalId) : null;

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const greeting = firstName === "Welcome" ? "Welcome" : `${timeGreeting}, ${firstName} 👋`;

  const TRUST_ITEMS = [
    { icon: ShieldCheck, title: "Verified Professionals", desc: "Skilled, trained and trusted" },
    { icon: Wallet, title: "Transparent Pricing", desc: "No hidden charges" },
    { icon: FileCheck, title: "Background Checked", desc: "For your safety and peace of mind" },
    { icon: HeadphonesIcon, title: "THE REVORA Support", desc: "Here whenever you need us" },
  ];

  return (
    <div className="bg-revora-canvas min-h-screen">
      <Header />

      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pt-8 pb-6">
        <div className="flex items-center gap-2 text-sm text-revora-muted mb-2">
          <MapPin className="w-4 h-4" /> Hyderabad
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-revora-ink">{greeting} 👋</h1>
        <p className="text-revora-muted mt-1">What does your home need today?</p>

        <button
          onClick={() => navigate("/services")}
          className="mt-5 w-full max-w-lg flex items-center gap-2 bg-revora-surface border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-left"
        >
          <Search className="w-4 h-4 text-revora-muted" />
          <span className="text-sm text-revora-muted">Search for a service...</span>
        </button>
      </section>

      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((c) => (
          <CategoryCard key={c.key} category={c} compact />
        ))}
      </section>

      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Next booking */}
        <div className="bg-revora-surface border border-revora-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-revora-ink flex items-center gap-2">
              <Calendar className="w-4 h-4 text-revora-gold" /> Your next booking
            </h2>
            {nextBooking && (
              <Link to={`/bookings/${nextBooking.id}`} className="text-xs font-semibold text-revora-primary">
                View all
              </Link>
            )}
          </div>
          {nextBooking ? (
            (() => {
              const svc = getServiceById(nextBooking.serviceId);
              return (
                <button
                  onClick={() => navigate(`/bookings/${nextBooking.id}`)}
                  className="w-full flex items-center gap-4 text-left"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={svc?.image} alt={svc?.name} className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-revora-ink truncate">{svc?.name}</div>
                    <div className="text-xs text-revora-muted mt-0.5">
                      {nextBooking.date} · {nextBooking.timeWindow}
                    </div>
                    <span className="inline-block mt-1.5 text-xs font-medium text-revora-success bg-revora-success/10 rounded-full px-2 py-0.5">
                      Confirmed
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-revora-muted flex-shrink-0" />
                </button>
              );
            })()
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-revora-muted mb-4">Ready for your next home service?</p>
              <button
                onClick={() => navigate("/services")}
                className="rounded-xl bg-revora-primary text-white text-sm font-semibold px-5 py-2.5 min-h-[44px]"
              >
                Explore Services
              </button>
            </div>
          )}
        </div>

        {/* Preferred professional */}
        <div className="bg-revora-surface border border-revora-border rounded-2xl p-5">
          <h2 className="font-semibold text-revora-ink flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-revora-gold" /> Your preferred professional
          </h2>
          {favouritePro ? (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image src={favouritePro.photo} alt={favouritePro.name} className="w-full h-full" fittingType="fill" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-revora-ink truncate">{favouritePro.name}</span>
                  {favouritePro.verified && <BadgeCheck className="w-4 h-4 text-revora-cleanink" />}
                </div>
                <div className="text-xs text-revora-muted">{favouritePro.skills.join(" · ")}</div>
                <div className="flex items-center gap-1 text-sm mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-revora-gold text-revora-gold" /> {favouritePro.ratingAvg}{" "}
                  <span className="text-revora-muted">({favouritePro.ratingCount} jobs)</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/services")}
                className="text-sm font-semibold px-4 py-2 rounded-xl min-h-[40px] bg-revora-primary text-white"
              >
                Book again
              </button>
            </div>
          ) : (
            <p className="text-sm text-revora-muted text-center py-6">
              You haven't saved a preferred professional yet. Favourite one after your next booking.
            </p>
          )}
        </div>
      </section>

      <FindRightService />

      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-16">
        <h2 className="text-xl font-bold text-revora-ink mb-5">Recommended for your home</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[SERVICES[0], SERVICES[4], SERVICES[12], SERVICES[16]].map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-10">
        <div className="bg-revora-surface rounded-2xl border border-revora-border grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-revora-border">
          {TRUST_ITEMS.map((t) => (
            <div key={t.title} className="flex flex-col items-center text-center p-5">
              <t.icon className="w-6 h-6 text-revora-primary mb-2" />
              <div className="font-semibold text-sm text-revora-ink">{t.title}</div>
              <div className="text-xs text-revora-muted mt-0.5">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
