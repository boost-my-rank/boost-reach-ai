import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingStyleFAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}

export function PricingStyleFAQ({ 
  items, 
  title = "Frequently asked questions",
  subtitle = "Got questions? We've got answers.",
  eyebrow = "Q&A"
}: PricingStyleFAQProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
              {eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-0">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="py-6 text-left hover:no-underline group">
                  <div className="flex items-center gap-4 w-full">
                    <div className="p-1 rounded-full bg-yellow-400 flex-shrink-0">
                      <ChevronDown className="h-4 w-4 text-black transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-12">
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}