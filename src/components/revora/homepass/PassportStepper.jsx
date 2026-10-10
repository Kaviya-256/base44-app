import React from "react";
import { Check } from "lucide-react";

const STEPS = [
  { key: "package", label: "Package" },
  { key: "details", label: "Home Details" },
  { key: "summary", label: "Summary" },
  { key: "payment", label: "Payment" },
];

export default function PassportStepper({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center min-w-max gap-1 md:gap-2 px-4 md:px-0">
        {STEPS.map((step, i) => {
          const isDone = i < currentIndex;
          const isActive = i === currentIndex;
          return (
            <React.Fragment key={step.key}>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                    isDone || isActive ? "bg-revora-primary text-white" : "bg-revora-border text-revora-muted"
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-xs md:text-sm font-medium ${isActive ? "text-revora-ink" : "text-revora-muted"}`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && <span className="w-4 md:w-8 h-px bg-revora-border" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
