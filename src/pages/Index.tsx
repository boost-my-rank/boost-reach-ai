import { UnifiedHeader } from "@/components/UnifiedHeader";
import { HeroSection } from "@/components/HeroSection";
import { CompanyLogos } from "@/components/CompanyLogos";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { VideoSection } from "@/components/VideoSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <UnifiedHeader />
      <main>
        <HeroSection />
        <CompanyLogos />
        <HowItWorksSection />
        <VideoSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
