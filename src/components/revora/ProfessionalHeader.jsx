import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft } from "lucide-react";
import { useRevora } from "@/lib/revoraStore";

export default function ProfessionalHeader({ role, name }) {
  const navigate = useNavigate();
  const { signOutProfessional } = useRevora();

  const handleSignOut = () => {
    signOutProfessional();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-revora-surface/95 backdrop-blur border-b border-revora-border">
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="flex flex-col leading-none">
            <span className="text-lg md:text-xl font-bold tracking-tight text-revora-ink">THE REVORA</span>
            <span className="text-[10px] tracking-[0.2em] text-revora-gold font-medium">
              {role === "admin" ? "ADMIN PORTAL" : "PROFESSIONAL PORTAL"}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => navigate("/")}
            className="hidden md:flex items-center gap-1.5 text-sm text-revora-muted hover:text-revora-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to site
          </button>
          <span className="text-sm font-medium text-revora-ink hidden md:block">{name}</span>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-xl border border-revora-border px-3 md:px-4 py-2 text-sm font-medium text-revora-ink hover:border-revora-primary transition-colors min-h-[40px]"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
