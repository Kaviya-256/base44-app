import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import Header from "@/components/revora/Header";
import Footer from "@/components/revora/Footer";
import PassportStepper from "@/components/revora/homepass/PassportStepper";
import PackageSelection from "@/components/revora/homepass/PackageSelection";
import HomeDetailsForm from "@/components/revora/homepass/HomeDetailsForm";
import PassportSummary from "@/components/revora/homepass/PassportSummary";
import { IMAGES } from "@/lib/revoraData";

const FEATURES = ["Appliance records", "Visit report", "Maintenance reminders"];

export default function HomePassport() {
  const navigate = useNavigate();
  const [step, setStep] = useState("entry"); // entry → package → details → summary → quote-requested → confirmed
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [homeDetails, setHomeDetails] = useState(null);
  const [booking, setBooking] = useState(null);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setStep("details");
  };

  const handleProceed = (details) => {
    setHomeDetails(details);
    setStep("summary");
  };

  const handleQuoteRequest = (details) => {
    setHomeDetails(details);
    setStep("quote-requested");
  };

  const handleConfirm = ({ selectedSlot }) => {
    const id = `RVR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBooking({
      id,
      package: selectedPackage.name,
      total: homeDetails.total || selectedPackage.price,
      slot: selectedSlot,
    });
    setStep("confirmed");
  };

  // ── Step 1: Entry card ──
  if (step === "entry") {
    return (
      <div className="bg-revora-canvas min-h-screen">
        <Header />
        <div className="mx-auto max-w-[1360px] px-4 md:px-8 py-10 md:py-16">
          <button
            onClick={() => navigate("/care-plans")}
            className="flex items-center gap-1.5 text-sm text-revora-muted hover:text-revora-ink mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Care Plans
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-revora-gold uppercase mb-3">Care</p>
              <h1 className="text-3xl md:text-4xl font-bold text-revora-ink leading-tight">Home Passport</h1>
              <p className="text-revora-muted mt-3 text-base md:text-lg">Your home's care record</p>

              <ul className="mt-5 space-y-2.5">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-revora-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-revora-gold" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-2xl font-bold text-revora-primary">From ₹999</span>
                <button
                  onClick={() => setStep("package")}
                  className="inline-flex items-center gap-2 rounded-xl bg-revora-primary text-white font-semibold px-6 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
                >
                  View packages <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="aspect-[4/3] rounded-[24px] overflow-hidden">
              <Image src={IMAGES.homeCareCategory} alt="Home Passport" className="w-full h-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Quote requested ──
  if (step === "quote-requested") {
    return (
      <div className="bg-revora-canvas min-h-screen flex flex-col">
        <div className="border-b border-revora-border bg-revora-surface">
          <div className="mx-auto max-w-[900px] px-4 md:px-8 py-4">
            <button onClick={() => setStep("details")} className="flex items-center gap-1 text-sm text-revora-muted hover:text-revora-ink">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <div className="mt-3">
              <PassportStepper current="details" />
            </div>
          </div>
        </div>
        <div className="flex-1 mx-auto w-full max-w-[700px] px-4 md:px-8 py-10">
          <div className="w-full bg-revora-surface rounded-2xl border border-revora-border p-6 md:p-8 text-center revora-fade-up">
            <div className="w-14 h-14 rounded-full bg-revora-caresurface flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-revora-careink" />
            </div>
            <h2 className="text-xl font-bold text-revora-ink">Quote request received</h2>
            <p className="text-sm text-revora-muted mt-3 max-w-md mx-auto leading-relaxed">
              Your home's scope needs a custom assessment. Our team will review your details and prepare a written
              quote within 24 hours. You'll receive it via SMS and email.
            </p>

            <div className="mt-6 rounded-xl border border-revora-border bg-revora-canvas p-4 text-left text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-revora-muted">Package selected</span>
                <span className="font-medium text-revora-ink">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-revora-muted">Home area</span>
                <span className="font-medium text-revora-ink">{homeDetails.areaNum} sq.ft.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-revora-muted">Bathrooms</span>
                <span className="font-medium text-revora-ink">{homeDetails.bathNum}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-revora-muted">Levels</span>
                <span className="font-medium text-revora-ink">
                  {homeDetails.levels === "multi" ? "Multi-level" : "Single"}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/services?group=CARE")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-revora-primary text-white font-semibold px-6 py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
            >
              Back to services
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Confirmed ──
  if (step === "confirmed") {
    return (
      <div className="bg-revora-canvas min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md bg-revora-surface rounded-2xl border border-revora-border p-6 md:p-8 text-center revora-fade-up">
            <div className="w-14 h-14 rounded-full bg-revora-cleansurface flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-revora-cleanink" />
            </div>
            <h2 className="text-xl font-bold text-revora-ink">Booking confirmed!</h2>
            <p className="text-sm text-revora-muted mt-2">
              Your Home Passport ({booking.package}) is booked for {booking.slot}.
            </p>
            <div className="mt-4 rounded-xl border border-revora-border bg-revora-canvas p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-revora-muted">Booking ID</span>
                <span className="font-mono font-medium text-revora-ink">{booking.id}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-revora-muted">Amount paid</span>
                <span className="font-bold text-revora-ink">₹{booking.total}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-6 w-full rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Steps 2-4 with stepper ──
  return (
    <div className="min-h-screen bg-revora-canvas flex flex-col">
      <div className="border-b border-revora-border bg-revora-surface">
        <div className="mx-auto max-w-[900px] px-4 md:px-8 py-4">
          <button
            onClick={() => navigate("/services?group=CARE")}
            className="flex items-center gap-1 text-sm text-revora-muted hover:text-revora-ink"
          >
            <ChevronLeft className="w-4 h-4" /> Back to services
          </button>
          <div className="mt-3">
            <PassportStepper current={step === "summary" ? "summary" : step === "details" ? "details" : "package"} />
          </div>
        </div>
      </div>

      <div className="flex-1 mx-auto w-full max-w-[900px] px-4 md:px-8 py-8">
        {step === "package" && (
          <div className="revora-fade-up">
            <button
              onClick={() => setStep("entry")}
              className="flex items-center gap-1 text-sm text-revora-muted hover:text-revora-ink mb-6"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <PackageSelection selectedPackage={selectedPackage} onSelect={handleSelectPackage} />
          </div>
        )}

        {step === "details" && selectedPackage && (
          <div className="revora-fade-up">
            <button onClick={() => setStep("package")} className="flex items-center gap-1 text-sm text-revora-muted hover:text-revora-ink mb-6">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <HomeDetailsForm
              selectedPackage={selectedPackage}
              onProceed={handleProceed}
              onQuoteRequest={handleQuoteRequest}
              onUpgradePackage={setSelectedPackage}
            />
          </div>
        )}

        {step === "summary" && selectedPackage && homeDetails && (
          <div className="revora-fade-up">
            <button onClick={() => setStep("details")} className="flex items-center gap-1 text-sm text-revora-muted hover:text-revora-ink mb-6">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <PassportSummary
              selectedPackage={selectedPackage}
              homeDetails={homeDetails}
              onConfirm={handleConfirm}
            />
          </div>
        )}
      </div>
    </div>
  );
}
