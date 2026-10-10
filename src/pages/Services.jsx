import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Search, X } from "lucide-react";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import ServiceCard from "@/components/revora/ServiceCard";
import { SERVICES } from "@/lib/revoraData";

const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "PLUMBING", label: "Plumbing" },
  { key: "ELECTRICAL", label: "Electrical" },
  { key: "AC", label: "AC Care" },
  { key: "CLEANING", label: "Cleaning" },
  { key: "CARPENTRY", label: "Carpentry" },
  { key: "APPLIANCES", label: "Appliances" },
  { key: "CARE", label: "Home Care" },
  { key: "MOVE_IN", label: "Move In Magic" },
];

const GROUPS = {
  FIX: { label: "Fix", title: "Fix Services", subtitle: "Repairs and maintenance for everything that needs fixing at home.", categories: ["PLUMBING", "ELECTRICAL", "AC", "CARPENTRY", "APPLIANCES"] },
  CLEAN: { label: "Clean", title: "Cleaning Services", subtitle: "Deep cleaning for bathrooms, kitchens, full homes and more.", categories: ["CLEANING"] },
  CARE: { label: "Care", title: "Care Services", subtitle: "Recurring home care, safety checks and move-in readiness.", categories: ["CARE", "MOVE_IN"] },
};

const SYNONYMS = {
  tap: ["plumbing-tap-repair", "plumbing-jet-spray"],
  leak: ["plumbing-basin-leak", "plumbing-inspection", "ac-water-leak"],
  cooling: ["ac-power-jet", "ac-anti-rust", "ac-diagnosis"],
  cool: ["ac-power-jet", "ac-anti-rust", "ac-diagnosis"],
  ac: ["ac-power-jet", "ac-anti-rust", "ac-water-leak", "ac-diagnosis"],
  fan: ["electrical-fan-install"],
  switch: ["electrical-switch-repair"],
  washing: ["washing-machine-installation"],
  fridge: [],
  sofa: ["sofa-shampoo"],
  shelf: ["wall-shelf-installation"],
  curtain: ["curtain-rod-installation"],
  door: ["door-hinge-repair"],
  furniture: ["furniture-assembly"],
  geyser: ["geyser-installation"],
  purifier: ["water-purifier-installation"],
  tv: ["tv-wall-mount-installation"],
  move: ["move-in-magic-studio-1bhk", "move-in-magic-2bhk", "move-in-magic-3bhk", "move-in-magic-4bhk-villa"],
  plumbing: ["plumbing-tap-repair", "plumbing-jet-spray", "plumbing-basin-leak", "plumbing-inspection"],
  electrical: ["electrical-switch-repair", "electrical-light-fitting", "electrical-fan-install", "electrical-safety-inspection"],
  cleaning: ["bathroom-deep-clean", "kitchen-deep-clean", "full-home-deep-clean", "sofa-shampoo"],
  carpentry: ["door-hinge-repair", "curtain-rod-installation", "wall-shelf-installation", "furniture-assembly"],
  care: ["home-care-lite", "home-care-plus", "senior-home-safety-check", "quarterly-home-health-check"],
};

export default function Services() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const groupKey = params.get("group") || "";
  const group = GROUPS[groupKey] || null;
  const filter = params.get("category") || "ALL";

  const setFilter = (key) => {
    const next = new URLSearchParams(params);
    if (key === "ALL") next.delete("category");
    else next.set("category", key);
    setParams(next);
  };

  const filtered = useMemo(() => {
    let list = SERVICES;
    if (group) list = list.filter((s) => group.categories.includes(s.category));
    if (filter !== "ALL") list = list.filter((s) => s.category === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((s) => {
        if (s.name.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q)) return true;
        const syn = SYNONYMS[q];
        return syn ? syn.includes(s.slug) : false;
      });
    }
    return list;
  }, [filter, query, group]);

  const visibleFilters = group ? FILTERS.filter((f) => f.key === "ALL" || group.categories.includes(f.key)) : FILTERS;
  const pageTitle = group ? group.title : "Services";
  const pageSubtitle = group ? group.subtitle : "Browse our full catalogue of home services.";

  return (
    <div className="bg-revora-canvas min-h-screen">
      <Header />
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 rounded-lg hover:bg-revora-surface">
            <ChevronLeft className="w-5 h-5 text-revora-ink" />
          </button>
          <h1 className="text-2xl font-bold text-revora-ink">{pageTitle}</h1>
        </div>
        <p className="text-sm text-revora-muted mb-5 ml-8">{pageSubtitle}</p>

        <div className="flex items-center gap-2 bg-revora-surface border border-revora-border rounded-xl px-4 py-3 min-h-[48px] mb-5 max-w-lg">
          <Search className="w-4 h-4 text-revora-muted flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services (e.g. bathroom, plumbing, AC)"
            className="flex-1 outline-none text-sm bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X className="w-4 h-4 text-revora-muted" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
          {visibleFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium min-h-[40px] whitespace-nowrap transition-colors ${
                filter === f.key
                  ? "bg-revora-primary text-white"
                  : "bg-revora-surface border border-revora-border text-revora-ink hover:border-revora-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-revora-ink font-semibold text-lg">No services found</p>
            <p className="text-revora-muted text-sm mt-1">Try a different search term.</p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => setQuery("")}
                className="px-4 py-2 rounded-xl border border-revora-border text-sm font-medium min-h-[44px]"
              >
                Clear Search
              </button>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("ALL");
                }}
                className="px-4 py-2 rounded-xl bg-revora-primary text-white text-sm font-medium min-h-[44px]"
              >
                Browse All Services
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-16">
            {filtered.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
