import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    "Benchmark \"safe\" anchor-text distributions by industry to avoid penalties.",
    "Learn DA/DR realities: which metrics matter and how to prioritize targets.",
    "See proven outreach frameworks that convert (HARO/Featured/queries that win).",
    "Plan link velocity the right way: how fast to ramp without risking spam flags.",
    "Get an on-page + link-building checklist for new pages vs. aged content.",
    "Read mini case studies showing traffic impact from 3 quality links/month.",
    "Use our monthly reporting template to communicate ROI internally.",
  ];

  return (
    <div className="min-h-screen bg-app-canvas">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                  SEO in 2025: Advice to grow your organic traffic using proven link-building strategies
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A complete report to help you grow your organic SEO traffic using link-building strategies that responsibly increase your domain reputation.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
                  How can this report help you stand out from the competition?
                </h2>
                
                <div className="space-y-4">
                  {benefitItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-warning-foreground" />
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-card border border-card-border rounded-xl shadow-sm p-6 md:p-8">
                {!isSubmitted ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">
                        Fill out this form to get the 2025 SEO guide
                      </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-card-foreground">
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
                          <Label htmlFor="lastName" className="text-sm font-medium text-card-foreground">
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
                        <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
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
                        <Label htmlFor="company" className="text-sm font-medium text-card-foreground">
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
                        className="w-full bg-warning text-warning-foreground hover:bg-warning/90 font-semibold py-3"
                      >
                        {isSubmitting ? "Sending..." : "Download now"}
                      </Button>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        By submitting, you agree to receive the report and occasional product updates. You can unsubscribe at any time.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      Thanks! Your report is on its way.
                    </h3>
                    <p className="text-muted-foreground">
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
      </div>
    </div>
  );
};

export default SEOReport;