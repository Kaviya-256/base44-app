import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, RefreshCw } from "lucide-react";
import BookingLayout from "@/components/revora/BookingLayout";
import { useRevora } from "@/lib/revoraStore";
import { TIME_WINDOWS } from "@/lib/revoraData";

function nextDays(n) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function BookingSchedule() {
  const navigate = useNavigate();
  const { state, updateDraft } = useRevora();
  const [dateIdx, setDateIdx] = useState(0);
  const [timeWindow, setTimeWindow] = useState(state.draft?.timeWindow || "");
  const [refreshing, setRefreshing] = useState(false);
  const days = nextDays(7);

  useEffect(() => {
    if (!state.draft) navigate("/services");
  }, [state.draft, navigate]);

  if (!state.draft) return null;

  const selectedDate = days[dateIdx];
  const dateLabel = selectedDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleContinue = () => {
    if (!timeWindow) return;
    updateDraft({ date: dateLabel, timeWindow });
    navigate("/booking/professional");
  };

  return (
    <BookingLayout
      step="schedule"
      title="Select date & time"
      backTo="/booking/address"
      footer={
        <button
          disabled={!timeWindow}
          onClick={handleContinue}
          className="w-full rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors disabled:opacity-50"
        >
          Continue
        </button>
      }
    >
      <div className="flex items-center gap-2 mb-4 text-revora-ink font-semibold">
        <Calendar className="w-4 h-4 text-revora-gold" /> Choose a date
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => setDateIdx(i)}
            className={`flex-shrink-0 w-[68px] rounded-xl border-2 py-3 text-center transition-colors ${
              dateIdx === i ? "border-revora-primary bg-revora-primary/[0.04]" : "border-revora-border"
            }`}
          >
            <div className="text-xs text-revora-muted">{d.toLocaleDateString("en-IN", { weekday: "short" })}</div>
            <div className="text-lg font-bold text-revora-ink">{d.getDate()}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-revora-ink font-semibold">Available time windows</span>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 text-xs font-medium text-revora-primary"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TIME_WINDOWS.map((tw) => (
          <button
            key={tw}
            onClick={() => setTimeWindow(tw)}
            className={`rounded-xl border-2 px-4 py-3 min-h-[48px] text-sm font-medium transition-colors ${
              timeWindow === tw ? "border-revora-primary bg-revora-primary/[0.04] text-revora-ink" : "border-revora-border text-revora-ink/80"
            }`}
          >
            {tw}
          </button>
        ))}
      </div>
      <p className="text-xs text-revora-muted mt-4">Demo availability windows — arrival window, not a fixed appointment.</p>
    </BookingLayout>
  );
}
