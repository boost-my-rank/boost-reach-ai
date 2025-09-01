import { Helmet } from "react-helmet-async";
import { UnifiedHeader } from "@/components/UnifiedHeader";
import { Footer } from "@/components/Footer";
import { LegalPage } from "@/components/shared/LegalPage";
import { LegalContent, LegalSection, LegalHeading, LegalParagraph, LegalParagraphLast } from "@/components/shared/LegalContent";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="Our commitment to privacy and how we use your information." />
        <link rel="canonical" href={`${window.location.origin}/privacy`} />
      </Helmet>
      
      <UnifiedHeader />
      
      <LegalPage>
        <LegalContent title="Privacy Policy">
          <LegalSection>
            <LegalHeading>
              Our Commitment To Privacy
            </LegalHeading>
            <LegalParagraphLast>
              Your privacy is important to us. To better protect your privacy we provide this policy 
              explaining our online information practices and the choices you can make about the 
              way your information is collected and used. To make this notice easy to find, we make 
              it available on our homepage and at every point where personally identifiable 
              information may be requested.
            </LegalParagraphLast>
          </LegalSection>

          <LegalSection>
            <LegalHeading>
              The Information We Collect
            </LegalHeading>
            <LegalParagraphLast>
              This policy applies to all information collected or submitted on the Niceboard website. 
              The types of personal information collected at "Order" and "Contact us" pages are: 
              Name, Email address, Web site address
            </LegalParagraphLast>
          </LegalSection>

          <LegalSection>
            <LegalHeading>
              How We Use Your Information
            </LegalHeading>
            <LegalParagraph>
              We use the information you provide about yourself when placing an order only to 
              complete that order. We do not share this information with outside parties except to 
              the extent necessary to complete that order.
            </LegalParagraph>
            <LegalParagraph>
              We use return email addresses to answer the email we receive. Such addresses are 
              not used for any other purpose and are not shared with outside parties.
            </LegalParagraph>
            <LegalParagraph>
              Finally, we never use or share the personally identifiable information provided to us 
              online in ways unrelated to the ones described above without also providing you an 
              opportunity to opt-out or otherwise prohibit such unrelated uses.
            </LegalParagraph>
            <LegalParagraphLast>
              We use Google Analytics including advanced features that may collect demographic 
              information about you if it is present.
            </LegalParagraphLast>
          </LegalSection>

          <LegalSection>
            <LegalHeading>
              Contact Us
            </LegalHeading>
            <LegalParagraphLast>
              If you have any questions or comments about this Privacy Policy or your personal 
              information, to make an access or correction request, to exercise any applicable 
              rights, to make a complaint, or to obtain information about our policies and practices, 
              our Privacy Officer (or Data Protection Officer) can be reached by mail or email using 
              the following contact information: by email at{" "}
              <a 
                href="mailto:support@niceboard.co" 
                className="hover:underline focus:underline focus:outline-none text-foreground"
              >
                support@niceboard.co
              </a>
              .
            </LegalParagraphLast>
          </LegalSection>
        </LegalContent>
      </LegalPage>
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;