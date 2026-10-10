import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

const SUGGESTIONS = [
  "Fix",
  "Clean",
  "Care",
  "How it works",
  "Plumbing",
  "Electrical",
  "Bathroom cleaning",
  "Home cleaning",
  "Recurring home care",
  "What services do you offer?",
];

// Maps a user's query to a destination route
function resolveSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return "/services";
  if (q.includes("how it works")) return "/#how-it-works";
  if (q === "fix" || q.includes("repair")) return "/services?group=FIX";
  if (q === "clean" || q.includes("cleaning")) return "/services?group=CLEAN";
  if (q === "care" || q.includes("recurring") || q.includes("home care")) return "/care-plans";
  if (q.includes("plumb")) return "/services?group=FIX&category=PLUMBING";
  if (q.includes("electr")) return "/services?group=FIX&category=ELECTRICAL";
  if (q.includes("ac") || q.includes("air")) return "/services?group=FIX&category=AC";
  if (q.includes("carpent")) return "/services?group=FIX&category=CARPENTRY";
  if (q.includes("applian")) return "/services?group=FIX&category=APPLIANCES";
  return `/services?q=${encodeURIComponent(query.trim())}`;
}

export default function HeroSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  // Cycle suggestions every 2.2s with a fade+slide transition
  useEffect(() => {
    if (focused || query) return;

    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % SUGGESTIONS.length);
        setVisible(true);
      }, 280);
    }, 2200);

    return () => clearInterval(timerRef.current);
  }, [focused, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(resolveSearch(query));
  };

  const showAnimated = !focused && !query;

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 flex-1 min-h-[48px]">
        <Search className="w-4 h-4 text-revora-muted flex-shrink-0" />
        <div className="relative flex-1 h-[20px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Search for a service"
            className="absolute inset-0 w-full outline-none text-sm text-revora-ink bg-transparent placeholder:text-transparent"
            placeholder=" "
          />
          {showAnimated && (
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 flex items-center text-sm text-revora-muted transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              }`}
            >
              Search "{SUGGESTIONS[index]}"
            </span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="rounded-xl bg-revora-primary text-white font-semibold px-6 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors flex items-center justify-center gap-2"
      >
        Explore services <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
