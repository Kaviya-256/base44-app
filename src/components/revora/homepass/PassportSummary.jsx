import React, { useState } from "react";
import { ShieldCheck, Camera, Check, Clock, UserCheck } from "lucide-react";
import { TIME_SLOTS } from "./HomeDetailsForm";

export default function PassportSummary({ selectedPackage, homeDetails, onConfirm }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ackScope, setAckScope] = useState(false);
  const [ackPhoto, setAckPhoto] = useState(false);
  const [ackAdult, setAckAdult] = useState(false);
  const [error, setError] = useState("");

  const addonCost = homeDetails.addonCost || 0;
  const total = homeDetails.total || selectedPackage.price;

  const handleConfirm = () => {
    if (!selectedSlot) {
      setError("Please select a time slot.");
      return;
    }
    if (!ackScope || !ackPhoto || !ackAdult) {
      setError("Please acknowledge all consents to continue.");
      return;
    }
    setError("");
    onConfirm({ selectedSlot, ackScope, ackPhoto, ackAdult });
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-revora-ink">Summary & payment</h2>
      <p className="text-sm text-revora-muted mt-1">Review your booking details and confirm.</p>

      {/* Itemized breakdown */}
      <div className="mt-6 rounded-2xl border border-revora-border bg-revora-surface overflow-hidden">
        <div className="p-5 border-b border-revora-border">
          <h3 className="font-semibold text-revora-ink">Home Passport — {selectedPackage.name}</h3>
          <p className="text-xs text-revora-muted mt-1">
            Up to {selectedPackage.maxArea} sq.ft. · {selectedPackage.maxBathrooms} bathroom(s) ·{" "}
            {selectedPackage.maxAppliances} appliances
          </p>
        </div>

        <div className="p-5 space-y-3">
          <Row label={`${selectedPackage.name} package`} value={`₹${selectedPackage.price}`} />
          {addonCost > 0 && (
            <Row
              label={`Extra appliance add-on × ${homeDetails.extraAppliances}`}
              value={`₹${addonCost}`}
              muted
            />
          )}
          <div className="border-t border-revora-border pt-3">
            <Row label="Total" value={`₹${total}`} bold />
          </div>
        </div>
      </div>

      {/* Home details summary */}
      <div className="mt-4 rounded-2xl border border-revora-border bg-revora-surface p-5">
        <h3 className="font-semibold text-revora-ink mb-3">Home details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <Detail label="Area" value={`${homeDetails.areaNum} sq.ft.`} />
          <Detail label="Bathrooms" value={String(homeDetails.bathNum)} />
          <Detail label="Appliances" value={String(homeDetails.applianceNum)} />
          <Detail label="Levels" value={homeDetails.levels === "multi" ? "Multi-level" : "Single"} />
        </div>
        <div className="mt-3 text-sm">
          <span className="text-revora-muted">Address: </span>
          <span className="text-revora-ink">{homeDetails.address}, {homeDetails.pincode}</span>
        </div>
      </div>

      {/* Time slot picker */}
      <div className="mt-4 rounded-2xl border border-revora-border bg-revora-surface p-5">
        <h3 className="font-semibold text-revora-ink mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-revora-gold" /> Choose a time slot
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isSelected ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"
                }`}
              >
                {slot}
                {isSelected && <Check className="w-4 h-4 text-revora-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Consent checkboxes */}
      <div className="mt-4 space-y-3">
        <Consent
          checked={ackScope}
          onChange={setAckScope}
          icon={ShieldCheck}
          text="I understand that repairs and specialist tests are not included in this visit and will be quoted separately if needed."
        />
        <Consent
          checked={ackPhoto}
          onChange={setAckPhoto}
          icon={Camera}
          text="I permit THE REVORA professionals to take photos of appliances and areas during the visit for documentation purposes."
        />
        <Consent
          checked={ackAdult}
          onChange={setAckAdult}
          icon={UserCheck}
          text="I confirm that an authorized adult (18+) will be present at the home for the entire duration of the visit."
        />
      </div>

      {error && <p className="text-sm text-revora-danger mt-4">{error}</p>}

      {/* Confirm and Pay */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm">
          <span className="text-revora-muted">Pay now: </span>
          <span className="font-bold text-revora-ink text-lg">₹{total}</span>
        </div>
        <button
          onClick={handleConfirm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-revora-primary text-white font-semibold px-8 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
        >
          Confirm and Pay
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, bold, muted }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? "text-revora-muted" : "text-revora-ink"}`}>{label}</span>
      <span className={`text-sm ${bold ? "font-bold text-revora-ink text-lg" : muted ? "text-revora-muted" : "font-medium text-revora-ink"}`}>
        {value}
      </span>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <div className="text-xs text-revora-muted">{label}</div>
      <div className="font-medium text-revora-ink mt-0.5">{value}</div>
    </div>
  );
}

function Consent({ checked, onChange, icon: Icon, text }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-start gap-3 rounded-xl border border-revora-border bg-revora-surface p-4 text-left transition-colors hover:border-revora-primary/40"
    >
      <span
        className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
          checked ? "bg-revora-primary border-revora-primary" : "border-revora-border"
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" />}
      </span>
      <span className="flex items-center gap-1.5 text-sm text-revora-ink">
        <Icon className="w-4 h-4 text-revora-muted flex-shrink-0" />
        {text}
      </span>
    </button>
  );
}
