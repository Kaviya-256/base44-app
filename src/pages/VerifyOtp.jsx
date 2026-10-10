import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useRevora } from "@/lib/revoraStore";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useRevora();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const phone = new URLSearchParams(location.search).get("phone") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code (try 123456).");
      return;
    }
    setError("");
    setSubmitting(true);
    setTimeout(() => {
      signIn("Vineeth");
      navigate("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-revora-canvas flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-revora-surface rounded-2xl border border-revora-border p-6 md:p-8 revora-fade-up">
        <Link to="/" className="text-lg font-bold text-revora-ink">
          THE REVORA
        </Link>
        <h1 className="text-xl font-bold text-revora-ink mt-6">Verify your number</h1>
        <p className="text-sm text-revora-muted mt-1">
          Enter the code sent to <span className="font-medium text-revora-ink">{phone || "your number"}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="otp" className="text-sm font-medium text-revora-ink">
              6-digit code
            </label>
            <input
              id="otp"
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
        <p className="text-xs text-revora-muted mt-6 text-center">
          Prototype mode: any exact 6-digit code (e.g. 123456) is accepted.
        </p>
      </div>
    </div>
  );
}
