import { Helmet } from "react-helmet-async";
import { UnifiedHeader } from "@/components/UnifiedHeader";
import { Footer } from "@/components/Footer";
import { LegalPageLayout } from "@/components/shared/LegalPageLayout";
import { LegalContent, LegalHeading, LegalParagraph, LegalSection } from "@/components/shared/LegalContent";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service</title>
        <meta name="description" content="Terms of Service for using our platform and services." />
        <link rel="canonical" href={`${window.location.origin}/terms`} />
      </Helmet>
      
      <UnifiedHeader />
      
      <LegalPageLayout>
        <LegalContent title="Terms and Conditions">
          <LegalSection>
            <LegalHeading>1. Introduction</LegalHeading>
            <LegalParagraph>
              Welcome to BoostMyRank! These Terms and Conditions ("Terms") govern your use of our 
              website and our managed editorial backlink outreach subscription (the "Service"). By 
              accessing or using our website, you agree to comply with and be bound by these Terms. If you 
              do not agree to these Terms, please do not use our website or services.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>2. Services</LegalHeading>
            <LegalParagraph>
              BoostMyRank provides a managed editorial backlink outreach subscription that sources 
              journalist/publisher opportunities, drafts quotes, submits on your behalf, and tracks results to 
              enhance online visibility and authority.
            </LegalParagraph>
            <LegalParagraph>
              <strong>Definitions for deliverables:</strong>
            </LegalParagraph>
            <LegalParagraph>
              • <strong>Editorial Backlink:</strong> a hyperlink to your site placed by an independent third-party 
              publisher within editorial content (not sponsored/advertorial/paid placement, not user-generated 
              profiles/comments, and not part of a private blog network (PBN)).
            </LegalParagraph>
            <LegalParagraph>
              • <strong>Qualifying Domain:</strong> a third-party domain with Domain Authority (DA) ≥ 15 (as 
              measured by Moz.com) at or near the time of outreach.
            </LegalParagraph>
            <LegalParagraph>
              • <strong>Counting rule:</strong> nofollow links do not count toward the monthly deliverable; only 
              editorial "follow" links on Qualifying Domains count. Multiple links from the same 
              publisher may count towards this count as well.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>3. Use of Our Website</LegalHeading>
            <LegalParagraph>
              You agree to use our website in accordance with these Terms and applicable laws and 
              regulations. You must not:
            </LegalParagraph>
            <LegalParagraph>
              • Use our website in any way that causes, or may cause, damage to the website or impair 
              its availability or accessibility.
            </LegalParagraph>
            <LegalParagraph>
              • Use our website to engage in any unlawful, fraudulent, or harmful activity.
            </LegalParagraph>
            <LegalParagraph>
              • Use our website to copy, store, host, transmit, send, use, publish, or distribute any 
              material that consists of (or is linked to) any spyware, virus, worm, or other malicious 
              software.
            </LegalParagraph>
            <LegalParagraph>
              We reserve the right to restrict access to areas of our website or the entire website at our 
              discretion.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>4. Intellectual Property Rights</LegalHeading>
            <LegalParagraph>
              Unless otherwise stated, BoostMyRank owns all intellectual property rights derived from the 
              website and its content. All these intellectual property rights are reserved. You may view, 
              download, and print content from our website for your personal use, subject to the restrictions 
              set out in these Terms.
            </LegalParagraph>
            <LegalParagraph>
              You must not:
            </LegalParagraph>
            <LegalParagraph>
              • Republish material from our website (including on another website).
            </LegalParagraph>
            <LegalParagraph>
              • Sell, rent, or sub-license material from our website.
            </LegalParagraph>
            <LegalParagraph>
              • Reproduce, duplicate, copy, or otherwise exploit material on our website for a commercial purpose.
            </LegalParagraph>
            <LegalParagraph>
              • Edit or otherwise modify any material on our website.
            </LegalParagraph>
            <LegalParagraph>
              With Client consent, we may list Client as a customer on our website, including displaying your logo on our landing page or any other part of our website; consent can be withdrawn prospectively.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>5. Limitation of Liability; AI, Approvals, and Defamation Waiver</LegalHeading>
            <LegalParagraph>
              While we strive to ensure that the information on our website is accurate and up-to-date, we do not warrant its completeness or accuracy. We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of, or inability to use, our website or services.
            </LegalParagraph>
            <LegalParagraph>
              By using BoostMyRank, you agree that we may pitch to reporters and publications on your behalf using AI-assisted drafting. You agree that human review and client pre-approval are not guaranteed, and that submissions may be made without prior approval, and that editorial decisions and final publication are controlled by third parties. We will attempt corrections or takedowns for inaccuracies, but outcomes cannot be guaranteed.
            </LegalParagraph>
            <LegalParagraph>
              You agree to waive any claims for libel, slander, or defamation arising from quotes or content published by third-party outlets as part of the Service. By agreeing to our Service, you acknowledge some risk that information published about your business may be inaccurate or misleading despite our safeguards. We will avoid sensitive subjects and strive, to the best of our ability, not to misrepresent your business or publish content that may be harmful to your brand, reputation, customer relationships, or other core commercial or material interests.
            </LegalParagraph>
            <LegalParagraph>
              <strong>Liability cap:</strong> To the maximum extent permitted by law, our total liability to you for any claim arising from or related to these Terms or our services is limited to the fees you paid to BoostMyRank in the two (2) months preceding the event giving rise to the claim.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>6. Partial Refund Specification (Pro-Rata for Missing Links)</LegalHeading>
            <LegalParagraph>
              For each monthly billing cycle, the deliverable target is three (3) Editorial Backlinks on Qualifying Domains (DA ≥ 15); nofollow links do not count toward this target. If fewer than three qualifying links are delivered by the end of the cycle, you may, within 14 days of the cycle end, request a partial, pro-rata refund calculated as:
            </LegalParagraph>
            <LegalParagraph>
              <strong>Refund = (Monthly Subscription Fee ÷ 3) × (3 − Links Delivered)</strong>
            </LegalParagraph>
            <LegalParagraph>
              "Monthly Subscription Fee" means the price for your plan (Standard or Agency) as listed on our Pricing page for that billing cycle (taxes excluded).
            </LegalParagraph>
            <LegalParagraph>
              <strong>Examples:</strong>
            </LegalParagraph>
            <LegalParagraph>
              • 2 links delivered → refund = 1/3 of the Monthly Subscription Fee.
            </LegalParagraph>
            <LegalParagraph>
              • 1 link delivered → refund = 2/3 of the Monthly Subscription Fee.
            </LegalParagraph>
            <LegalParagraph>
              • 0 links delivered → refund = 100% of the Monthly Subscription Fee.
            </LegalParagraph>
            <LegalParagraph>
              As an alternative to a refund, you may elect a free extension until the shortfall is made up; you may choose either extension or refund for a given cycle, not both. Refunds are issued to the original payment method via Stripe.
            </LegalParagraph>
            <LegalParagraph>
              For any refund requests, you can email phil@boostmyrank.co and our team will aim to process these requests with 14 business days.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>7. Third-Party Links</LegalHeading>
            <LegalParagraph>
              Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of these sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>8. Termination</LegalHeading>
            <LegalParagraph>
              We may terminate your access to our website or services at any time, without notice, for conduct that we believe violates these Terms or is harmful to our business interests, or for any other reason.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>9. Governing Law</LegalHeading>
            <LegalParagraph>
              These Terms are governed by and construed in accordance with the laws of the state of Delaware in the United States of America. Any disputes arising from or relating to these Terms or your use of our website or services shall be subject to the exclusive jurisdiction of the state or federal courts located in Delaware.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>10. Changes to These Terms</LegalHeading>
            <LegalParagraph>
              We may update these Terms from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page with an updated effective date. Your continued use of our website or services following the posting of changes constitutes your acceptance of those changes.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>11. Fulfillment Policies for BoostMyRank</LegalHeading>
            <LegalParagraph>
              • <strong>Pitching Policy:</strong> We may pitch via multiple industry platforms and direct publisher/journalist outreach (we do not limit outreach to any single platform). Pitch volume varies by niche and opportunity availability.
            </LegalParagraph>
            <LegalParagraph>
              • <strong>Deliverable & Guarantee:</strong> During each monthly billing cycle, we will use commercially reasonable efforts to deliver at least three (3) Editorial Backlinks on Qualifying Domains (DA ≥ 15). If fewer than three are delivered in a cycle, you may, within 14 days of the cycle end, choose either (a) a free extension until the shortfall is made up, or (b) a refund of that month's subscription fee through your original payment method (no checks or other payment methods are allowed for this purpose). Any refund is governed by the Partial Refund specification in the Terms of Service (pro-rata per missing link).
            </LegalParagraph>
            <LegalParagraph>
              • <strong>Replacement Policy:</strong> If a delivered qualifying link is removed within 30 days of placement for reasons outside your control, we will attempt a one-for-one replacement.
            </LegalParagraph>
            <LegalParagraph>
              • <strong>Delivery Policy:</strong> Services are delivered digitally within the subscription term. Regardless of sign-up date, we plan to send a monthly report within the first 5 business days of the new month summarizing pitches, delivered backlinks, and in-progress opportunities.
            </LegalParagraph>
            <LegalParagraph>
              • The plan is priced as stated on our Pricing page for both the Standard and Agency plans, plus any applicable taxes, auto-renews monthly, and can be canceled via the Stripe customer portal or by emailing phil@boostmyrank.co before the next renewal to avoid future charges. Taxes are additional where applicable.
            </LegalParagraph>
            <LegalParagraph>
              • <strong>Chargebacks:</strong> Initiating a chargeback without first contacting us may result in immediate suspension; we reserve the right to contest chargebacks and recover associated fees.
            </LegalParagraph>
            <LegalParagraph>
              • <strong>Refunds/Credits:</strong> Apart from the Deliverable & Guarantee above or where required by law, fees are non-refundable and credits are not issued.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>12. Compliance (Anti-Spam/FTC/No Paid Links/PBNs)</LegalHeading>
            <LegalParagraph>
              All outreach must comply with applicable laws and rules, including CAN-SPAM, FTC endorsement and advertising guidelines, and (where applicable) GDPR/ePrivacy. We do not engage in paid link schemes or PBNs. You will not request or direct us to violate these requirements.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>13. Data & Privacy</LegalHeading>
            <LegalParagraph>
              Each party will comply with applicable data-protection laws. For Client Personal Data you provide to us for the Service, you are the controller and BoostMyRank is the processor; for our own datasets and operations, BoostMyRank acts as a controller. A Data Processing Addendum (DPA) is available upon request.
            </LegalParagraph>
            <LegalParagraph>
              We use vetted sub-processors listed on request and implement reasonable technical/organizational measures; cross-border transfers rely on valid mechanisms.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>Contact Us</LegalHeading>
            <LegalParagraph>
              If you have any questions or concerns about these Terms, please contact us at: phil@boostmyrank.co.
            </LegalParagraph>
          </LegalSection>
        </LegalContent>
      </LegalPageLayout>
      
      <Footer />
    </>
  );
};

export default TermsOfService;