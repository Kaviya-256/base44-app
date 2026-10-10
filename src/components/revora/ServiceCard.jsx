import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatINR } from "@/lib/revoraData";

export default function ServiceCard({ service }) {
  const navigate = useNavigate();
  const fromPrice = Math.min(...service.packages.map((p) => p.price));

  return (
    <button
      onClick={() => navigate(`/services/${service.slug}`)}
      className="group text-left rounded-2xl border border-revora-border bg-revora-surface overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(20,40,43,0.08)]"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          className="w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-revora-ink min-w-0">{service.name}</h3>
          <ArrowRight className="w-4 h-4 text-revora-muted flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
        </div>
        <p className="text-sm text-revora-muted mt-1 line-clamp-2">{service.shortDesc}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-revora-primary">From {formatINR(fromPrice)}</span>
          <span className="text-xs text-revora-muted">Demo price</span>
        </div>
      </div>
    </button>
  );
}
