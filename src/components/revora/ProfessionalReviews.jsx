import React from "react";
import { Star } from "lucide-react";

export default function ProfessionalReviews({ reviews }) {
  if (!reviews?.length) return null;
  return (
    <div className="space-y-3">
      {reviews.map((r, i) => (
        <div key={i} className="rounded-xl border border-revora-border bg-revora-surface p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-revora-ink">{r.name}</span>
            <div className="flex items-center gap-1 text-revora-gold">
              {Array.from({ length: r.rating }).map((_, idx) => (
                <Star key={idx} className="w-3.5 h-3.5 fill-revora-gold" />
              ))}
            </div>
          </div>
          <p className="text-sm text-revora-muted mt-2">{r.text}</p>
          <div className="text-xs text-revora-muted/80 mt-2">
            {r.service} · {r.date}
          </div>
        </div>
      ))}
    </div>
  );
}
