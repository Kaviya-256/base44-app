import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const TEAM = [
  {
    id: "pro-5",
    name: "Arjun Kumar",
    role: "Lead Plumbing Specialist",
    image: "https://media.base44.com/images/public/6aba4ac16d028e35540e5738/abbdeadc7_generated_image.png",
  },
  {
    id: "pro-6",
    name: "Priya Nair",
    role: "Deep Cleaning Expert",
    image: "https://media.base44.com/images/public/6aba4ac16d028e35540e5738/e052b6144_generated_image.png",
  },
  {
    id: "pro-7",
    name: "Vikram Rao",
    role: "Home Care Specialist",
    image: "https://media.base44.com/images/public/6aba4ac16d028e35540e5738/a36fb1a97_generated_image.png",
  },
];

export default function Team() {
  return (
    <section className="bg-revora-canvas">
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-bold tracking-[0.2em] text-revora-gold uppercase mb-3">Our People</p>
          <h2 className="text-2xl md:text-3xl font-bold text-revora-ink">Meet the Team of Experts</h2>
          <p className="text-sm text-revora-muted mt-2 max-w-md mx-auto">
            Background-checked, trained, and uniformed — the professionals who make every THE REVORA visit dependable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {TEAM.map((m) => (
            <Link
              key={m.name}
              to={`/professionals/${m.id}`}
              className="group rounded-2xl overflow-hidden bg-revora-surface border border-revora-border shadow-[0_4px_20px_rgba(20,40,43,0.04)] block"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-revora-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <div className="text-base font-bold text-white">{m.name}</div>
                  <div className="text-xs text-revora-gold font-medium tracking-wide">{m.role}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
