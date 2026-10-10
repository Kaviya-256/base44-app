import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import BookingStepper from "@/components/revora/BookingStepper";

export default function BookingLayout({ step, title, backTo, children, footer }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-revora-canvas flex flex-col">
      <div className="border-b border-revora-border bg-revora-surface">
        <div className="mx-auto max-w-[900px] px-4 md:px-8 py-4">
          <div className="flex items-center gap-3 mb-4">
            {backTo && (
              <button
                onClick={() => navigate(backTo)}
                className="p-1.5 -ml-1.5 rounded-lg hover:bg-revora-canvas transition-colors"
                aria-label="Back"
              >
                <ChevronLeft className="w-5 h-5 text-revora-ink" />
              </button>
            )}
            <h1 className="text-lg font-bold text-revora-ink">{title}</h1>
          </div>
          <BookingStepper current={step} />
        </div>
      </div>
      <div className="flex-1 mx-auto w-full max-w-[900px] px-4 md:px-8 py-8">{children}</div>
      {footer && (
        <div className="sticky bottom-0 border-t border-revora-border bg-revora-surface">
          <div className="mx-auto max-w-[900px] px-4 md:px-8 py-4">{footer}</div>
        </div>
      )}
    </div>
  );
}
