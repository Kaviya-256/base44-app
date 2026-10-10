import React from "react";
import LegalLayout from "@/components/revora/LegalLayout";
import { LegalSection, LegalBullet } from "@/components/revora/LegalSection";

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How THE REVORA collects, uses and protects your information"
    >
      <LegalSection number={1} title="Information we collect">
        <LegalBullet>
          Contact details (name, phone, email), service address, booking and scheduling information, payment-related data
          (handled by our payment provider), and service evidence such as photos needed to resolve a quote or dispute.
        </LegalBullet>
        <LegalBullet>
          Account activity, such as bookings made, professionals selected, and support conversations, so we can provide
          consistent service and respond to your requests.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={2} title="How we use your information">
        <LegalBullet>
          To create and manage bookings, match you with available professionals, process payments and refunds, and provide
          customer support.
        </LegalBullet>
        <LegalBullet>
          To send booking confirmations, service updates, invoices and, where you've opted in, offers relevant to your home
          care needs.
        </LegalBullet>
        <LegalBullet>
          To investigate complaints, property damage claims, or disputes, and to improve the safety and quality of our
          services.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={3} title="Who we share it with">
        <LegalBullet>
          Independent service professionals receive only the information reasonably needed to complete your booking (name,
          address, service details, contact number).
        </LegalBullet>
        <LegalBullet>
          Payment credentials are handled directly by our regulated payment provider — THE REVORA does not store your full
          card or bank details.
        </LegalBullet>
        <LegalBullet>
          We do not sell your personal data. Information is shared with law enforcement or regulators only where legally
          required.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={4} title="Property photos and media">
        <LegalBullet>
          Photos or videos of your property are requested only where needed to confirm scope, quality or resolve a dispute.
          They are never used for marketing without your separate, explicit permission.
        </LegalBullet>
        <LegalBullet>
          Access to this media is restricted to relevant support and quality staff, and it is retained only as long as
          necessary for the purpose it was collected.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={5} title="Data retention and security">
        <LegalBullet>
          We retain personal data for as long as needed to deliver bookings, meet legal/tax obligations, and resolve disputes,
          after which it is securely deleted or anonymised.
        </LegalBullet>
        <LegalBullet>
          We apply reasonable technical and organisational safeguards to protect your data against unauthorised access, loss
          or misuse.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={6} title="Your rights">
        <LegalBullet>
          You may request access to, correction of, or deletion of your personal data, subject to our legal and operational
          requirements (such as completed invoices we must retain).
        </LegalBullet>
        <LegalBullet>
          You can update your contact and address details any time from your account, and opt out of marketing
          communications while continuing to receive essential booking updates.
        </LegalBullet>
      </LegalSection>

      <LegalSection number={7} title="Grievance and contact">
        <LegalBullet>
          For privacy questions, access requests or complaints, write to connect@therevora.in or use the in-app help option.
          We acknowledge privacy-related complaints within 48 hours and aim to resolve them within one month.
        </LegalBullet>
        <LegalBullet>
          This policy may be updated from time to time. Material changes will be shown in the app before they take effect.
        </LegalBullet>
      </LegalSection>
    </LegalLayout>
  );
}
