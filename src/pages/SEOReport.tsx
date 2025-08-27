import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import reportMockup from "@/assets/seo-report-mockup.jpg";

const SEOReport = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmCampaign = urlParams.get('utm_campaign');

      const { error } = await supabase
        .from('leads')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          company: formData.company,
          source: '2025-report',
          utm_source: utmSource,
          utm_campaign: utmCampaign,
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your report is on its way to your inbox.",
      });

      // Fire analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'report_lead_submit', {
          event_category: 'lead_generation',
          event_label: '2025-seo-report'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefitItems = [
    "Understand the 2025 link-signal landscape and what Google is rewarding now.",
    "Learn DA/DR realities: which metrics matter and how to prioritize targets.",
    "See proven outreach frameworks that convert (HARO/Featured/queries that win).",
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <Header />
      <main className="pt-8">
        <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Four-quadrant grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto_auto] lg:grid-rows-2 gap-6 lg:gap-y-6 lg:gap-x-10">
            
            {/* Top-left: Hero title + subhead */}
            <div className="order-1 space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                SEO in 2025. How to grow your traffic using using proven link building strategies
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Download the free report to help you grow your SEO traffic and increase your domain reputation.
              </p>
            </div>

            {/* Top-right: Report image/visual */}
            <div className="order-2 flex items-center justify-center">
              <div className="relative max-h-[320px] md:max-h-[360px]">
                <div className="bg-gradient-to-br from-[#F6C343]/30 to-[#F59E0B]/10 rounded-2xl shadow-md overflow-hidden p-8">
                  <img 
                    src={reportMockup}
                    alt="Free 2025 SEO Backlink Report preview showing charts and insights for organic traffic growth"
                    className="w-full h-auto rounded-lg shadow-sm aspect-[4/3] object-contain"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      FREE REPORT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Separator line */}
            <div className="order-2.5 lg:col-span-2">
              <div className="border-t border-gray-200 my-6 lg:my-8"></div>
            </div>

            {/* Bottom-left: Benefits list */}
            <div className="order-3 space-y-6 mt-0">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                How can this report help you stand out from the competition?
              </h2>
              
              <div className="space-y-4">
                {benefitItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 bg-[#F6C343] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-gray-900" />
                      </div>
                    </div>
                    <p className="text-gray-900 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-right: Form card */}
            <div className="order-4 lg:self-start">
              <div className="bg-white border border-[#E6E8EE] rounded-xl shadow-sm p-6 md:p-8">
                {!isSubmitted ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Fill out this form to get the 2025 SEO guide
                      </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-900">
                            First name*
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                            className="w-full"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-900">
                            Last name*
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                            className="w-full"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                          Email*
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="w-full"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-medium text-gray-900">
                          Company
                        </Label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full"
                          placeholder="Acme Inc."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#F6C343] hover:bg-[#E0AE2E] text-gray-900 font-semibold py-3 rounded-md"
                      >
                        {isSubmitting ? "Sending..." : "Download now"}
                      </Button>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        By submitting, you agree to receive the report and occasional product updates. You can unsubscribe at any time.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-[#F6C343] rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Thanks! Your report is on its way.
                    </h3>
                    <p className="text-gray-600">
                      Check your inbox for the SEO 2025 report. A copy should arrive within the next few minutes.
                    </p>
                    <Button
                      onClick={() => window.open('/placeholder-seo-report-2025.pdf', '_blank')}
                      variant="outline"
                      className="w-full"
                    >
                      Download PDF
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SEOReport;