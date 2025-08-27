import { Button } from "@/components/ui/button";
import { PricingStyleFAQ } from "@/components/shared/PricingStyleFAQ";
import { faqItems } from "@/data/faqData";

export function FAQSection() {
  return (
    <>
      <PricingStyleFAQ 
        items={faqItems}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our backlink service"
      />
      
    </>
  );
}