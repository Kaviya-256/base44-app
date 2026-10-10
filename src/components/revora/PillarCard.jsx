import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function PillarCard({ name, description, image, to }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="group relative flex flex-col justify-end overflow-hidden rounded-[20px] min-h-[360px] md:min-h-[440px] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,40,43,0.12)]"
    >
      <Image
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-revora-ink/85 via-revora-ink/25 to-transparent" />
      <div className="relative z-10 p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{name}</h3>
        <p className="text-white/80 text-sm md:text-base mt-2 max-w-[260px]">{description}</p>
        <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-white group-hover:text-revora-gold transition-colors">
          Explore {name} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </button>
  );
}
