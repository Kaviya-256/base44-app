import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Clock, MapPin, Check, X } from "lucide-react";
import Header from "@/components/revora/Header";
import { Image } from "@/components/ui/image";
import { getServiceBySlug, formatINR } from "@/lib/revoraData";
import { useRevora } from "@/lib/revoraStore";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { startDraft } = useRevora();
  const service = getServiceBySlug(slug);

  const [packageId, setPackageId] = useState(service?.packages[0]?.id);
  const [addonIds, setAddonIds] = useState([]);

  if (!service) {
    return (
      <div className="min-h-screen bg-revora-canvas">
        <Header />
        <div className="text-center py-24">
          <p className="text-revora-ink font-semibold">Service not found.</p>
          <button onClick={() => navigate("/services")} className="mt-4 text-revora-primary font-semibold">
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const selectedPackage = service.packages.find((p) => p.id === packageId);
  const toggleAddon = (id) =>
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  const addonsTotal = service.addons
    .filter((a) => addonIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const total = (selectedPackage?.price || 0) + addonsTotal;

  const handleContinue = () => {
    startDraft({
      serviceId: service.id,
      packageId,
      addonIds,
      quantity: 1,
    });
    navigate("/booking/address");
  };

  return (
    <div className="bg-revora-canvas min-h-screen pb-28">
      <Header />

      <div className="mx-auto max-w-[1000px] px-4 md:px-8 pt-6">
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-1.5 text-sm text-revora-muted mb-4"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Services
        </button>

        <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6">
          <Image src={service.image} alt={service.name} className="w-full h-full" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-revora-ink">{service.name}</h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-revora-muted flex-wrap">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-revora-gold text-revora-gold" /> {service.ratingAvg} ({service.ratingCount})
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> ~{service.durationMins} mins
          </span>
          <span className="flex items-center gap-1 text-revora-success">
            <MapPin className="w-4 h-4" /> Available in your area
          </span>
        </div>
        <p className="text-revora-ink/80 mt-4 max-w-2xl">{service.longDesc}</p>

        {/* Package selection */}
        <div className="mt-10">
          <h2 className="font-semibold text-revora-ink mb-1">Choose your package</h2>
          <p className="text-xs text-revora-muted mb-4">Demo pricing shown for this prototype.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {service.packages.map((p) => (
              <button
                key={p.id}
                onClick={() => setPackageId(p.id)}
                className={`text-left rounded-xl border-2 p-4 transition-colors ${
                  packageId === p.id ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-revora-ink">{p.name}</span>
                  {packageId === p.id && <Check className="w-4 h-4 text-revora-primary" />}
                </div>
                <p className="text-xs text-revora-muted mt-1">{p.desc}</p>
                <div className="mt-3 font-bold text-revora-primary">{formatINR(p.price)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Inclusions / exclusions */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-revora-ink mb-3">Inclusions</h3>
            <ul className="space-y-2">
              {service.inclusions.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-revora-ink/80">
                  <Check className="w-4 h-4 text-revora-success flex-shrink-0 mt-0.5" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-revora-ink mb-3">Exclusions</h3>
            <ul className="space-y-2">
              {service.exclusions.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-revora-ink/80">
                  <X className="w-4 h-4 text-revora-danger flex-shrink-0 mt-0.5" /> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-revora-ink mb-3">Parts & Materials</h3>
            <p className="text-sm text-revora-ink/80">{service.partsAndMaterials}</p>
          </div>
          <div>
            <h3 className="font-semibold text-revora-ink mb-3">Preparation instructions</h3>
            <ul className="space-y-1.5">
              {service.prep.map((i) => (
                <li key={i} className="text-sm text-revora-ink/80">
                  • {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {service.importantNotes && (
          <div className="mt-10 rounded-xl bg-revora-caresurface px-4 py-4">
            <h3 className="font-semibold text-revora-careink mb-1">Important Notes</h3>
            <p className="text-sm text-revora-careink/90">{service.importantNotes}</p>
          </div>
        )}

        {/* Add-ons */}
        {service.addons.length > 0 && (
          <div className="mt-10">
            <h3 className="font-semibold text-revora-ink mb-3">Add-ons</h3>
            <div className="space-y-2">
              {service.addons.map((a) => (
                <label
                  key={a.id}
                  className="flex items-center justify-between border border-revora-border rounded-xl px-4 py-3 cursor-pointer"
                >
                  <span className="flex items-center gap-3 text-sm text-revora-ink">
                    <input
                      type="checkbox"
                      checked={addonIds.includes(a.id)}
                      onChange={() => toggleAddon(a.id)}
                      className="w-4 h-4 accent-revora-primary"
                    />
                    {a.name}
                  </span>
                  <span className="text-sm font-semibold text-revora-ink">{formatINR(a.price)}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-revora-muted mt-2">Add-ons never apply automatically — you choose them here.</p>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-revora-surface border-t border-revora-border">
        <div className="mx-auto max-w-[1000px] px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-revora-muted truncate">{selectedPackage?.name}</div>
            <div className="text-lg font-bold text-revora-ink">{formatINR(total)}</div>
          </div>
          <button
            onClick={handleContinue}
            className="rounded-xl bg-revora-primary text-white font-semibold px-6 md:px-8 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors flex-shrink-0"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
