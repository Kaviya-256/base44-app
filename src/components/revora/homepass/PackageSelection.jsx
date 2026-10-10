import React from "react";
import { Check } from "lucide-react";
import { formatINR } from "@/lib/revoraData";

const PACKAGES = [
  {
    id: "essential",
    name: "Essential",
    price: 999,
    maxArea: 900,
    maxBathrooms: 1,
    maxAppliances: 4,
    features: ["Up to 900 sq.ft.", "1 bathroom", "4 appliances"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 1399,
    maxArea: 1500,
    maxBathrooms: 2,
    maxAppliances: 8,
    features: ["Up to 1,500 sq.ft.", "2 bathrooms", "8 appliances"],
  },
  {
    id: "plus",
    name: "Plus",
    price: 1899,
    maxArea: 2200,
    maxBathrooms: 3,
    maxAppliances: 12,
    features: ["Up to 2,200 sq.ft.", "3 bathrooms", "12 appliances"],
  },
];

const DISCLAIMER =
  "Repairs and specialist tests cost extra. This visit does not certify home safety or predict when an appliance will fail.";

export default function PackageSelection({ selectedPackage, onSelect }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-revora-ink">Home Passport</h2>
      <p className="text-sm text-revora-muted mt-2 max-w-lg">
        Know what is in your home. Keep its service history in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-6">
        {PACKAGES.map((pkg) => {
          const isSelected = selectedPackage?.id === pkg.id;
          return (
            <div
              key={pkg.id}
              className={`rounded-2xl border-2 p-5 flex flex-col transition-colors ${
                isSelected ? "border-revora-primary bg-revora-primary/[0.03]" : "border-revora-border bg-revora-surface"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-revora-ink text-lg">{pkg.name}</h3>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-revora-primary text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-revora-primary mt-2">{formatINR(pkg.price)}</div>

              <ul className="mt-4 space-y-2 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-revora-muted">
                    <Check className="w-4 h-4 text-revora-cleanink flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelect(pkg)}
                className={`mt-5 w-full rounded-xl font-semibold py-3 min-h-[48px] transition-colors ${
                  isSelected
                    ? "bg-revora-primary text-white"
                    : "bg-revora-ink text-white hover:bg-revora-ink/90"
                }`}
              >
                {isSelected ? "Selected" : `Choose ${pkg.name}`}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-revora-border bg-revora-caresurface/40 p-4">
        <p className="text-xs text-revora-careink leading-relaxed">{DISCLAIMER}</p>
      </div>
    </div>
  );
}

export { PACKAGES, DISCLAIMER };
