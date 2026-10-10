import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Wallet, HeadphonesIcon, ArrowRight } from "lucide-react";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import CategoryCard from "@/components/revora/CategoryCard";
import ServiceCard from "@/components/revora/ServiceCard";
import PillarCard from "@/components/revora/PillarCard";
import HeroSearch from "@/components/revora/HeroSearch";
import HowItWorks from "@/components/revora/HowItWorks";
import Testimonials from "@/components/revora/Testimonials";
import Team from "@/components/revora/Team";
import WhyRevora from "@/components/revora/WhyRevora";
import HelpContact from "@/components/revora/HelpContact";
import FindRightService from "@/components/revora/FindRightService";
import { Image } from "@/components/ui/image";
import { CATEGORIES, SERVICES, IMAGES } from "@/lib/revoraData";

const PILLAR_CARDS = [
  {
    name: "FIX",
    description: "Repairs that keep your home running.",
    image: "https://media.base44.com/images/public/6aba4ac16d028e35540e5738/0dc47e7a7_generated_image.png",
    to: "/services?group=FIX",
  },
  {
    name: "CLEAN",
    description: "A cleaner home, made effortless.",
    image: "https://media.base44.com/images/public/6aba4ac16d028e35540e5738/8326e7984_generated_image.png",
    to: "/services?group=CLEAN",
  },
  {
    name: "CARE",
    description: "Keep your home cared for, all year round.",
    image: "https://media.base44.com/images/public/6aba4ac16d028e35540e5738/a359645a7_generated_image.png",
    to: "/care-plans",
  },
  {
    name: "ABOUT US",
    description: "Why we're building THE REVORA, and what we stand for.",
    image: "https://media.base44.com/images/public/6aba4ac16d028e35540e5738/b6d4f0588_image.png",
    to: "/about",
  },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, title: "Verified professionals", desc: "Background-checked & trained" },
  { icon: Wallet, title: "Transparent pricing", desc: "No hidden charges" },
  { icon: HeadphonesIcon, title: "THE REVORA support", desc: "Here whenever you need us" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-revora-canvas">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[480px] md:min-h-[560px] flex items-center">
          <Image src={IMAGES.heroHome} alt="Warm sunlit home interior" className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-revora-ink/85 via-revora-ink/55 to-transparent" />
          <div className="relative z-10 mx-auto max-w-[1360px] px-4 md:px-8 py-16 w-full">
            <div className="max-w-[580px]">
              <p className="text-revora-gold text-xs md:text-sm font-semibold tracking-[0.2em] mb-3">THE REVORA</p>
              <h1 className="text-[32px] md:text-[56px] leading-[1.05] font-bold text-white tracking-tight">
                Fix. Clean. Care.
              </h1>
              <p className="text-white/85 text-base md:text-lg mt-4 max-w-md">
                Trusted home services for a cleaner, safer, happier home — booked in minutes, delivered with care.
              </p>
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Trust row */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 -mt-8 md:-mt-10 relative z-10">
        <div className="bg-revora-surface rounded-2xl border border-revora-border shadow-[0_6px_24px_rgba(20,40,43,0.06)] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-revora-border">
          {TRUST_POINTS.map((t) => (
            <div key={t.title} className="flex items-center gap-3 p-5">
              <div className="w-10 h-10 rounded-full bg-revora-primary/10 flex items-center justify-center flex-shrink-0">
                <t.icon className="w-5 h-5 text-revora-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm text-revora-ink">{t.title}</div>
                <div className="text-xs text-revora-muted">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FIX / CLEAN / CARE pillars */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {PILLAR_CARDS.map((p) => (
            <PillarCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Categories grouped by Fix · Clean · Care */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-revora-ink">Our Services</h2>
            <p className="text-sm text-revora-muted mt-1">Everything your home needs — grouped under Fix, Clean & Care.</p>
          </div>
          <Link to="/services" className="text-sm font-semibold text-revora-primary hidden md:block">
            View all →
          </Link>
        </div>
        {[
          { label: "Fix", keys: ["PLUMBING", "ELECTRICAL", "AC", "CARPENTRY", "APPLIANCES"] },
          { label: "Clean", keys: ["CLEANING"] },
          { label: "Care", keys: ["CARE", "MOVE_IN"] },
        ].map((group) => (
          <div key={group.label} className="mb-8 last:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-[0.2em] text-revora-gold uppercase">{group.label}</span>
              <div className="flex-1 h-px bg-revora-border" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {CATEGORIES.filter((c) => group.keys.includes(c.key)).map((c) => (
                <CategoryCard key={c.key} category={c} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <WhyRevora />

      {/* Popular services */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 py-4 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-revora-ink">Popular Services</h2>
            <p className="text-sm text-revora-muted mt-1">Demo catalogue — replaceable sample services.</p>
          </div>
          <Link to="/services" className="text-sm font-semibold text-revora-primary hidden md:block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {SERVICES.slice(0, 8).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <FindRightService />

      {/* Care plan banner */}
      <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-16">
        <div className="relative rounded-[24px] overflow-hidden min-h-[280px] flex items-center">
          <Image src={IMAGES.carePlansBanner} alt="Care plans" className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-revora-ink/80 to-revora-ink/20" />
          <div className="relative z-10 p-8 md:p-12 max-w-md">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Care plans for a consistently cared-for home</h3>
            <p className="text-white/80 mt-3 text-sm md:text-base">
              Recurring bathroom care on a schedule you can see — not every service is included, and you're always in
              control.
            </p>
            <Link
              to="/care-plans"
              className="inline-flex items-center gap-2 mt-6 rounded-xl bg-white text-revora-ink font-semibold px-6 py-3 min-h-[48px] hover:bg-revora-gold hover:text-white transition-colors"
            >
              Explore Care Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <Team />

      <HelpContact />

      <Footer />
    </div>
  );
}
