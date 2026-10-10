import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Home, Calendar, Clock, Camera, Upload, ShieldCheck } from "lucide-react";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import { useRevora } from "@/lib/revoraStore";
import { TIME_WINDOWS, REVORA_SHIELD, CANCELLATION_POLICY, formatINR } from "@/lib/revoraData";
import { base44 } from "@/api/base44Client";

const STEPS = ["Property", "Schedule", "Details", "Confirm"];
const HOME_TYPES = ["Apartment", "Independent House", "Villa"];

function nextDays(n) {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function RevoraShieldBooking() {
  const navigate = useNavigate();
  const { state, addAddress, confirmBooking } = useRevora();
  const [step, setStep] = useState(0);

  const [addressId, setAddressId] = useState(state.addresses[0]?.id || "");
  const [showForm, setShowForm] = useState(!state.addresses.length);
  const [form, setForm] = useState({ house: "", street: "", area: "", city: "Hyderabad", pincode: "" });
  const [homeType, setHomeType] = useState(HOME_TYPES[0]);
  const [addrError, setAddrError] = useState("");

  const [dateIdx, setDateIdx] = useState(0);
  const [timeWindow, setTimeWindow] = useState("");
  const days = nextDays(7);
  const selectedDate = days[dateIdx];
  const dateLabel = selectedDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

  const [notes, setNotes] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [confirmed, setConfirmed] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const tax = Math.round(REVORA_SHIELD.price * 0.18);
  const total = REVORA_SHIELD.price + tax;

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!form.house || !form.street || !form.area || !form.pincode) {
      setAddrError("Please fill in all fields.");
      return;
    }
    const id = addAddress(form);
    setAddressId(id);
    setShowForm(false);
    setAddrError("");
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
      setPhotoUrl(file_uri);
    } catch {
      setAddrError("Could not upload photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const canContinue = () => {
    if (step === 0) return !!addressId;
    if (step === 1) return !!timeWindow;
    return true;
  };

  const handleConfirm = () => {
    const booking = confirmBooking({
      type: "shield",
      planId: REVORA_SHIELD.id,
      serviceName: REVORA_SHIELD.name,
      addressId,
      homeType,
      date: dateLabel,
      timeWindow,
      notes,
      photoUri: photoUrl,
      total,
      paymentStatus: "paid",
      status: "confirmed",
    });
    setConfirmedBooking(booking);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="bg-revora-canvas min-h-screen">
        <Header />
        <div className="mx-auto max-w-[640px] px-4 md:px-8 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-revora-success/10 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-revora-success" />
          </div>
          <h1 className="text-2xl font-bold text-revora-ink mt-4">You're booked!</h1>
          <p className="text-sm text-revora-muted mt-2">
            Your REVORA SHIELD visit is confirmed. A dated summary will be saved to your Home Passport after the visit.
          </p>
          <div className="mt-6 rounded-2xl border border-revora-border bg-revora-surface p-5 text-left text-sm space-y-2">
            <div className="flex justify-between"><span className="text-revora-muted">Booking ID</span><span className="font-medium text-revora-ink">{confirmedBooking.id}</span></div>
            <div className="flex justify-between"><span className="text-revora-muted">Service</span><span className="font-medium text-revora-ink">{REVORA_SHIELD.name}</span></div>
            <div className="flex justify-between"><span className="text-revora-muted">Date</span><span className="font-medium text-revora-ink">{dateLabel}</span></div>
            <div className="flex justify-between"><span className="text-revora-muted">Time</span><span className="font-medium text-revora-ink">{timeWindow}</span></div>
            <div className="flex justify-between"><span className="text-revora-muted">Amount paid</span><span className="font-medium text-revora-ink">{formatINR(total)}</span></div>
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <button onClick={() => navigate("/dashboard")} className="rounded-xl bg-revora-primary text-white font-semibold px-6 py-3 min-h-[48px]">Go to Dashboard</button>
            <button onClick={() => navigate("/care-plans")} className="rounded-xl border border-revora-border text-revora-ink font-semibold px-6 py-3 min-h-[48px]">Care Plans</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-revora-canvas min-h-screen">
      <Header />
      <div className="mx-auto max-w-[900px] px-4 md:px-8 py-6">
        <button onClick={() => (step === 0 ? navigate("/care-plans/shield") : setStep(step - 1))} className="flex items-center gap-1.5 text-sm text-revora-muted hover:text-revora-ink mb-4">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-2 mb-6">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${i <= step ? "text-revora-primary" : "text-revora-muted"}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${i <= step ? "bg-revora-primary text-white" : "bg-revora-border text-revora-muted"}`}>{i + 1}</span>
                <span className="text-xs font-medium hidden sm:inline">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-revora-primary" : "bg-revora-border"}`} />}
            </React.Fragment>
          ))}
        </div>

        {step === 0 && (
          <div>
            <h2 className="text-lg font-bold text-revora-ink mb-1">Property details</h2>
            <p className="text-sm text-revora-muted mb-5">Choose the residence for your SHIELD visit.</p>

            <div className="mb-5">
              <label className="text-xs font-semibold text-revora-ink uppercase tracking-wide">Home type</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {HOME_TYPES.map((t) => (
                  <button key={t} onClick={() => setHomeType(t)} className={`rounded-xl border-2 py-2.5 text-sm font-medium transition-colors ${homeType === t ? "border-revora-primary bg-revora-primary/[0.04] text-revora-ink" : "border-revora-border text-revora-muted"}`}>{t}</button>
                ))}
              </div>
            </div>

            {state.addresses.length > 0 && (
              <div className="space-y-3 mb-4">
                {state.addresses.map((addr) => (
                  <button key={addr.id} onClick={() => setAddressId(addr.id)} className={`w-full text-left flex items-start gap-3 rounded-xl border-2 p-4 transition-colors ${addressId === addr.id ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"}`}>
                    <Home className="w-5 h-5 text-revora-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-revora-ink">{addr.house}, {addr.street}</div>
                      <div className="text-sm text-revora-muted">{addr.area}, {addr.city} - {addr.pincode}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!showForm ? (
              <button onClick={() => setShowForm(true)} className="text-sm font-semibold text-revora-primary">+ Add new address</button>
            ) : (
              <form onSubmit={handleAddAddress} className="space-y-3 border border-revora-border rounded-xl p-5">
                <input placeholder="House / Apartment" value={form.house} onChange={(e) => setForm({ ...form, house: e.target.value })} className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary" />
                <input placeholder="Street" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary" />
                <input placeholder="Area" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary" />
                  <input placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary" />
                </div>
                {addrError && <p className="text-sm text-revora-danger">{addrError}</p>}
                <button type="submit" className="w-full rounded-xl bg-revora-ink text-white font-semibold py-3 min-h-[48px]">Save address</button>
              </form>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold text-revora-ink mb-1">Schedule your visit</h2>
            <p className="text-sm text-revora-muted mb-5">Pick a date and arrival window.</p>
            <div className="flex items-center gap-2 mb-3 text-revora-ink font-semibold text-sm"><Calendar className="w-4 h-4 text-revora-gold" /> Choose a date</div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
              {days.map((d, i) => (
                <button key={i} onClick={() => setDateIdx(i)} className={`flex-shrink-0 w-[68px] rounded-xl border-2 py-3 text-center transition-colors ${dateIdx === i ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"}`}>
                  <div className="text-xs text-revora-muted">{d.toLocaleDateString("en-IN", { weekday: "short" })}</div>
                  <div className="text-lg font-bold text-revora-ink">{d.getDate()}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3 text-revora-ink font-semibold text-sm"><Clock className="w-4 h-4 text-revora-gold" /> Available time windows</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIME_WINDOWS.map((tw) => (
                <button key={tw} onClick={() => setTimeWindow(tw)} className={`rounded-xl border-2 px-4 py-3 min-h-[48px] text-sm font-medium transition-colors ${timeWindow === tw ? "border-revora-primary bg-revora-primary/[0.04] text-revora-ink" : "border-revora-border text-revora-ink/80"}`}>{tw}</button>
              ))}
            </div>
            <p className="text-xs text-revora-muted mt-4">Demo availability windows — arrival window, not a fixed appointment.</p>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold text-revora-ink mb-1">Optional details</h2>
            <p className="text-sm text-revora-muted mb-5">Tell us about specific fixtures or share a photo.</p>
            <label className="text-xs font-semibold text-revora-ink uppercase tracking-wide">Notes (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="e.g. The kitchen tap has been making a noise, please check it." className="w-full mt-2 border border-revora-border rounded-xl px-4 py-3 text-sm outline-none focus:border-revora-primary" />
            <label className="text-xs font-semibold text-revora-ink uppercase tracking-wide mt-5 block">Photo (optional)</label>
            <div className="mt-2 rounded-xl border-2 border-dashed border-revora-border p-6 text-center">
              {photoUrl ? (
                <div className="flex items-center justify-center gap-2 text-sm text-revora-success"><Check className="w-4 h-4" /> Photo attached</div>
              ) : (
                <>
                  <Camera className="w-8 h-8 text-revora-muted mx-auto mb-2" />
                  <label className="inline-flex items-center gap-2 text-sm font-semibold text-revora-primary cursor-pointer">
                    <Upload className="w-4 h-4" /> {uploading ? "Uploading…" : "Upload a photo"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                  </label>
                </>
              )}
              <p className="text-xs text-revora-muted mt-3">Please avoid photographing people, children, valuables, or personal documents.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold text-revora-ink mb-1">Review & confirm</h2>
            <p className="text-sm text-revora-muted mb-5">Final payable price is inclusive of applicable taxes.</p>
            <div className="rounded-2xl border border-revora-border bg-revora-surface p-5 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-revora-ink font-semibold"><ShieldCheck className="w-4 h-4 text-revora-gold" /> {REVORA_SHIELD.name}</div>
              <div className="flex justify-between"><span className="text-revora-muted">Home type</span><span className="font-medium text-revora-ink">{homeType}</span></div>
              <div className="flex justify-between"><span className="text-revora-muted">Date</span><span className="font-medium text-revora-ink">{dateLabel}</span></div>
              <div className="flex justify-between"><span className="text-revora-muted">Time window</span><span className="font-medium text-revora-ink">{timeWindow}</span></div>
              <div className="flex justify-between"><span className="text-revora-muted">Visit duration</span><span className="font-medium text-revora-ink">{REVORA_SHIELD.duration}</span></div>
              {notes && <div className="flex justify-between gap-4"><span className="text-revora-muted">Notes</span><span className="font-medium text-revora-ink text-right">{notes}</span></div>}
              <div className="border-t border-revora-border pt-3 space-y-2">
                <div className="flex justify-between"><span className="text-revora-muted">Visit price</span><span className="text-revora-ink">{formatINR(REVORA_SHIELD.price)}</span></div>
                <div className="flex justify-between"><span className="text-revora-muted">Taxes (18%)</span><span className="text-revora-ink">{formatINR(tax)}</span></div>
                <div className="flex justify-between text-base font-bold"><span className="text-revora-ink">Total payable</span><span className="text-revora-primary">{formatINR(total)}</span></div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-revora-muted">
              <span>Free cancellation up to {CANCELLATION_POLICY.freeWindowHours}h before the visit.</span>
              <a href="/cancellation-policy" target="_blank" rel="noopener noreferrer" className="text-revora-primary underline">Cancellation Policy</a>
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-revora-primary underline">Terms</a>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-revora-border bg-revora-surface">
        <div className="mx-auto max-w-[900px] px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="text-sm">
            <span className="text-revora-muted">Total </span>
            <span className="font-bold text-revora-ink">{formatINR(total)}</span>
          </div>
          <button
            disabled={!canContinue()}
            onClick={() => (step === 3 ? handleConfirm() : setStep(step + 1))}
            className="rounded-xl bg-revora-primary text-white font-semibold px-8 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors disabled:opacity-50"
          >
            {step === 3 ? "Confirm Booking" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
