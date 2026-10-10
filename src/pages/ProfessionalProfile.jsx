import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BadgeCheck, Star, Heart, ShieldCheck, CheckCircle2, ChevronLeft } from "lucide-react";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import { Image } from "@/components/ui/image";
import ProfessionalReviews from "@/components/revora/ProfessionalReviews";
import ProfessionalGallery from "@/components/revora/ProfessionalGallery";
import { useRevora } from "@/lib/revoraStore";
import { getProfessionalById, getServiceById, formatINR, TIME_WINDOWS } from "@/lib/revoraData";

export default function ProfessionalProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, toggleFavourite } = useRevora();
  const professional = getProfessionalById(id);

  if (!professional) {
    return (
      <div className="min-h-screen bg-revora-canvas flex items-center justify-center">
        <p className="text-revora-ink font-semibold">Professional not found.</p>
      </div>
    );
  }

  const isFavourite = state.favouriteProfessionalId === professional.id;
  const services = (professional.serviceIds || []).map(getServiceById).filter(Boolean);
  const previousBooking = state.bookings.find((b) => b.professionalId === professional.id);
  const primaryCategory = professional.categories?.[0];

  return (
    <div className="bg-revora-canvas min-h-screen">
      <Header />
      <div className="mx-auto max-w-[800px] px-4 md:px-8 pt-6 pb-28">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-revora-muted mb-4">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {/* A. Profile Header */}
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border border-revora-border">
            <Image src={professional.photo} alt={professional.name} className="w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-revora-ink">{professional.name}</h1>
              {professional.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-revora-cleanink bg-revora-cleansurface px-2 py-1 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5" /> THE REVORA Verified
                </span>
              )}
            </div>
            <p className="text-sm text-revora-muted mt-0.5">{professional.profession}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-revora-ink flex-wrap">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-revora-gold text-revora-gold" /> {professional.ratingAvg}
              </span>
              <span className="text-revora-muted">{professional.jobsCompleted} jobs</span>
              <span className="text-revora-muted">{professional.yearsExperience}+ years</span>
            </div>
            <p className="text-sm text-revora-success font-medium mt-1">{professional.availabilityText}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={() => toggleFavourite(professional.id)}
            className="flex items-center justify-center gap-2 rounded-xl border border-revora-border px-4 py-3 min-h-[48px] text-sm font-semibold text-revora-ink"
          >
            <Heart className={`w-4 h-4 ${isFavourite ? "fill-revora-danger text-revora-danger" : ""}`} />
            {isFavourite ? "Favourited" : "Favourite"}
          </button>
          <button
            onClick={() => navigate(`/services?category=${primaryCategory}`)}
            className="flex-1 rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
          >
            Book Now
          </button>
        </div>

        {/* J. Book Again */}
        {previousBooking && (
          <div className="mt-6 rounded-xl border border-revora-primary/30 bg-revora-primary/5 p-4">
            <p className="text-sm font-semibold text-revora-ink">You booked {professional.name.split(" ")[0]} previously</p>
            <p className="text-xs text-revora-muted mt-1">
              {previousBooking.date} · {getServiceById(previousBooking.serviceId)?.name || "Service"}
            </p>
            <button
              onClick={() => navigate(`/services?category=${primaryCategory}`)}
              className="mt-3 text-sm font-semibold text-revora-primary"
            >
              Book {professional.name.split(" ")[0]} Again →
            </button>
          </div>
        )}

        {/* B. Trust & Verification */}
        <Section title="Trust & Verification">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {["Identity verified", "Background verification completed", "Skills verified", "Training completed"].map(
              (t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-revora-ink">
                  <CheckCircle2 className="w-4 h-4 text-revora-success flex-shrink-0" /> {t}
                </div>
              )
            )}
          </div>
        </Section>

        {/* C. About */}
        <Section title="About">
          <p className="text-sm text-revora-muted">{professional.bio}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {professional.languages?.map((l) => (
              <span key={l} className="text-xs bg-revora-surface border border-revora-border rounded-full px-3 py-1 text-revora-ink">
                {l}
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-1">
            {professional.specializations?.map((s) => (
              <li key={s} className="text-sm text-revora-ink flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-revora-primary" /> {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* D & I. Services & Pricing */}
        <Section title="Services">
          <div className="space-y-2">
            {services.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 text-sm border border-revora-border rounded-xl px-4 py-3">
                <span className="text-revora-ink font-medium min-w-0 truncate">{s.name}</span>
                <span className="text-revora-primary font-semibold">
                  {formatINR(Math.min(...s.packages.map((p) => p.price)))} onwards
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-revora-muted mt-2">
            Pricing is set by THE REVORA. Additional work or spare parts require your approval before billing.
          </p>
        </Section>

        {/* E. Performance Snapshot */}
        <Section title="Performance Snapshot">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Repeat customers" value={`${professional.repeatCustomerRate}%`} />
            <Stat label="On-time rate" value={`${professional.onTimeRate}%`} />
            <Stat label="Completion rate" value={`${professional.completionRate}%`} />
            <Stat label="Recommend rate" value={`${professional.recommendationRate}%`} />
          </div>
        </Section>

        {/* F. Reviews */}
        <Section title="Reviews">
          <ProfessionalReviews reviews={professional.reviews} />
        </Section>

        {/* G. Work Gallery */}
        <Section title="Work Gallery">
          <ProfessionalGallery images={professional.gallery} />
        </Section>

        {/* H. Availability */}
        <Section title="Availability">
          <div className="grid grid-cols-2 gap-2">
            {TIME_WINDOWS.map((t) => (
              <div key={t} className="text-sm text-center border border-revora-border rounded-xl py-2 text-revora-ink">
                {t}
              </div>
            ))}
          </div>
        </Section>

        {/* K. THE REVORA Protection */}
        <Section title="THE REVORA Protection">
          <div className="flex items-start gap-2 text-sm text-revora-ink">
            <ShieldCheck className="w-4 h-4 text-revora-primary flex-shrink-0 mt-0.5" />
            Transparent pricing, verified professionals, dedicated support, digital records, secure payment and
            applicable service warranty on every booking.
          </div>
        </Section>
      </div>

      {/* L. Sticky Booking CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-revora-surface border-t border-revora-border p-4 md:hidden">
        <button
          onClick={() => navigate(`/services?category=${primaryCategory}`)}
          className="w-full rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px]"
        >
          Book Now
        </button>
      </div>

      <Footer />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-8">
      <h2 className="text-base font-bold text-revora-ink mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-revora-border p-3 text-center">
      <div className="text-lg font-bold text-revora-ink">{value}</div>
      <div className="text-xs text-revora-muted mt-0.5">{label}</div>
    </div>
  );
}
