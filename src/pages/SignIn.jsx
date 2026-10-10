import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    navigate(`/verify-otp?phone=${encodeURIComponent(phone)}`);
  };

  return (
    <div className="min-h-screen bg-revora-canvas flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-revora-surface rounded-2xl border border-revora-border p-6 md:p-8 revora-fade-up">
        <Link to="/" className="text-lg font-bold text-revora-ink">
          THE REVORA
        </Link>
        <p className="text-xs text-revora-gold tracking-widest mt-1 mb-6">FIX · CLEAN · CARE</p>
        <h1 className="text-xl font-bold text-revora-ink">Sign in to continue</h1>
        <p className="text-sm text-revora-muted mt-1">We'll send a one-time code to verify your number.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-revora-ink">
              Mobile number
            </label>
            <div className="mt-1.5 flex items-center gap-2 border border-revora-border rounded-xl px-3 min-h-[48px] focus-within:border-revora-primary">
              <Phone className="w-4 h-4 text-revora-muted" />
              <input
                id="phone"
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
        <p className="text-xs text-revora-muted mt-6 text-center">
          This is a prototype sign-in. No real message is sent — any 6-digit code works on the next screen.
        </p>
        <p className="text-xs text-revora-muted mt-4 text-center">
          Are you a THE REVORA professional?{" "}
          <Link to="/professional-login" className="text-revora-primary font-medium hover:underline">
            Professional login
          </Link>
        </p>
      </div>
    </div>
  );
}
