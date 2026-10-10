import React from "react";
import LegalLayout from "@/components/revora/LegalLayout";
import { LegalSection, LegalBullet } from "@/components/revora/LegalSection";

function FeeTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-revora-border mt-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-revora-canvas">
            {columns.map((c) => (
              <th key={c} className="text-left font-semibold text-revora-ink px-4 py-3 border-b border-revora-border">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-revora-border last:border-0">
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-revora-ink/85 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CancellationPolicy() {
  return (
    <LegalLayout
      title="Cancellation, Rescheduling & No-Show Policy"
      subtitle="THE REVORA home-services platform"
    >
      <LegalSection number={1} title="How timing and charges work">
        <LegalBullet>
          "Slot" means the start of the confirmed arrival window in Hyderabad local time. A cancellation or change takes effect
          when THE REVORA receives it through the app, website or support.
        </LegalBullet>
        <LegalBullet>
          Fees in the tables below are maximums, not automatic penalties. We charge only the lower of the stated cap and a
          reasonable, documented committed cost or genuine lost slot after reasonable mitigation. No fee applies if THE REVORA
          or the professional caused the failed visit.
        </LegalBullet>
        <LegalBullet>
          Any fee is deducted from amounts already paid. Approved non-returnable customer-specific materials and completed
          authorised work are accounted for separately, without double recovery.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={2} title="Standard standalone services">
        <FeeTable
          columns={["Customer cancellation timing", "Customer fee cap", "Partner treatment"]}
          rows={[
            ["More than 3 hours before slot", "₹0 — full refund of prepaid service", "No cancellation compensation."],
            [
              "1 to 3 hours before slot",
              "Up to ₹100, subject to documented commitment",
              "From fee actually collected, up to ₹70 to affected professional; balance to THE REVORA for documented costs.",
            ],
            [
              "Less than 1 hour before slot, or after dispatch within 3 hours with prior dispatch notice",
              "Up to ₹199, subject to documented commitment",
              "From fee actually collected, up to ₹150 to affected professional; balance to THE REVORA for documented costs.",
            ],
            [
              "Arrived; access or required utility unavailable after grace period",
              "Up to ₹249, subject to documented failed-visit cost",
              "From fee actually collected, up to ₹200 to affected professional; balance to THE REVORA for documented costs.",
            ],
          ]}
        />
        <p className="text-xs text-revora-muted mt-2">
          At exactly 3 hours, the 1-to-3-hour row applies; at exactly 1 hour, that row applies. Cancellation compensation is
          separate from the professional/platform split of completed eligible service labour.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Move-In Magic">
        <LegalBullet>
          A 30% advance is collected when the crew booking is confirmed. The advance is a payment toward the package, not a
          blanket non-refundable fee. Only the applicable, substantiated fee may be retained; any balance of the advance is
          refunded.
        </LegalBullet>
        <FeeTable
          columns={["Customer cancellation timing", "Maximum retention from advance", "Crew compensation"]}
          rows={[
            ["More than 24 hours before slot", "₹0 — full advance refund, with no automatic payment-gateway deduction", "None."],
            [
              "12 to 24 hours before slot",
              "Up to 10% of agreed package price, subject to documented commitment",
              "70% of the fee actually collected forms a crew pool, divided by assigned role and agreed 1.00 cleaner / 1.35 handyman weights.",
            ],
            [
              "Less than 12 hours before slot, before dispatch",
              "Up to 20% of agreed package price, subject to documented commitment",
              "70% of fee actually collected forms the weighted crew pool.",
            ],
            [
              "After crew dispatch, or failed visit at site after grace period",
              "Up to 30% of agreed package price, limited to the advance and documented crew/travel commitment",
              "70% of fee actually collected forms the weighted crew pool; individual amounts reflect actual crew assigned.",
            ],
          ]}
        />
        <p className="text-xs text-revora-muted mt-2">
          No additional package balance is due for an entirely unperformed Move-In Magic service, except separately approved,
          completed work or genuinely non-returnable customer-specific materials.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Rescheduling">
        <LegalBullet>
          A standard-service change requested more than 3 hours before the slot, or a Move-In Magic change more than 24 hours
          before the slot, is free once per booking, subject to availability.
        </LegalBullet>
        <LegalBullet>
          Inside those windows, THE REVORA will try to reassign the crew and preserve the advance. If genuine committed cost
          remains, the applicable cancellation cap may be charged, with a clear explanation before confirming the new slot.
        </LegalBullet>
        <LegalBullet>
          When THE REVORA asks to reschedule due to its own staff, scheduling or platform issue, the customer may accept a
          comparable slot or cancel for a full refund of unperformed service without a customer fee.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={5} title="Doorstep no-show and utilities">
        <LegalBullet>
          On arrival, the professional records the time and attempts reasonable contact. The customer has a 15-minute grace
          period from a verified arrival at the correct address.
        </LegalBullet>
        <LegalBullet>
          Utilities are required only where relevant to the booked work and clearly disclosed at booking. A failed-visit fee
          requires evidence that customer-controlled access or a disclosed utility failure materially prevented work — never an
          automatic fee for a platform error, unsafe instruction or professional delay.
        </LegalBullet>
        <LegalBullet>
          Lift availability, floor access, parking and bulky equipment restrictions should be captured before dispatch. Any
          extra carrying labour requires a fresh quote and the customer's approval.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={6} title="Cancellation by THE REVORA or professional">
        <LegalBullet>
          If THE REVORA or the assigned professional cancels or fails to attend, THE REVORA offers a comparable replacement
          slot or refunds all prepaid unperformed service and unpurchased parts. The customer does not pay a cancellation fee.
        </LegalBullet>
        <LegalBullet>
          If THE REVORA unilaterally cancels within a customer fee-bearing window, it will also pay the customer a monetary
          amount equal to the corresponding maximum customer cancellation fee for that booking window.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={7} title="Partial service, refunds and disputes">
        <LegalBullet>
          When authorised work was completed before cancellation, the customer pays only for the documented completed portion
          and any approved materials, without double charging.
        </LegalBullet>
        <LegalBullet>
          THE REVORA aims to initiate an approved refund to the original payment method within 5 business days after a
          decision; the bank or payment provider may take additional time to post it.
        </LegalBullet>
        <LegalBullet>
          A disputed fee can be raised at connect@therevora.in or in the app. Consumer complaints are acknowledged within 48
          hours and redressed within one month.
        </LegalBullet>
      </LegalSection>
    </LegalLayout>
  );
}
