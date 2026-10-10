import React from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Download } from "lucide-react";
import jsPDF from "jspdf";
import { useRevora } from "@/lib/revoraStore";
import { getServiceById, getProfessionalById, formatINR } from "@/lib/revoraData";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { state } = useRevora();
  const bookingId = params.get("bookingId");
  const booking = state.bookings.find((b) => b.id === bookingId);

  if (!booking) {
    return (
      <div className="min-h-screen bg-revora-canvas flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-revora-ink font-semibold">Booking not found.</p>
          <Link to="/dashboard" className="text-revora-primary font-semibold mt-3 inline-block">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const service = getServiceById(booking.serviceId);
  const professional = booking.professionalId ? getProfessionalById(booking.professionalId) : null;
  const address = state.addresses.find((a) => a.id === booking.addressId);

  const pkg = service?.packages.find((p) => p.id === booking.packageId);
  const addons = service?.addons.filter((a) => booking.addonIds?.includes(a.id)) || [];
  const subtotal = (pkg?.price || 0) + addons.reduce((s, a) => s + a.price, 0);
  const fee = 29;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + fee + tax;

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    const left = 14;
    let y = 20;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 77, 84);
    doc.text("THE REVORA", left, y);
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text("FIX \u00B7 CLEAN \u00B7 CARE", left, y + 5);
    doc.setFontSize(10);
    doc.setTextColor(40);
    doc.text("Invoice", 196, y, { align: "right" });
    doc.setDrawColor(220);
    doc.line(left, y + 10, 196, y + 10);
    y += 20;

    // Invoice meta
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("Invoice No:", left, y);
    doc.text(`INV-${booking.id.slice(-6).toUpperCase()}`, left + 30, y);
    doc.text("Date:", 140, y);
    doc.text(new Date().toLocaleDateString("en-IN"), 160, y);
    y += 8;

    doc.text("Booking ID:", left, y);
    doc.text(booking.id, left + 30, y);
    doc.text("Status:", 140, y);
    doc.setTextColor(20, 107, 73);
    doc.text("Paid", 160, y);
    doc.setTextColor(100);
    y += 14;

    // Service details
    doc.setFontSize(11);
    doc.setTextColor(40);
    doc.text("Service Details", left, y);
    y += 6;
    doc.setDrawColor(230);
    doc.line(left, y, 196, y);
    y += 6;

    const details = [
      ["Service", service?.name || "—"],
      ["Package", pkg?.name || "—"],
      ["Date", booking.date || "—"],
      ["Time", booking.timeWindow || "—"],
      ["Professional", booking.assignmentMode === "auto" ? "THE REVORA assigned" : professional?.name || "—"],
      ["Address", address ? `${address.house}, ${address.area}, ${address.city}` : "—"],
    ];

    doc.setFontSize(9);
    details.forEach(([label, value]) => {
      doc.setTextColor(120);
      doc.text(label, left, y);
      doc.setTextColor(40);
      const wrapped = doc.splitTextToSize(String(value), 120);
      doc.text(wrapped, left + 40, y);
      y += 6 + (wrapped.length - 1) * 5;
    });

    y += 6;

    // Price breakdown
    doc.setFontSize(11);
    doc.setTextColor(40);
    doc.text("Price Breakdown", left, y);
    y += 6;
    doc.setDrawColor(230);
    doc.line(left, y, 196, y);
    y += 6;

    doc.setFontSize(9);
    const pdfINR = (amt) => "Rs. " + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amt);
    const priceRows = [
      ["Subtotal", pdfINR(subtotal)],
      ["Platform fee", pdfINR(fee)],
      ["Tax (5%)", pdfINR(tax)],
    ];
    priceRows.forEach(([label, value]) => {
      doc.setTextColor(100);
      doc.text(label, left, y);
      doc.setTextColor(40);
      doc.text(value, 196, y, { align: "right" });
      y += 6;
    });

    y += 2;
    doc.setDrawColor(200);
    doc.line(left, y, 196, y);
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(0, 77, 84);
    doc.text("Total Paid", left, y);
    doc.text(pdfINR(total), 196, y, { align: "right" });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("This is a system-generated invoice for a prototype booking. No real payment was processed.", left, 285);
    doc.text("THE REVORA \u00B7 support@revora.example \u00B7 Hyderabad", left, 290);

    doc.save(`THE-REVORA-Invoice-${booking.id.slice(-6)}.pdf`);
  };

  return (
    <div className="min-h-screen bg-revora-canvas flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-revora-surface rounded-2xl border border-revora-border p-6 md:p-8 text-center revora-fade-up">
        <CheckCircle2 className="w-14 h-14 text-revora-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-revora-ink">You're all set.</h1>
        <p className="text-sm text-revora-muted mt-1">Your booking is confirmed.</p>

        <div className="mt-6 text-left border border-revora-border rounded-xl p-4 space-y-2">
          <Row label="Booking ID" value={booking.id} />
          <Row label="Service" value={service?.name} />
          <Row label="Date" value={booking.date} />
          <Row label="Time" value={booking.timeWindow} />
          <Row
            label="Professional"
            value={booking.assignmentMode === "auto" ? "THE REVORA will assign" : professional?.name}
          />
          <Row label="Address" value={address ? `${address.area}, ${address.city}` : "—"} />
          <Row label="Payment" value="Paid (demo)" />
        </div>

        <button
          onClick={handleDownloadInvoice}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-revora-border text-revora-ink font-semibold py-3 min-h-[48px] hover:bg-revora-canvas transition-colors mt-4"
        >
          <Download className="w-4 h-4" />
          Download Invoice
        </button>

        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <button
            onClick={() => navigate(`/bookings/${booking.id}`)}
            className="flex-1 rounded-xl bg-revora-primary text-white font-semibold py-3 min-h-[48px] hover:bg-revora-primarydark transition-colors"
          >
            View Booking
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 rounded-xl border border-revora-border text-revora-ink font-semibold py-3 min-h-[48px]"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-revora-muted">{label}</span>
      <span className="font-medium text-revora-ink text-right">{value}</span>
    </div>
  );
}
