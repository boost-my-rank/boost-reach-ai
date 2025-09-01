import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="Our commitment to privacy and how we use your information." />
        <link rel="canonical" href={`${window.location.origin}/privacy`} />
      </Helmet>
      
      <div className="min-h-screen bg-muted/30">
        <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="bg-card rounded-lg shadow-sm border p-6 sm:p-8 lg:p-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
                Privacy Policy
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Our Commitment To Privacy
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    Your privacy is important to us. To better protect your privacy we provide this policy 
                    explaining our online information practices and the choices you can make about the 
                    way your information is collected and used. To make this notice easy to find, we make 
                    it available on our homepage and at every point where personally identifiable 
                    information may be requested.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    The Information We Collect
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    This policy applies to all information collected or submitted on the Niceboard website. 
                    The types of personal information collected at "Order" and "Contact us" pages are: 
                    Name, Email address, Web site address
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    We use the information you provide about yourself when placing an order only to 
                    complete that order. We do not share this information with outside parties except to 
                    the extent necessary to complete that order.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    We use return email addresses to answer the email we receive. Such addresses are 
                    not used for any other purpose and are not shared with outside parties.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    Finally, we never use or share the personally identifiable information provided to us 
                    online in ways unrelated to the ones described above without also providing you an 
                    opportunity to opt-out or otherwise prohibit such unrelated uses.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    We use Google Analytics including advanced features that may collect demographic 
                    information about you if it is present.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Contact Us
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    If you have any questions or comments about this Privacy Policy or your personal 
                    information, to make an access or correction request, to exercise any applicable 
                    rights, to make a complaint, or to obtain information about our policies and practices, 
                    our Privacy Officer (or Data Protection Officer) can be reached by mail or email using 
                    the following contact information: by email at{" "}
                    <a 
                      href="mailto:support@niceboard.co" 
                      className="text-primary hover:underline focus:underline"
                    >
                      support@niceboard.co
                    </a>
                    .
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;