import React from "react";
import { ListChecks, CalendarClock, UserCheck, Sparkles } from "lucide-react";

const STEPS = [
  {
    n: "1",
    icon: ListChecks,
    title: "Choose a Service",
    body: "Browse cleaning, repair or care-plan options and describe what you need.",
  },
  {
    n: "2",
    icon: CalendarClock,
    title: "Select Date & Time",
    body: "Pick a slot that works for you — see the scope and price before you pay.",
  },
  {
    n: "3",
    icon: UserCheck,
    title: "Get a Service Professional",
    body: "A verified professional is matched or chosen by you, and confirmed for the visit.",
  },
  {
    n: "4",
    icon: Sparkles,
    title: "Enjoy Your Clean & Fixed Home",
    body: "Sit back as the work is completed to THE REVORA standards, with support on call.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-revora-ink">
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-bold tracking-[0.2em] text-revora-gold uppercase mb-3">How It Works</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Booking Made Effortless</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-bold text-revora-gold">{s.n}</span>
                <s.icon className="w-5 h-5 text-revora-gold" />
              </div>
              <h3 className="text-sm font-semibold text-revora-gold mb-2">{s.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
