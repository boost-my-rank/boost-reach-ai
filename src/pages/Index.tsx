import { UnifiedHeader } from "@/components/UnifiedHeader";
import { HeroSection } from "@/components/HeroSection";
import { CompanyLogos } from "@/components/CompanyLogos";
import { BenefitsSection } from "@/components/BenefitsSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { VideoSection } from "@/components/VideoSection";
import { ImpactSection } from "@/components/ImpactSection";
import { WhySEOSection } from "@/components/WhySEOSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
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
        <BenefitsSection />
        <CaseStudiesSection />
        <VideoSection />
        <ImpactSection />
        <WhySEOSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
