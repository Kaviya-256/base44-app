import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Calendar, Clock, AlertCircle } from "lucide-react";
import Header from "@/components/revora/Header";
import { Image } from "@/components/ui/image";
import { useRevora } from "@/lib/revoraStore";
import { getServiceById, getProfessionalById, formatINR, CANCELLATION_POLICY } from "@/lib/revoraData";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, updateBooking, startDraft } = useRevora();
  const [showCancel, setShowCancel] = useState(false);

  const booking = state.bookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <div className="min-h-screen bg-revora-canvas">
        <Header />
        <div className="text-center py-24">
          <p className="text-revora-ink font-semibold">Booking not found.</p>
        </div>
      </div>
    );
  }

  const service = getServiceById(booking.serviceId);
  const professional = booking.professionalId ? getProfessionalById(booking.professionalId) : null;
  const address = state.addresses.find((a) => a.id === booking.addressId);

  const statusStyles = {
    confirmed: "bg-revora-success/10 text-revora-success",
    cancelled: "bg-revora-danger/10 text-revora-danger",
    completed: "bg-revora-primary/10 text-revora-primary",
  };

  const handleCancel = () => {
    updateBooking(booking.id, { status: "cancelled", paymentStatus: "refund_pending" });
    setShowCancel(false);
  };

  const handleReschedule = () => {
    startDraft({
      serviceId: booking.serviceId,
      packageId: booking.packageId,
      addonIds: booking.addonIds,
      addressId: booking.addressId,
      assignmentMode: booking.assignmentMode,
      professionalId: booking.professionalId,
    });
    navigate("/booking/schedule");
  };

  const handleBookAgain = () => {
    startDraft({
      serviceId: booking.serviceId,
      packageId: booking.packageId,
      addonIds: booking.addonIds,
      assignmentMode: booking.assignmentMode,
      professionalId: booking.professionalId,
    });
    navigate("/booking/address");
  };

  return (
    <div className="min-h-screen bg-revora-canvas">
      <Header />
      <div className="mx-auto max-w-[720px] px-4 md:px-8 py-8">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1.5 text-sm text-revora-muted mb-5">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-5">
          <Image src={service?.image} alt={service?.name} className="w-full h-full" />
        </div>

        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-revora-ink">{service?.name}</h1>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[booking.status] || "bg-revora-border text-revora-ink"}`}>
            {booking.status}
          </span>
        </div>
        <p className="text-sm text-revora-muted mb-6">Booking ID: {booking.id}</p>

        <div className="bg-revora-surface border border-revora-border rounded-2xl p-5 space-y-3 mb-5">
          <div className="flex items-center gap-2 text-sm text-revora-ink">
            <Calendar className="w-4 h-4 text-revora-gold" /> {booking.date}
          </div>
          <div className="flex items-center gap-2 text-sm text-revora-ink">
            <Clock className="w-4 h-4 text-revora-gold" /> {booking.timeWindow}
          </div>
          <div className="flex items-center gap-2 text-sm text-revora-ink">
            <MapPin className="w-4 h-4 text-revora-gold" /> {address ? `${address.house}, ${address.area}, ${address.city}` : "—"}
          </div>
          <div className="text-sm text-revora-ink">
            Professional: {booking.assignmentMode === "auto" ? "THE THE REVORA assigned" : professional?.name || "—"}
          </div>
          <div className="text-sm text-revora-ink">Payment: {booking.paymentStatus}</div>
          <div className="text-sm font-semibold text-revora-ink pt-2 border-t border-revora-border">
            Total paid: {formatINR(booking.total || 0)}
          </div>
        </div>

        {booking.status === "confirmed" && (
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={handleReschedule}
              className="rounded-xl border border-revora-border text-revora-ink font-semibold px-5 py-2.5 min-h-[44px]"
            >
              Reschedule
            </button>
            <button
              onClick={() => setShowCancel(true)}
              className="rounded-xl border border-revora-danger text-revora-danger font-semibold px-5 py-2.5 min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={handleBookAgain}
              className="rounded-xl bg-revora-primary text-white font-semibold px-5 py-2.5 min-h-[44px] sm:ml-auto"
            >
              Book Again
            </button>
          </div>
        )}

        {(booking.status === "cancelled" || booking.status === "completed") && (
          <button
            onClick={handleBookAgain}
            className="rounded-xl bg-revora-primary text-white font-semibold px-5 py-2.5 min-h-[44px]"
          >
            Book Again
          </button>
        )}

        {showCancel && (
          <div className="mt-5 rounded-xl border border-revora-danger/40 bg-revora-danger/[0.04] p-5">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-revora-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-revora-ink">
                Cancellation policy (demo): cancelling now retains a full refund. Estimated refund:{" "}
                <strong>{formatINR(booking.total || 0)}</strong>.
              </p>
            </div>
            <p className="text-xs text-revora-muted mb-4">{CANCELLATION_POLICY.note}</p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="rounded-xl bg-revora-danger text-white font-semibold px-5 py-2.5 min-h-[44px]"
              >
                Confirm Cancellation
              </button>
              <button
                onClick={() => setShowCancel(false)}
                className="rounded-xl border border-revora-border text-revora-ink font-semibold px-5 py-2.5 min-h-[44px]"
              >
                Keep Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
