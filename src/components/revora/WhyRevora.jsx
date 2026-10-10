import React from "react";
import { Link } from "react-router-dom";

export default function WhyRevora() {
  return (
    <section id="why-revora" className="bg-revora-canvas py-12 md:py-16">
      <div className="mx-auto max-w-[1120px] px-4 md:px-8">
        <div className="rounded-[20px] bg-revora-ink px-6 py-10 md:px-16 md:py-16">
          <p className="text-xs font-bold tracking-[0.2em] text-revora-gold uppercase mb-6">Why THE REVORA?</p>
          <h2 className="text-[28px] md:text-[44px] leading-[1.15] font-bold text-white">
            Your home.
            <br />
            Your choice.
            <br />
            Our commitment to care.
          </h2>
          <p className="text-white/80 text-base mt-6 max-w-2xl leading-[1.6]">
            Your home deserves care you can feel confident about. THE REVORA brings together verified
            professionals, clear service pricing and the freedom to choose who you welcome into your home.
            Explore their experience and customer reviews, save the professionals you trust, and book them
            again when they are available. With your approval required for additional work or parts, you stay
            informed and in control. Thoughtful service. Familiar faces. Care that earns your trust.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center justify-center mt-8 rounded-xl bg-revora-canvas text-revora-ink font-semibold px-6 py-3 min-h-[44px] hover:bg-white transition-colors"
          >
            Explore Services
          </Link>
          <p className="text-xs font-bold tracking-[0.2em] text-revora-gold uppercase mt-8">
            Choice / Clarity / Continuity
          </p>
        </div>
      </div>
    </section>
  );
}
