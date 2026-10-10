import React from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ananya Reddy",
    location: "Banjara Hills, Hyderabad",
    text: "The plumber arrived on time, explained the issue clearly, and fixed it without any fuss. The clear-price promise is real — I approved the quote before any work started.",
    rating: 5,
  },
  {
    name: "Rohit Sharma",
    location: "Gachibowli, Hyderabad",
    text: "Booked a deep bathroom clean for the first time. The professional was uniformed, courteous, and meticulous. My bathroom hasn't looked this good since we moved in.",
    rating: 5,
  },
  {
    name: "Meera Iyer",
    location: "Jubilee Hills, Hyderabad",
    text: "The recurring care plan has genuinely simplified my life. Same trusted professional visits every month, checks everything, and flags small issues before they become big.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1360px] px-4 md:px-8 py-16 md:py-20">
      <div className="text-center mb-10 md:mb-12">
        <p className="text-xs font-bold tracking-[0.2em] text-revora-gold uppercase mb-3">Customer Feedback</p>
        <h2 className="text-2xl md:text-3xl font-bold text-revora-ink">Loved by Hyderabad Homes</h2>
        <p className="text-sm text-revora-muted mt-2 max-w-md mx-auto">
          Real experiences from THE REVORA customers — a prototype preview of the trust we're building.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl bg-revora-surface border border-revora-border p-6 flex flex-col shadow-[0_4px_20px_rgba(20,40,43,0.04)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-revora-gold text-revora-gold" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-revora-border" />
            </div>
            <p className="text-sm text-revora-ink/80 leading-relaxed flex-1">"{t.text}"</p>
            <div className="mt-5 pt-4 border-t border-revora-border">
              <div className="text-sm font-semibold text-revora-ink">{t.name}</div>
              <div className="text-xs text-revora-muted">{t.location}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
