import React from "react";

export function LegalSection({ number, title, children }) {
  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-revora-ink mb-3">
        {number ? `${number}. ` : ""}
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function LegalBullet({ children }) {
  return (
    <p className="flex gap-2">
      <span className="text-revora-primary mt-1.5 flex-shrink-0">•</span>
      <span>{children}</span>
    </p>
  );
}
