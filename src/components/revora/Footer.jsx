import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Why THE REVORA", to: "/#why-revora" },
      { label: "Help", to: "/#help" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Services", to: "/services" },
      { label: "Care Plans", to: "/care-plans" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Terms & Conditions", to: "/terms", newTab: true },
      { label: "Cancellation Policy", to: "/cancellation-policy", newTab: true },
      { label: "Privacy Policy", to: "/privacy-policy", newTab: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-revora-ink text-white/80">
      <div className="mx-auto max-w-[1360px] px-4 md:px-8 py-10 md:py-14 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
        <div className="col-span-2">
          <div className="text-xl font-bold text-white">THE REVORA</div>
          <p className="text-sm text-revora-gold mt-1 tracking-widest">FIX · CLEAN · CARE</p>
          <p className="text-sm text-white/60 mt-4 max-w-xs">
            Luxury home care, made effortless. A prototype experience — services and pricing shown are demo data.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://instagram.com/therevoraapp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="mailto:connect@therevora.in" aria-label="Email" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
            <span aria-label="Phone" className="p-2 rounded-full bg-white/10">
              <Phone className="w-4 h-4" />
            </span>
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="text-sm font-semibold text-white mb-3">{col.title}</div>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    target={l.newTab ? "_blank" : undefined}
                    rel={l.newTab ? "noopener noreferrer" : undefined}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2026 THE REVORA. Prototype experience — demo data only.
      </div>
    </footer>
  );
}
