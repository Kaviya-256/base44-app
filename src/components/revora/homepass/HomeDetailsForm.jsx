import React, { useState, useMemo } from "react";
import { Home, MapPin, AlertTriangle, ArrowRight, FileText } from "lucide-react";
import { PACKAGES } from "./PackageSelection";

const EXTRA_APPLIANCE_PRICE = 99;
const MAX_EXTRA_APPLIANCES = 4;

const TIME_SLOTS = [
  "9:00 AM – 11:00 AM",
  "11:30 AM – 1:30 PM",
  "2:00 PM – 4:00 PM",
  "4:30 PM – 6:30 PM",
];

export default function HomeDetailsForm({ selectedPackage, onProceed, onQuoteRequest, onUpgradePackage }) {
  const [form, setForm] = useState({
    pincode: "",
    address: "",
    area: "",
    bathrooms: "",
    levels: "single",
    appliances: "",
    accessNotes: "",
  });
  const [error, setError] = useState("");

  const areaNum = parseInt(form.area, 10) || 0;
  const bathNum = parseInt(form.bathrooms, 10) || 0;
  const applianceNum = parseInt(form.appliances, 10) || 0;

  const extraAppliances = useMemo(() => {
    if (applianceNum <= selectedPackage.maxAppliances) return 0;
    return Math.min(applianceNum - selectedPackage.maxAppliances, MAX_EXTRA_APPLIANCES);
  }, [applianceNum, selectedPackage.maxAppliances]);

  // Scope exceeds standard caps → requires a written quote
  const requiresQuote = useMemo(() => {
    return (
      areaNum > 2200 ||
      bathNum > 3 ||
      form.levels === "multi" ||
      form.accessNotes.trim().length > 0
    );
  }, [areaNum, bathNum, form.levels, form.accessNotes]);

  // Inputs exceed the selected package's caps but are within Plus limits → recommend upgrade
  const upgradeTarget = useMemo(() => {
    if (requiresQuote) return null;
    const exceedsCaps =
      areaNum > selectedPackage.maxArea ||
      bathNum > selectedPackage.maxBathrooms;
    if (!exceedsCaps) return null;
    return (
      PACKAGES.find((pkg) => pkg.maxArea >= areaNum && pkg.maxBathrooms >= bathNum) || null
    );
  }, [areaNum, bathNum, selectedPackage, requiresQuote]);

  const needsUpgrade = !!upgradeTarget && upgradeTarget.id !== selectedPackage.id;

  const addonCost = extraAppliances * EXTRA_APPLIANCE_PRICE;
  const total = selectedPackage.price + addonCost;

  const handleSubmit = () => {
    if (!form.pincode || !form.address || !form.area || !form.bathrooms || !form.appliances) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");

    const details = {
      ...form,
      areaNum,
      bathNum,
      applianceNum,
      extraAppliances,
      addonCost,
      total,
      requiresQuote,
    };

    if (requiresQuote) {
      onQuoteRequest(details);
    } else {
      onProceed(details);
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-revora-ink">Your home details</h2>
      <p className="text-sm text-revora-muted mt-1">
        Selected package: <span className="font-semibold text-revora-ink">{selectedPackage.name}</span> — up to{" "}
        {selectedPackage.maxArea} sq.ft., {selectedPackage.maxBathrooms} bathroom(s), {selectedPackage.maxAppliances} appliances.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Pincode">
            <input
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              placeholder="e.g. 500034"
              className="input-base"
            />
          </Field>
          <Field label="Address / Locality">
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="House no, street, area"
              className="input-base"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Floor area (sq.ft.)">
            <input
              type="number"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              placeholder="e.g. 1200"
              className="input-base"
            />
          </Field>
          <Field label="Bathroom count">
            <input
              type="number"
              value={form.bathrooms}
              onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
              placeholder="e.g. 2"
              className="input-base"
            />
          </Field>
          <Field label="Appliance count">
            <input
              type="number"
              value={form.appliances}
              onChange={(e) => setForm({ ...form, appliances: e.target.value })}
              placeholder="e.g. 6"
              className="input-base"
            />
          </Field>
        </div>

        <Field label="Levels">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, levels: "single" })}
              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${
                form.levels === "single" ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"
              }`}
            >
              Single level
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, levels: "multi" })}
              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${
                form.levels === "multi" ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"
              }`}
            >
              Multi-level
            </button>
          </div>
        </Field>

        <Field label="Access notes (optional)">
          <textarea
            value={form.accessNotes}
            onChange={(e) => setForm({ ...form, accessNotes: e.target.value })}
            placeholder="Any unusual access constraints, narrow stairways, etc."
            rows={2}
            className="input-base resize-none"
          />
        </Field>
      </div>

      {/* Dynamic add-on display */}
      {extraAppliances > 0 && !requiresQuote && (
        <div className="mt-5 rounded-xl border border-revora-border bg-revora-cleansurface/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-revora-ink">
                Extra appliance add-on × {extraAppliances}
              </p>
              <p className="text-xs text-revora-muted mt-0.5">
                Your home has {applianceNum} appliances; the {selectedPackage.name} package covers{" "}
                {selectedPackage.maxAppliances}. {extraAppliances} extra at ₹{EXTRA_APPLIANCE_PRICE} each.
              </p>
            </div>
            <span className="font-bold text-revora-cleanink">₹{addonCost}</span>
          </div>
        </div>
      )}

      {/* Quote-required notice */}
      {requiresQuote && (
        <div className="mt-5 rounded-xl border border-revora-careink/30 bg-revora-caresurface/50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-revora-careink flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-revora-ink text-sm">A written quote is needed for your home</p>
              <p className="text-xs text-revora-muted mt-1 leading-relaxed">
                Your home's scope exceeds the standard caps of our packages
                {areaNum > 2200 ? " (area over 2,200 sq.ft.)" : ""}
                {bathNum > 3 ? " (more than 3 bathrooms)" : ""}
                {form.levels === "multi" ? " (multi-level)" : ""}
                {form.accessNotes.trim() ? " (unusual access)" : ""}. We'll prepare a custom written quote
                instead of an instant price.
              </p>
            </div>
          </div>
          <button
            onClick={() => onQuoteRequest({
              ...form, areaNum, bathNum, applianceNum, extraAppliances, addonCost, total, requiresQuote,
            })}
            className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-revora-careink text-white font-semibold px-6 py-3 min-h-[48px] hover:opacity-90 transition-opacity"
          >
            <FileText className="w-4 h-4" /> Request a written quote
          </button>
        </div>
      )}

      {/* Package upgrade prompt */}
      {needsUpgrade && upgradeTarget && (
        <div className="mt-5 rounded-xl border border-revora-fixink/30 bg-revora-fixsurface/50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-revora-fixink flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-revora-ink text-sm">
                Your home needs the {upgradeTarget.name} package
              </p>
              <p className="text-xs text-revora-muted mt-1 leading-relaxed">
                {areaNum > selectedPackage.maxArea && (
                  <>Your floor area ({areaNum} sq.ft.) exceeds the {selectedPackage.name} cap of {selectedPackage.maxArea} sq.ft. </>
                )}
                {bathNum > selectedPackage.maxBathrooms && (
                  <>Your bathroom count ({bathNum}) exceeds the {selectedPackage.name} cap of {selectedPackage.maxBathrooms}. </>
                )}
                The {upgradeTarget.name} package covers up to {upgradeTarget.maxArea} sq.ft. and {upgradeTarget.maxBathrooms} bathroom(s).
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm text-revora-muted">
                  {upgradeTarget.name}: <span className="font-bold text-revora-ink">₹{upgradeTarget.price}</span>
                </span>
                {upgradeTarget.price > selectedPackage.price && (
                  <span className="text-xs text-revora-muted">
                    (+₹{upgradeTarget.price - selectedPackage.price})
                  </span>
                )}
              </div>
              <button
                onClick={() => onUpgradePackage(upgradeTarget)}
                className="mt-3 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-revora-fixink text-white font-semibold px-6 py-3 min-h-[48px] hover:opacity-90 transition-opacity"
              >
                Upgrade to {upgradeTarget.name} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-revora-danger mt-4">{error}</p>}

      {!requiresQuote && !needsUpgrade && (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm">
            <span className="text-revora-muted">Estimated total: </span>
            <span className="font-bold text-revora-ink text-lg">₹{total}</span>
          </div>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-revora-primary text-white font-semibold px-6 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
          >
            Proceed to summary <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <style>{`
        .input-base {
          width: 100%;
          border: 1px solid hsl(var(--border, 220 13% 91%));
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          min-height: 48px;
          font-size: 0.875rem;
          outline: none;
        }
        .input-base:focus {
          border-color: #00656D;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-revora-ink mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export { TIME_SLOTS };
