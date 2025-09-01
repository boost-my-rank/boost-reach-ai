import { Helmet } from "react-helmet-async";
import { UnifiedHeader } from "@/components/UnifiedHeader";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service</title>
        <meta name="description" content="Terms of Service for using our platform and services." />
        <link rel="canonical" href={`${window.location.origin}/terms`} />
      </Helmet>
      
      <UnifiedHeader />
      
      <div className="min-h-screen bg-muted/30">
        <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="bg-card rounded-lg shadow-sm border p-6 sm:p-8 lg:p-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
                Terms of Service
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    1. User's Acknowledgment and Acceptance of Terms
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    By using any of Niceboard services ("Services") you agree to be bound by the 
                    following Terms of Service ("Terms"). MktCo LLC, (further referred as "Niceboard", 
                    "we", "us", "our") reserves the right to change or amend these Terms at any time 
                    without notice. We encourage you to review these Terms regularly, as your continued 
                    use of the Services will confirm your acceptance of the revised Terms. If you do not 
                    want to be bound to these Terms, please do not sign up for the Services.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    BY USING THIS SITE, YOU AGREE TO BE BOUND BY THESE TERMS OF USE. IF YOU DO NOT WISH 
                    TO BE BOUND BY THE THESE TERMS OF USE, PLEASE EXIT THE SITE NOW. YOUR REMEDY FOR 
                    DISSATISFACTION WITH THIS SITE, OR ANY PRODUCTS, SERVICES, CONTENT, OR OTHER 
                    INFORMATION AVAILABLE ON OR THROUGH THIS SITE, IS TO STOP USING THE SITE AND/OR THOSE 
                    PARTICULAR PRODUCTS OR SERVICES. YOUR AGREEMENT WITH US REGARDING COMPLIANCE WITH THESE 
                    TERMS OF USE BECOMES EFFECTIVE IMMEDIATELY UPON COMMENCEMENT OF YOUR USE OF THIS SITE.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    2. Membership
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    Registration. To fully use our service you must register as a member by providing 
                    complete and accurate full name, password and email address. You are not allowed to 
                    use someone else's name or a name that violates any third party rights.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    Emails. Primary means of communication between you and us will be through emails. 
                    Thus, you acknowledge that we may use your email to notify you about upcoming system 
                    updates, new product releases, company news, changes of your account status etc., 
                    through emails. We encourage you to carefully read our emails to stay informed. We 
                    will not carry any responsibility if some information did not reach you as a result 
                    of failing to read our emails.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    Account security. You must safeguard confidentiality of your job site's access 
                    credentials. You are also responsible for all activities that occur under your 
                    account. Niceboard will not be held responsibility for an unauthorized access to 
                    your account. If you become aware of any unauthorized access to your account, you 
                    must change your password and notify us as soon as possible.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    3. Account Ownership
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    If you are signing up on behalf of your employer then account owner is your 
                    employer. You warrant that you have authority to bind your employer to these Terms.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    You can transfer your account and pass account ownership rights to a third party 
                    at any time. In this case you need to inform us and update account information 
                    accordingly. Once your account is transferred to another owner you cannot claim 
                    ownership rights for this account. This paragraph does not apply to lifetime licenses.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
};

export default TermsOfService;