import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-revora-canvas">
      <header className="sticky top-0 z-40 bg-revora-surface/95 backdrop-blur border-b border-revora-border">
        <div className="mx-auto max-w-[840px] px-4 md:px-8 h-[64px] flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none">
            <span className="text-base md:text-lg font-bold tracking-tight text-revora-ink">THE REVORA</span>
            <span className="hidden md:block text-[10px] tracking-[0.2em] text-revora-gold font-medium">
              FIX · CLEAN · CARE
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium text-revora-muted hover:text-revora-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[840px] px-4 md:px-8 py-10 md:py-14">
        <div className="bg-revora-surface rounded-2xl border border-revora-border shadow-[0_6px_24px_rgba(20,40,43,0.06)] p-6 md:p-12">
          <p className="text-xs font-bold tracking-[0.2em] text-revora-gold uppercase mb-3">THE REVORA · Customer Documents</p>
          <h1 className="text-2xl md:text-4xl font-bold text-revora-ink leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-revora-muted mt-3">{subtitle}</p>}
          <div className="h-px bg-revora-border mt-8 mb-8" />
          <div className="legal-prose text-[15px] leading-relaxed text-revora-ink/90 space-y-7">{children}</div>
        </div>
        <p className="text-center text-xs text-revora-muted mt-6">
          © 2026 THE REVORA. Prototype experience — demo data only.
        </p>
      </main>
    </div>
  );
}
