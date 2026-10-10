import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingLayout from "@/components/revora/BookingLayout";
import ProfessionalCard from "@/components/revora/ProfessionalCard";
import { useRevora } from "@/lib/revoraStore";
import { PROFESSIONALS, getServiceById } from "@/lib/revoraData";

export default function BookingProfessional() {
  const navigate = useNavigate();
  const { state, updateDraft, toggleFavourite } = useRevora();
  const [mode, setMode] = useState(state.draft?.assignmentMode || "auto");
  const [professionalId, setProfessionalId] = useState(state.draft?.professionalId || null);

  useEffect(() => {
    if (!state.draft) navigate("/services");
  }, [state.draft, navigate]);

  if (!state.draft) return null;

  const service = getServiceById(state.draft.serviceId);
  const eligiblePros = PROFESSIONALS.filter((p) => p.categories.includes(service?.category));

  const handleContinue = () => {
    updateDraft({ assignmentMode: mode, professionalId: mode === "choose" ? professionalId : null });
    navigate("/booking/review");
  };

  const canContinue = mode === "auto" || (mode === "choose" && professionalId);

  return (
    <BookingLayout
      step="professional"
      title="Who would you prefer?"
      backTo="/booking/schedule"
      footer={
        <button
          disabled={!canContinue}
          onClick={handleContinue}
          className="w-full rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors disabled:opacity-50"
        >
          Continue
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <button
          onClick={() => setMode("auto")}
          className={`rounded-xl border-2 p-4 text-left transition-colors ${
            mode === "auto" ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"
          }`}
        >
          <div className="font-semibold text-revora-ink">Let THE REVORA Assign</div>
          <p className="text-xs text-revora-muted mt-1">We'll match the best available verified professional.</p>
        </button>
        <button
          onClick={() => setMode("choose")}
          className={`rounded-xl border-2 p-4 text-left transition-colors ${
            mode === "choose" ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"
          }`}
        >
          <div className="font-semibold text-revora-ink">Choose a Professional</div>
          <p className="text-xs text-revora-muted mt-1">Pick from available verified professionals near you.</p>
        </button>
      </div>

      {mode === "choose" && (
        <div className="space-y-3">
          {eligiblePros.map((p) => (
            <ProfessionalCard
              key={p.id}
              professional={p}
              selected={professionalId === p.id}
              onSelect={() => setProfessionalId(p.id)}
              isFavourite={state.favouriteProfessionalId === p.id}
              onToggleFavourite={() => toggleFavourite(p.id)}
            />
          ))}
        </div>
      )}
      <p className="text-xs text-revora-muted mt-6">
        A chosen professional is a request until confirmed. If unavailable, you'll be asked to choose another or accept
        auto-assignment.
      </p>
    </BookingLayout>
  );
}
