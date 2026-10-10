import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function CategoryCard({ category, compact = false }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/services?category=${category.key}`)}
      className={`group relative overflow-hidden rounded-2xl border border-revora-border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(20,40,43,0.08)] ${
        compact ? "flex items-center gap-4 p-4 bg-revora-surface" : `${category.surface}`
      }`}
    >
      {compact ? (
        <>
          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={category.image} alt={category.name} className="w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`font-semibold ${category.ink}`}>{category.name}</div>
            <div className="text-xs text-revora-muted truncate">{category.summary}</div>
          </div>
          <ArrowRight className="w-4 h-4 text-revora-muted group-hover:translate-x-0.5 transition-transform" />
        </>
      ) : (
        <>
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              className="w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <div className="p-5">
            <div className={`text-xl font-bold ${category.ink}`}>{category.name}</div>
            <p className="text-sm text-revora-ink/70 mt-1">{category.summary}</p>
            <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-revora-ink">
              Explore
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </>
      )}
    </button>
  );
}
