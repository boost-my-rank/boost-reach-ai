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
      
      <section className="py-16 bg-background border-t">
        <div className="container px-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                Contact Support
              </Button>
              <Button variant="cta">
                Book a Demo Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}