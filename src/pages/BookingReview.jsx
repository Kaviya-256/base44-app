import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingLayout from "@/components/revora/BookingLayout";
import { useRevora } from "@/lib/revoraStore";
import { getServiceById, getProfessionalById, formatINR } from "@/lib/revoraData";

export default function BookingReview() {
  const navigate = useNavigate();
  const { state } = useRevora();

  useEffect(() => {
    if (!state.draft) navigate("/services");
  }, [state.draft, navigate]);

  if (!state.draft) return null;

  const draft = state.draft;
  const service = getServiceById(draft.serviceId);
  const pkg = service?.packages.find((p) => p.id === draft.packageId);
  const addons = service?.addons.filter((a) => draft.addonIds?.includes(a.id)) || [];
  const address = state.addresses.find((a) => a.id === draft.addressId);
  const professional = draft.professionalId ? getProfessionalById(draft.professionalId) : null;

  const subtotal = (pkg?.price || 0) + addons.reduce((s, a) => s + a.price, 0);
  const fee = 29;
  const tax = Math.round(subtotal * 0.05);
  const discount = 0;
  const total = subtotal + fee + tax - discount;

  const Row = ({ label, value }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-revora-border last:border-0">
      <span className="text-sm text-revora-muted">{label}</span>
      <span className="text-sm font-medium text-revora-ink text-right">{value}</span>
    </div>
  );

  return (
    <BookingLayout
      step="review"
      title="Review your booking"
      backTo="/booking/professional"
      footer={
        <button
          onClick={() => navigate("/booking/payment")}
          className="w-full rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
        >
          Confirm & Pay {formatINR(total)}
        </button>
      }
    >
      <div className="bg-revora-surface border border-revora-border rounded-2xl p-5 mb-5">
        <h2 className="font-semibold text-revora-ink mb-2">Service</h2>
        <Row label="Service" value={service?.name} />
        <Row label="Package" value={pkg?.name} />
        {addons.map((a) => (
          <Row key={a.id} label={a.name} value={formatINR(a.price)} />
        ))}
      </div>

      <div className="bg-revora-surface border border-revora-border rounded-2xl p-5 mb-5">
        <h2 className="font-semibold text-revora-ink mb-2">Address & schedule</h2>
        <Row label="Address" value={address ? `${address.house}, ${address.area}` : "—"} />
        <Row label="Date" value={draft.date} />
        <Row label="Time" value={draft.timeWindow} />
        <Row
          label="Professional"
          value={draft.assignmentMode === "auto" ? "THE THE REVORA will assign" : professional?.name || "—"}
        />
      </div>

      <div className="bg-revora-surface border border-revora-border rounded-2xl p-5 mb-5">
        <h2 className="font-semibold text-revora-ink mb-2">Price breakdown</h2>
        <Row label="Subtotal" value={formatINR(subtotal)} />
        <Row label="Platform fee" value={formatINR(fee)} />
        <Row label="Tax (5%)" value={formatINR(tax)} />
        <Row label="Discount" value={discount ? `- ${formatINR(discount)}` : formatINR(0)} />
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-revora-border">
          <span className="font-semibold text-revora-ink">Total</span>
          <span className="font-bold text-revora-primary text-lg">{formatINR(total)}</span>
        </div>
      </div>

      <div className="rounded-xl bg-revora-caresurface text-revora-careink text-sm px-4 py-3">
        Demo payment — this prototype simulates payment; no real charge occurs.
      </div>
    </BookingLayout>
  );
}
