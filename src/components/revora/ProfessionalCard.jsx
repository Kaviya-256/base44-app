import React from "react";
import { BadgeCheck, Star, Heart } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function ProfessionalCard({
  professional,
  selected = false,
  onSelect,
  isFavourite = false,
  onToggleFavourite,
  actionLabel,
  onAction,
}) {
  return (
    <div
      className={`rounded-2xl border p-3 md:p-4 flex items-center gap-3 md:gap-4 transition-colors ${
        selected ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border bg-revora-surface"
      } ${!professional.available ? "opacity-60" : ""}`}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
        <Image src={professional.photo} alt={professional.name} className="w-full h-full" fittingType="fill" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-revora-ink truncate">{professional.name}</span>
          {professional.verified && (
            <span className="inline-flex items-center gap-0.5 text-xs text-revora-cleanink">
              <BadgeCheck className="w-3.5 h-3.5" /> Verified
            </span>
          )}
        </div>
        <div className="text-xs text-revora-muted mt-0.5">{professional.skills.join(" · ")}</div>
        <div className="flex items-center gap-1 mt-1 text-sm text-revora-ink">
          <Star className="w-3.5 h-3.5 fill-revora-gold text-revora-gold" />
          {professional.ratingAvg}
          <span className="text-revora-muted">({professional.ratingCount} jobs)</span>
        </div>
        {!professional.available && <div className="text-xs text-revora-danger mt-1">Unavailable for this slot</div>}
      </div>
      <div className="flex flex-col items-end gap-2">
        {onToggleFavourite && (
          <button onClick={onToggleFavourite} aria-label="Toggle favourite" className="p-1.5">
            <Heart className={`w-5 h-5 ${isFavourite ? "fill-revora-danger text-revora-danger" : "text-revora-muted"}`} />
          </button>
        )}
        {onSelect && professional.available && (
          <button
            onClick={onSelect}
            className={`text-sm font-semibold px-4 py-2 rounded-xl min-h-[40px] transition-colors ${
              selected ? "bg-revora-primary text-white" : "border border-revora-border text-revora-ink hover:border-revora-primary"
            }`}
          >
            {selected ? "Selected" : "Choose"}
          </button>
        )}
        {actionLabel && (
          <button
            onClick={onAction}
            className="text-sm font-semibold px-4 py-2 rounded-xl min-h-[40px] bg-revora-primary text-white hover:bg-revora-primarydark transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
