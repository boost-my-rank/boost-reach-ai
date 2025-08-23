import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this paid link building?",
    answer: "No—100% earned media through expert quotes. We help you get featured in publications by providing valuable insights and expertise, not by paying for links. This is completely white-hat and Google-compliant."
  },
  {
    question: "Do you use AI?",
    answer: "Assisted drafting only; every pitch is human-reviewed and fact-checked. We use AI to help craft initial responses, but every submission is carefully reviewed, edited, and approved by our human experts before sending."
  },
  {
    question: "What sites do you target?",
    answer: "Reputable publications, trades, and vetted niche blogs (DA>30). We focus on legitimate media outlets like Forbes, Yahoo, industry publications, and high-authority niche sites that journalists actually use."
  },
  {
    question: "Can I choose topics/anchors?",
    answer: "Yes—set them in your onboarding brief. During setup, we'll work with you to define your expertise areas, preferred topics, target pages, and anchor text preferences to ensure everything aligns with your SEO strategy."
  },
  {
    question: "How fast are results?",
    answer: "First links often land in 7–30 days; SEO impact compounds over 3–6 months. While we can't control journalist timelines, our process typically produces initial backlinks within the first month, with ranking improvements becoming visible over 3-6 months."
  },
  {
    question: "What if a link disappears?",
    answer: "We monitor and aim to replace within the next cycle when appropriate. While editorial links are generally permanent, if a publication removes or changes content, we'll work to secure replacement links as part of your ongoing service."
  },
  {
    question: "Any guarantees?",
    answer: "We guarantee process and volume (3 links/month), not specific outlets. We commit to our methodology and delivering the promised number of quality backlinks, but we cannot guarantee placement in specific publications as this depends on editorial decisions."
  },
  {
    question: "Do you need my input?",
    answer: "Minimal—approve (optional) and share subject-matter context. After the initial onboarding, we handle everything. You can choose to review pitches before submission if desired, but many clients prefer our fully hands-off approach."
  },
];

export function FAQSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our backlink service
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-background hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
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
      </div>
    </section>
  );
}