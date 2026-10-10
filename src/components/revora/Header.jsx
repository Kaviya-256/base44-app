import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Menu, X, User } from "lucide-react";
import { useRevora } from "@/lib/revoraStore";

const NAV_LINKS = [
  { label: "FIX", to: "/services?group=FIX" },
  { label: "CLEAN", to: "/services?group=CLEAN" },
  { label: "CARE", to: "/care-plans" },
  { label: "WHY THE REVORA", to: "/#why-revora" },
];

export default function Header() {
  const { state } = useRevora();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-revora-surface/95 backdrop-blur border-b border-revora-border">
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className="text-lg md:text-xl font-bold tracking-tight text-revora-ink">THE REVORA</span>
          <span className="hidden md:block text-[10px] tracking-[0.2em] text-revora-gold font-medium">
            FIX · CLEAN · CARE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium text-revora-ink/80 hover:text-revora-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm text-revora-muted hover:text-revora-ink transition-colors">
            <MapPin className="w-4 h-4" />
            Hyderabad
          </button>
          {state.user.signedIn ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 rounded-full border border-revora-border pl-2 pr-4 py-1.5 text-sm font-medium text-revora-ink hover:border-revora-primary transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-revora-primary text-white flex items-center justify-center text-xs font-semibold">
                {state.user.name?.[0] || "U"}
              </span>
              {state.user.name}
            </button>
          ) : (
            <button
              onClick={() => navigate("/sign-in")}
              className="rounded-xl bg-revora-primary text-white text-sm font-semibold px-5 py-2.5 min-h-[44px] hover:bg-revora-primarydark transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        <button className="md:hidden p-2 -mr-2" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="w-6 h-6 text-revora-ink" />
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-revora-ink/40" onClick={() => setOpen(false)}>
          <div
            className="fixed right-0 top-0 bottom-0 w-[80%] max-w-[320px] bg-revora-surface p-6 flex flex-col gap-6 revora-fade-up overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-revora-ink">THE REVORA</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6 text-revora-ink" />
              </button>
            </div>
            <button className="flex items-center gap-2 text-sm text-revora-muted">
              <MapPin className="w-4 h-4" /> Hyderabad
            </button>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-revora-ink py-2 border-b border-revora-border"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            {state.user.signedIn ? (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/dashboard");
                }}
                className="mt-auto flex items-center gap-2 rounded-xl border border-revora-border px-4 py-3 text-sm font-medium"
              >
                <User className="w-4 h-4" /> {state.user.name}
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/sign-in");
                }}
                className="mt-auto rounded-xl bg-revora-primary text-white text-sm font-semibold px-5 py-3 min-h-[48px]"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
