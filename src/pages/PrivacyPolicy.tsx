import { Helmet } from "react-helmet-async";
import { UnifiedHeader } from "@/components/UnifiedHeader";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="Our commitment to privacy and how we use your information." />
        <link rel="canonical" href={`${window.location.origin}/privacy`} />
      </Helmet>
      
      <UnifiedHeader />
      
      <div className="min-h-screen relative" style={{ backgroundColor: '#F8FAFC' }}>
        {/* Subtle vignette glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(80% 40% at 50% 0%, rgba(15,23,42,0.06), transparent 60%)'
          }}
        />
        
        <main className="relative py-18 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[800px]">
            <div 
              className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12"
              style={{
                border: '1px solid rgba(15,23,42,0.06)',
                boxShadow: '0 30px 60px -15px rgba(15,23,42,0.15), 0 0 0 1px rgba(15,23,42,0.02)'
              }}
            >
              <h1 
                className="text-center font-extrabold mb-8"
                style={{
                  fontSize: 'clamp(28px, 5vw, 42px)',
                  fontWeight: '900',
                  color: '#0F172A',
                  letterSpacing: '-0.02em'
                }}
              >
                Privacy Policy
              </h1>
              
              <div className="max-w-none" style={{ fontFamily: 'system-ui, -apple-system, Inter, sans-serif' }}>
                <section className="mb-8">
                  <h2 
                    className="font-bold mb-4"
                    style={{
                      fontSize: 'clamp(18px, 3vw, 22px)',
                      fontWeight: '700',
                      color: '#0F172A',
                      marginTop: '32px',
                      marginBottom: '16px',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Our Commitment To Privacy
                  </h2>
                  <p 
                    className="mb-4"
                    style={{
                      fontSize: 'clamp(16px, 2.5vw, 18px)',
                      lineHeight: '1.65',
                      color: 'rgba(15, 23, 42, 0.87)',
                      marginBottom: '18px'
                    }}
                  >
                    Your privacy is important to us. To better protect your privacy we provide this policy 
                    explaining our online information practices and the choices you can make about the 
                    way your information is collected and used. To make this notice easy to find, we make 
                    it available on our homepage and at every point where personally identifiable 
                    information may be requested.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 
                    className="font-bold mb-4"
                    style={{
                      fontSize: 'clamp(18px, 3vw, 22px)',
                      fontWeight: '700',
                      color: '#0F172A',
                      marginTop: '32px',
                      marginBottom: '16px',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    The Information We Collect
                  </h2>
                  <p 
                    className="mb-4"
                    style={{
                      fontSize: 'clamp(16px, 2.5vw, 18px)',
                      lineHeight: '1.65',
                      color: 'rgba(15, 23, 42, 0.87)',
                      marginBottom: '18px'
                    }}
                  >
                    This policy applies to all information collected or submitted on the Niceboard website. 
                    The types of personal information collected at "Order" and "Contact us" pages are: 
                    Name, Email address, Web site address
                  </p>
                </section>

                <section className="mb-8">
                  <h2 
                    className="font-bold mb-4"
                    style={{
                      fontSize: 'clamp(18px, 3vw, 22px)',
                      fontWeight: '700',
                      color: '#0F172A',
                      marginTop: '32px',
                      marginBottom: '16px',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    How We Use Your Information
                  </h2>
                  <p 
                    className="mb-4"
                    style={{
                      fontSize: 'clamp(16px, 2.5vw, 18px)',
                      lineHeight: '1.65',
                      color: 'rgba(15, 23, 42, 0.87)',
                      marginBottom: '18px'
                    }}
                  >
                    We use the information you provide about yourself when placing an order only to 
                    complete that order. We do not share this information with outside parties except to 
                    the extent necessary to complete that order.
                  </p>
                  <p 
                    className="mb-4"
                    style={{
                      fontSize: 'clamp(16px, 2.5vw, 18px)',
                      lineHeight: '1.65',
                      color: 'rgba(15, 23, 42, 0.87)',
                      marginBottom: '18px'
                    }}
                  >
                    We use return email addresses to answer the email we receive. Such addresses are 
                    not used for any other purpose and are not shared with outside parties.
                  </p>
                  <p 
                    className="mb-4"
                    style={{
                      fontSize: 'clamp(16px, 2.5vw, 18px)',
                      lineHeight: '1.65',
                      color: 'rgba(15, 23, 42, 0.87)',
                      marginBottom: '18px'
                    }}
                  >
                    Finally, we never use or share the personally identifiable information provided to us 
                    online in ways unrelated to the ones described above without also providing you an 
                    opportunity to opt-out or otherwise prohibit such unrelated uses.
                  </p>
                  <p 
                    className="mb-4"
                    style={{
                      fontSize: 'clamp(16px, 2.5vw, 18px)',
                      lineHeight: '1.65',
                      color: 'rgba(15, 23, 42, 0.87)',
                      marginBottom: '18px'
                    }}
                  >
                    We use Google Analytics including advanced features that may collect demographic 
                    information about you if it is present.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 
                    className="font-bold mb-4"
                    style={{
                      fontSize: 'clamp(18px, 3vw, 22px)',
                      fontWeight: '700',
                      color: '#0F172A',
                      marginTop: '32px',
                      marginBottom: '16px',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Contact Us
                  </h2>
                  <p 
                    style={{
                      fontSize: 'clamp(16px, 2.5vw, 18px)',
                      lineHeight: '1.65',
                      color: 'rgba(15, 23, 42, 0.87)'
                    }}
                  >
                    If you have any questions or comments about this Privacy Policy or your personal 
                    information, to make an access or correction request, to exercise any applicable 
                    rights, to make a complaint, or to obtain information about our policies and practices, 
                    our Privacy Officer (or Data Protection Officer) can be reached by mail or email using 
                    the following contact information: by email at{" "}
                    <a 
                      href="mailto:support@niceboard.co" 
                      className="hover:underline focus:underline focus:outline-none"
                      style={{ color: '#111827' }}
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
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;