import React from "react";
import LegalLayout from "@/components/revora/LegalLayout";
import { LegalSection, LegalBullet } from "@/components/revora/LegalSection";

export default function TermsAndConditions() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="THE REVORA home-services platform"
    >
      <LegalSection number={1} title="Company, scope and acceptance">
        <LegalBullet>
          THE REVORA is the home-services brand operated by the registered company behind the platform ("THE REVORA", "we").
          THE REVORA arranges bookings with independent service professionals and coordinates customer support, payments and
          quality handling. The role of THE REVORA and the invoice issuer for each category is shown in the booking and invoice.
        </LegalBullet>
        <LegalBullet>
          These terms apply to customer use of THE REVORA app, website and booked services in supported locations. The booking
          summary, relevant service description, any accepted quote and the separate Cancellation, Rescheduling & No-Show Policy
          form part of the customer agreement. Where a service-specific term conflicts with a general term, the clearly disclosed
          service-specific term controls, subject to law.
        </LegalBullet>
        <LegalBullet>
          Customers must be at least 18 years old, have authority to request work at the property, provide accurate booking
          details and accept the terms using a clear affirmative action before confirming a booking. Material policy changes apply
          prospectively and will be shown before the next booking.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={2} title="Booking, availability and professionals">
        <LegalBullet>
          A request is confirmed only when THE REVORA sends a booking confirmation showing service, address, arrival window,
          scope and price, and receives any required payment or advance. Availability depends on location, professional
          acceptance and site suitability.
        </LegalBullet>
        <LegalBullet>
          Customer-selected and "Book Again" professionals are subject to availability and their consent. THE REVORA uses
          reasonable identity and skill checks, but cannot guarantee that any professional or visit will eliminate all risk.
        </LegalBullet>
        <LegalBullet>
          The customer provides safe access, a responsible adult or authorised contact, truthful site conditions, any building
          permissions, and utilities reasonably required for the booked task. If conditions differ materially, the professional
          may pause, propose a revised quote or decline unsafe work.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={3} title="Scope, safety and extras">
        <LegalBullet>
          Only the tasks and time/quantity limits in the booking or approved quote are included. Major electrical or plumbing
          work, hazardous substances, concealed services, work at unsafe height and manufacturer-authorised tasks may require
          specialists or may be declined.
        </LegalBullet>
        <LegalBullet>
          Labour, parts/materials, disclosed service fees and taxes are itemised before payment. Any additional work or materials
          require an itemised quote and the customer's explicit approval before purchase or work. A completed visit is not
          approval.
        </LegalBullet>
        <LegalBullet>
          The professional/platform revenue split concerns partner settlement only. It does not mean parts are included, waive
          taxes, or change the customer's agreed price. Tips, if offered, are voluntary and separately displayed.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={4} title="Prices, payments and receipts">
        <LegalBullet>
          The checkout page states the payable total, any advance and the balance due. A confirmed booking's agreed price is
          changed only after customer approval of a revised quote or scope. No undisclosed charge may be added automatically.
        </LegalBullet>
        <LegalBullet>
          Payment methods, balance timing and the applicable invoice or receipt are shown in the booking flow. Please do not pay
          a professional privately for unapproved extras.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={5} title="Move-In Magic">
        <LegalBullet>
          Move-In Magic is a coordinated package for an eligible vacant or substantially empty home: move-in deep cleaning,
          limited essential handyman setup, minor readiness checks, light guided unpacking/organisation and a completion
          checklist. It excludes moving transport, heavy furniture relocation, major repairs, civil work and unlimited setup.
        </LegalBullet>
        <LegalBullet>
          The customer pays a 30% booking advance when the crew is confirmed and the remaining 70% at completion/handover,
          subject to approved extras and legitimate refunds.
        </LegalBullet>
        <LegalBullet>
          Construction residue, severe mould, biohazards, unusual soil, access constraints or significantly different
          area/scope require assessment; THE REVORA will offer a revised quote or a cancellation/refund outcome.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={6} title="Cancellation, rescheduling and no-shows">
        <LegalBullet>
          The separate THE REVORA Cancellation, Rescheduling & No-Show Policy contains the complete fee table and applies to
          all confirmed bookings. Applicable fees are ceilings, require a valid reason and evidence, and cannot exceed the
          disclosed cap.
        </LegalBullet>
        <LegalBullet>
          Where THE REVORA or its assigned professional cancels or fails to attend, the customer pays no cancellation fee and
          can choose an available replacement or a refund of unperformed service.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={7} title="Completion, quality and complaints">
        <LegalBullet>
          The customer can inspect the work at handover and report a defect or incomplete task. THE REVORA will investigate
          complaints and, where justified, offer completion, rework, an appropriate price adjustment, refund or another lawful
          remedy.
        </LegalBullet>
        <LegalBullet>
          Report concerns through support at connect@therevora.in or the in-app help option. THE REVORA will acknowledge
          consumer complaints within 48 hours and seek redress within one month; urgent safety issues will be triaged sooner.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={8} title="Property damage, missing items and conduct">
        <LegalBullet>
          Customers should disclose fragile or high-value items and secure cash, jewellery and other portable valuables where
          practical. This does not remove any legal responsibility for proven damage, negligence or theft. Tell THE REVORA
          promptly and preserve relevant evidence.
        </LegalBullet>
        <LegalBullet>
          If theft or a serious offence is suspected, customers may contact the police; THE REVORA will preserve and share
          relevant records through lawful channels. There is no automatic charge for an unfinished service solely because a
          visit ends early.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={9} title="Accounts, fair use and off-platform arrangements">
        <LegalBullet>
          Customers should keep access credentials secure and report suspected misuse. THE REVORA can temporarily restrict
          accounts for credible safety, fraud or abuse concerns, with an opportunity to contest a non-urgent decision.
        </LegalBullet>
        <LegalBullet>
          Bookings arranged privately outside THE REVORA are outside THE REVORA's booking records and ordinary support
          process.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={10} title="Personal data and property media">
        <LegalBullet>
          THE REVORA processes contact, address, booking, payment-related and service evidence data to deliver and support
          bookings. Our Privacy Policy explains purposes, recipients, retention periods, security, rights and grievance
          contacts.
        </LegalBullet>
        <LegalBullet>
          Property photos or videos are requested only where needed for scope, quality or a dispute, and are not used in
          marketing without separate permission.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={11} title="Law, disputes and contact">
        <LegalBullet>
          Indian law applies. THE REVORA first offers support and grievance review, without preventing a customer from
          approaching a court, consumer commission, regulator or other forum with jurisdiction under law.
        </LegalBullet>
        <LegalBullet>
          Support email: connect@therevora.in. The final effective date and version will appear on the website and app. If one
          provision is unenforceable, the remaining lawful provisions continue to apply.
        </LegalBullet>
      </LegalSection>
    </LegalLayout>
  );
}
