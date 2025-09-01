import { Helmet } from "react-helmet-async";
import { UnifiedHeader } from "@/components/UnifiedHeader";
import { Footer } from "@/components/Footer";
import { LegalPage } from "@/components/shared/LegalPage";
import { LegalContent, LegalSection, LegalHeading, LegalParagraph, LegalParagraphLast } from "@/components/shared/LegalContent";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service</title>
        <meta name="description" content="Terms of Service for using our platform and services." />
        <link rel="canonical" href={`${window.location.origin}/terms`} />
      </Helmet>
      
      <UnifiedHeader />
      
      <LegalPage>
        <LegalContent title="Terms of Service">
          <LegalSection>
            <LegalHeading>
              1. User's Acknowledgment and Acceptance of Terms
            </LegalHeading>
            <LegalParagraph>
              By using any of Niceboard services ("Services") you agree to be bound by the 
              following Terms of Service ("Terms"). MktCo LLC, (further referred as "Niceboard", 
              "we", "us", "our") reserves the right to change or amend these Terms at any time 
              without notice. We encourage you to review these Terms regularly, as your continued 
              use of the Services will confirm your acceptance of the revised Terms. If you do not 
              want to be bound to these Terms, please do not sign up for the Services.
            </LegalParagraph>
            <LegalParagraph>
              BY USING THIS SITE, YOU AGREE TO BE BOUND BY THESE TERMS OF USE. IF YOU DO NOT WISH 
              TO BE BOUND BY THE THESE TERMS OF USE, PLEASE EXIT THE SITE NOW. YOUR REMEDY FOR 
              DISSATISFACTION WITH THIS SITE, OR ANY PRODUCTS, SERVICES, CONTENT, OR OTHER 
              INFORMATION AVAILABLE ON OR THROUGH THIS SITE, IS TO STOP USING THE SITE AND/OR THOSE 
              PARTICULAR PRODUCTS OR SERVICES. YOUR AGREEMENT WITH US REGARDING COMPLIANCE WITH THESE 
              TERMS OF USE BECOMES EFFECTIVE IMMEDIATELY UPON COMMENCEMENT OF YOUR USE OF THIS SITE.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>
              2. Membership
            </LegalHeading>
            <LegalParagraph>
              Registration. To fully use our service you must register as a member by providing 
              complete and accurate full name, password and email address. You are not allowed to 
              use someone else's name or a name that violates any third party rights.
            </LegalParagraph>
            <LegalParagraph>
              Emails. Primary means of communication between you and us will be through emails. 
              Thus, you acknowledge that we may use your email to notify you about upcoming system 
              updates, new product releases, company news, changes of your account status etc., 
              through emails. We encourage you to carefully read our emails to stay informed. We 
              will not carry any responsibility if some information did not reach you as a result 
              of failing to read our emails.
            </LegalParagraph>
            <LegalParagraph>
              Account security. You must safeguard confidentiality of your job site's access 
              credentials. You are also responsible for all activities that occur under your 
              account. Niceboard will not be held responsibility for an unauthorized access to 
              your account. If you become aware of any unauthorized access to your account, you 
              must change your password and notify us as soon as possible.
            </LegalParagraph>
          </LegalSection>

          <LegalSection>
            <LegalHeading>
              3. Account Ownership
            </LegalHeading>
            <LegalParagraph>
              If you are signing up on behalf of your employer then account owner is your 
              employer. You warrant that you have authority to bind your employer to these Terms.
            </LegalParagraph>
            <LegalParagraphLast>
              You can transfer your account and pass account ownership rights to a third party 
              at any time. In this case you need to inform us and update account information 
              accordingly. Once your account is transferred to another owner you cannot claim 
              ownership rights for this account. This paragraph does not apply to lifetime licenses.
            </LegalParagraphLast>
          </LegalSection>
        </LegalContent>
      </LegalPage>
      
      <Footer />
    </>
  );
};

export default TermsOfService;