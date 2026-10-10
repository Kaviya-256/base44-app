import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Plus, MapPin, AlertCircle } from "lucide-react";
import BookingLayout from "@/components/revora/BookingLayout";
import { useRevora } from "@/lib/revoraStore";

const UNSERVICEABLE_PINCODES = ["000000"];

export default function BookingAddress() {
  const navigate = useNavigate();
  const { state, updateDraft, addAddress } = useRevora();
  const [showForm, setShowForm] = useState(state.addresses.length === 0);
  const [selectedId, setSelectedId] = useState(state.draft?.addressId || state.addresses[0]?.id || null);
  const [form, setForm] = useState({ house: "", street: "", area: "", city: "Chennai", pincode: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state.draft) navigate("/services");
  }, [state.draft, navigate]);

  if (!state.draft) return null;

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!form.house || !form.street || !form.area || !form.pincode) {
      setError("Please fill in all fields.");
      return;
    }
    if (UNSERVICEABLE_PINCODES.includes(form.pincode)) {
      setError("This area isn't serviceable yet. Please try a different address.");
      return;
    }
    const id = addAddress(form);
    setSelectedId(id);
    setShowForm(false);
    setError("");
  };

  const handleContinue = () => {
    if (!selectedId) {
      setError("Please select or add an address.");
      return;
    }
    updateDraft({ addressId: selectedId });
    navigate("/booking/schedule");
  };

  return (
    <BookingLayout
      step="address"
      title="Select address"
      backTo={-1}
      footer={
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {error && (
            <span className="text-sm text-revora-danger flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {error}
            </span>
          )}
          <button
            onClick={handleContinue}
            className="sm:ml-auto rounded-xl bg-revora-primary text-white font-semibold px-8 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
          >
            Continue
          </button>
        </div>
      }
    >
      {state.addresses.length > 0 && (
        <div className="space-y-3 mb-6">
          {state.addresses.map((addr) => (
            <button
              key={addr.id}
              onClick={() => setSelectedId(addr.id)}
              className={`w-full text-left flex items-start gap-3 rounded-xl border-2 p-4 transition-colors ${
                selectedId === addr.id ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"
              }`}
            >
              <Home className="w-5 h-5 text-revora-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-revora-ink">
                  {addr.house}, {addr.street}
                </div>
                <div className="text-sm text-revora-muted">
                  {addr.area}, {addr.city} - {addr.pincode}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-sm font-semibold text-revora-primary"
        >
          <Plus className="w-4 h-4" /> Add new address
        </button>
      ) : (
        <form onSubmit={handleAddAddress} className="space-y-4 border border-revora-border rounded-xl p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-revora-ink mb-2">
            <MapPin className="w-4 h-4" /> New address
          </div>
          <input
            placeholder="House / Apartment"
            value={form.house}
            onChange={(e) => setForm({ ...form, house: e.target.value })}
            className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary"
          />
          <input
            placeholder="Street"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary"
          />
          <input
            placeholder="Area"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary"
            />
            <input
              placeholder="Pincode"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              className="w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none focus:border-revora-primary"
            />
          </div>
          {error && <p className="text-sm text-revora-danger">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-revora-ink text-white font-semibold py-3 min-h-[48px]"
          >
            Save address
          </button>
        </form>
      )}
    </BookingLayout>
  );
}
