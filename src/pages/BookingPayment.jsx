import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useRevora } from "@/lib/revoraStore";
import { getServiceById, formatINR } from "@/lib/revoraData";

export default function BookingPayment() {
  const navigate = useNavigate();
  const { state, confirmBooking } = useRevora();
  const [status, setStatus] = useState("processing"); // processing | failed
  const draft = state.draft;

  useEffect(() => {
    if (!draft) {
      navigate("/services");
      return;
    }
    const timer = setTimeout(() => {
      const success = Math.random() > 0.12;
      if (success) {
        const service = getServiceById(draft.serviceId);
        const pkg = service?.packages.find((p) => p.id === draft.packageId);
        const addons = service?.addons.filter((a) => draft.addonIds?.includes(a.id)) || [];
        const subtotal = (pkg?.price || 0) + addons.reduce((s, a) => s + a.price, 0);
        const total = subtotal + 29 + Math.round(subtotal * 0.05);
        const booking = confirmBooking({
          serviceId: draft.serviceId,
          packageId: draft.packageId,
          addonIds: draft.addonIds,
          addressId: draft.addressId,
          date: draft.date,
          timeWindow: draft.timeWindow,
          assignmentMode: draft.assignmentMode,
          professionalId: draft.professionalId,
          total,
        });
        navigate(`/booking/confirmation?bookingId=${booking.id}`);
      } else {
        setStatus("failed");
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, [draft]);

  if (!draft) return null;

  const retry = () => {
    setStatus("processing");
    setTimeout(() => {
      const service = getServiceById(draft.serviceId);
      const pkg = service?.packages.find((p) => p.id === draft.packageId);
      const addons = service?.addons.filter((a) => draft.addonIds?.includes(a.id)) || [];
      const subtotal = (pkg?.price || 0) + addons.reduce((s, a) => s + a.price, 0);
      const total = subtotal + 29 + Math.round(subtotal * 0.05);
      const booking = confirmBooking({
        serviceId: draft.serviceId,
        packageId: draft.packageId,
        addonIds: draft.addonIds,
        addressId: draft.addressId,
        date: draft.date,
        timeWindow: draft.timeWindow,
        assignmentMode: draft.assignmentMode,
        professionalId: draft.professionalId,
        total,
      });
      navigate(`/booking/confirmation?bookingId=${booking.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-revora-canvas flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-revora-surface rounded-2xl border border-revora-border p-6 md:p-10 text-center revora-fade-up">
        {status === "processing" && (
          <>
            <Loader2 className="w-12 h-12 text-revora-primary animate-spin mx-auto mb-5" />
            <h1 className="text-lg font-bold text-revora-ink">Processing your payment</h1>
            <p className="text-sm text-revora-muted mt-2">
              Please don't close this window. Demo payment — no real charge will occur.
            </p>
          </>
        )}
        {status === "failed" && (
          <>
            <XCircle className="w-12 h-12 text-revora-danger mx-auto mb-5" />
            <h1 className="text-lg font-bold text-revora-ink">Payment failed</h1>
            <p className="text-sm text-revora-muted mt-2">
              We couldn't process your demo payment. No amount was charged. You can safely retry.
            </p>
            <button
              onClick={retry}
              className="mt-6 w-full rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
            >
              Retry Payment
            </button>
            <button onClick={() => navigate("/booking/review")} className="mt-3 text-sm text-revora-muted">
              Back to review
            </button>
          </>
        )}
      </div>
    </div>
  );
}
