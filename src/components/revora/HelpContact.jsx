import React from "react";
import { Instagram, Mail, Phone } from "lucide-react";

export default function HelpContact() {
  return (
    <section id="help" className="bg-revora-canvas py-16">
      <div className="mx-auto max-w-[1120px] px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.2em] text-revora-gold uppercase mb-3">We're Here to Help</p>
          <h2 className="text-2xl md:text-4xl font-bold text-revora-ink">Get in Touch with THE REVORA</h2>
          <p className="text-sm text-revora-muted mt-3 max-w-md mx-auto">
            Questions, feedback, or need a hand with a booking? Our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <ContactCard
            icon={Phone}
            label="Call Us"
            primary="+91 90000 00000"
            secondary="Mon–Sun, 8:00 AM – 8:00 PM"
            href="tel:+919000000000"
          />
          <ContactCard
            icon={Mail}
            label="Email Us"
            primary="connect@therevora.in"
            secondary="We typically respond within 24 hours"
            href="mailto:connect@therevora.in"
          />
          <ContactCard
            icon={Instagram}
            label="Follow Us"
            primary="@therevoraapp"
            secondary="Tips, updates & behind-the-scenes"
            href="https://instagram.com/therevoraapp"
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, label, primary, secondary, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block rounded-2xl bg-revora-surface border border-revora-border shadow-[0_4px_20px_rgba(20,40,43,0.04)] p-8 text-center hover:border-revora-primary/40 transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-revora-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-revora-primary/15 transition-colors">
        <Icon className="w-5 h-5 text-revora-primary" />
      </div>
      <div className="text-xs font-bold tracking-[0.2em] text-revora-muted uppercase mb-2">{label}</div>
      <div className="text-base font-bold text-revora-ink">{primary}</div>
      <div className="text-xs text-revora-muted mt-1.5">{secondary}</div>
    </a>
  );
}
