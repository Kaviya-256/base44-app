import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Phone, ChevronLeft } from "lucide-react";
import { useRevora } from "@/lib/revoraStore";

export default function ProfessionalLogin() {
  const navigate = useNavigate();
  const { signInAsProfessional, signInAsAdmin } = useRevora();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code (try 123456).");
      return;
    }
    setError("");
    setSubmitting(true);
    setTimeout(() => {
      if (phone.replace(/\D/g, "") === "9999999999") {
        signInAsAdmin("THE REVORA Admin");
        navigate("/admin-dashboard");
      } else {
        signInAsProfessional("Arjun Menon");
        navigate("/professional-dashboard");
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-revora-canvas flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-revora-surface rounded-2xl border border-revora-border p-6 md:p-8 revora-fade-up">
        <Link to="/" className="text-lg font-bold text-revora-ink">
          THE REVORA
        </Link>
        <p className="text-xs text-revora-gold tracking-widest mt-1 mb-6">PROFESSIONAL PORTAL</p>

        {step === "phone" ? (
          <>
            <h1 className="text-xl font-bold text-revora-ink">Professional Sign In</h1>
            <p className="text-sm text-revora-muted mt-1">Enter your registered mobile number to continue.</p>
            <form onSubmit={handlePhoneSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="pro-phone" className="text-sm font-medium text-revora-ink">
                  Mobile number
                </label>
                <div className="mt-1.5 flex items-center gap-2 border border-revora-border rounded-xl px-3 min-h-[48px] focus-within:border-revora-primary">
                  <Phone className="w-4 h-4 text-revora-muted" />
                  <input
                    id="pro-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="flex-1 outline-none text-sm bg-transparent py-3"
                  />
                </div>
                {error && <p className="text-xs text-revora-danger mt-1.5">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
              >
                Send OTP
              </button>
            </form>
          </>
        ) : (
          <>
            <button
              onClick={() => setStep("phone")}
              className="flex items-center gap-1 text-sm text-revora-muted mb-4"
            >
              <ChevronLeft className="w-4 h-4" /> Change number
            </button>
            <h1 className="text-xl font-bold text-revora-ink">Verify your number</h1>
            <p className="text-sm text-revora-muted mt-1">
              Enter the code sent to <span className="font-medium text-revora-ink">{phone || "your number"}</span>
            </p>
            <form onSubmit={handleOtpSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="pro-otp" className="text-sm font-medium text-revora-ink">
                  6-digit code
                </label>
                <input
                  id="pro-otp"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="mt-1.5 w-full border border-revora-border rounded-xl px-4 py-3 min-h-[48px] text-center text-lg tracking-[0.4em] outline-none focus:border-revora-primary"
                />
                {error && <p className="text-xs text-revora-danger mt-1.5">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors disabled:opacity-60"
              >
                {submitting ? "Verifying..." : "Verify & Continue"}
              </button>
            </form>
          </>
        )}

        <Link to="/sign-in" className="block text-xs text-revora-muted mt-6 text-center hover:text-revora-primary">
          ← Back to customer sign in
        </Link>
      </div>
    </div>
  );
}
