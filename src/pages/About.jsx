import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, SlidersHorizontal, HeartHandshake, Sparkles } from "lucide-react";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import { Image } from "@/components/ui/image";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust",
    desc: "Earned through honest information, clear expectations and accountability.",
  },
  {
    icon: SlidersHorizontal,
    title: "Choice",
    desc: "Helping customers make informed decisions about who cares for their home.",
  },
  {
    icon: HeartHandshake,
    title: "Respect",
    desc: "Valuing the time, dignity and contribution of customers and service professionals alike.",
  },
  {
    icon: Sparkles,
    title: "Care",
    desc: "Taking the details seriously, because every home and every service experience matters.",
  },
];

export default function About() {
  return (
    <div className="bg-revora-canvas">
      <Header />

      {/* Hero / Story */}
      <section className="relative overflow-hidden bg-revora-ink">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://media.base44.com/images/public/6aba4ac16d028e35540e5738/b6d4f0588_image.png"
            alt="THE REVORA team"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-revora-ink/70 via-revora-ink/85 to-revora-ink" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-8 py-16 md:py-24">
          <p className="text-revora-gold text-xs md:text-sm font-semibold tracking-[0.2em] mb-4">ABOUT THE REVORA</p>
          <h1 className="text-[32px] md:text-[56px] leading-[1.1] font-bold text-white tracking-tight max-w-[760px]">
            Care for your home. Respect for every person behind it.
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-6 max-w-[600px] leading-relaxed">
            Your home is personal. The people who care for it should feel like the right choice.
          </p>
          <p className="text-revora-gold font-semibold mt-6 text-sm md:text-base tracking-wide">Fix. Clean. Care.</p>
        </div>
      </section>

      {/* Why we are building */}
      <section className="mx-auto max-w-[1120px] px-5 md:px-8 py-14 md:py-20">
        <h2 className="text-2xl md:text-[32px] font-bold text-revora-ink mb-6">Why we are building THE REVORA</h2>
        <div className="space-y-5 max-w-[720px] text-[15px] md:text-base leading-[1.7] text-revora-ink/85">
          <p>
            THE REVORA is being built around a simple belief: finding help for your home should feel clear, considered
            and reassuring. From everyday repairs and maintenance to cleaning, our purpose is to make it easier to find
            the right professional and build a service relationship you can return to with confidence.
          </p>
          <p>
            We believe good service begins with respect for your home, your time and the skill of the person doing the
            work. That belief shapes the experience we are creating: clear information, thoughtful choices and care in
            the details.
          </p>
        </div>
        <div className="border-l-4 border-revora-primary pl-5 mt-8">
          <p className="font-bold text-revora-ink text-lg md:text-xl leading-snug">
            Built in Hyderabad.
            <br />
            Built with care.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto max-w-[1120px] px-5 md:px-8 pb-6">
        <h2 className="text-2xl md:text-[32px] font-bold text-revora-ink mb-4">The future we want to build</h2>
        <p className="max-w-[720px] text-[15px] md:text-base leading-[1.7] text-revora-ink/85">
          To become a trusted part of everyday home care, while creating meaningful opportunities for skilled service
          professionals.
        </p>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1120px] px-5 md:px-8 py-10 md:py-14">
        <h2 className="text-2xl md:text-[32px] font-bold text-revora-ink mb-8">What we stand for</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-revora-surface border border-revora-border rounded-2xl p-6 md:p-8">
              <v.icon className="w-6 h-6 text-revora-primary mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-revora-ink mb-2">{v.title}</h3>
              <p className="text-sm md:text-[15px] text-revora-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing actions */}
      <section className="mx-auto max-w-[1120px] px-5 md:px-8 pb-16 md:pb-24">
        <div className="bg-revora-ink rounded-[24px] p-8 md:p-12">
          <h2 className="text-2xl md:text-[32px] font-bold text-white mb-6 md:mb-8">Get to know THE REVORA.</h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl bg-white text-revora-ink font-semibold px-6 py-3 min-h-[48px] hover:bg-revora-gold hover:text-white transition-colors"
            >
              Explore Services
            </Link>
            <Link
              to="/#help"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 text-white font-semibold px-6 py-3 min-h-[48px] hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
