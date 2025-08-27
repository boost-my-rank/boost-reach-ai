import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const plans = {
  standard: {
    monthly: 249,
    features: [
      "3 guaranteed backlinks per month — or your money back",
      "Unlimited pitch submissions (until backlink goal achieved)",
      "Only DA 30+ websites pitched",
      "Monthly report with backlink submissions"
    ]
  },
  agency: {
    monthly: 999,
    startingFrom: true,
    features: [
      "5 client accounts included",
      "Unlimited pitch submissions until targets achieved",
      "Weekly reports with pitch submissions & backlinks achieved",
      "White-label client reports (PDF & share link)",
      "Multi-seat team access (5 seats)",
      "Centralized billing & consolidated invoices",
      "Dedicated account manager & priority support (SLA)",
      "Onboarding & strategy review"
    ]
  }
};

const faqItems = [
  {
    question: "How does it work?",
    answer: "We research and pitch journalists who cover your industry, securing editorial backlinks from high-authority publications. Our team handles everything from opportunity sourcing to follow-ups."
  },
  {
    question: "How long will it take to see results?",
    answer: "Most clients see their first backlinks within 7-30 days. We guarantee 3 backlinks per month or provide a full refund."
  },
  {
    question: "What if you don't hit the guaranteed number of backlinks?",
    answer: "We offer a 100% money-back guarantee. If we don't deliver the promised number of backlinks in any given month, you get a full refund for that month."
  },
  {
    question: "Can you work with any industry?",
    answer: "Yes, we work across all industries. Our team has experience pitching journalists in tech, healthcare, finance, e-commerce, and many other sectors."
  },
  {
    question: "Do you only target high-authority websites?",
    answer: "Yes, we only pitch websites with a Domain Authority (DA) of 30 or higher to ensure your backlinks provide real SEO value."
  },
  {
    question: "How do you measure success?",
    answer: "Success is measured by the number and quality of backlinks secured. We provide detailed monthly reports showing all submissions, responses, and secured placements."
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const getPrice = (monthlyPrice: number) => {
    if (billingCycle === 'annual') {
      return Math.round(monthlyPrice * 0.8);
    }
    return monthlyPrice;
  };

  const getPriceText = (monthlyPrice: number, startingFrom = false) => {
    const price = getPrice(monthlyPrice);
    const prefix = startingFrom ? "Starting at " : "";
    const suffix = billingCycle === 'annual' ? " / mo" : " / mo";
    return `${prefix}$${price}${suffix}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        {/* Header Section */}
        <div className="container px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                PLANS
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
                Grow with us
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Build your SEO authority at your own pace and upgrade as you grow.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="mt-12 flex items-center justify-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="billing"
                  value="annual"
                  checked={billingCycle === 'annual'}
                  onChange={(e) => setBillingCycle(e.target.value as 'annual')}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="flex items-center gap-2 text-foreground font-medium">
                  Billed Annually
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-2 py-0.5">
                    SAVE 20%
                  </Badge>
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="billing"
                  value="monthly"
                  checked={billingCycle === 'monthly'}
                  onChange={(e) => setBillingCycle(e.target.value as 'monthly')}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="text-foreground font-medium">Billed Monthly</span>
              </label>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Standard Plan */}
              <div className="space-y-0">
                <div className="bg-gray-100 text-gray-600 text-sm font-medium px-6 py-2 rounded-t-xl">
                  Self-serve
                </div>
                <Card className="rounded-t-none border-t-0 shadow-md">
                  <CardHeader className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-extrabold text-foreground mb-2">Standard</h3>
                      <div className="text-4xl font-extrabold text-foreground">
                        {getPriceText(plans.standard.monthly)}
                        {billingCycle === 'annual' && (
                          <span className="text-lg text-muted-foreground font-normal ml-2">
                            billed annually
                          </span>
                        )}
                      </div>
                    </div>
                    <hr className="border-gray-200" />
                    <Badge variant="outline" className="w-fit text-xs text-muted-foreground border-gray-300">
                      All core features, including:
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {plans.standard.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="p-1 rounded-full bg-yellow-400 flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-black" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 pt-4">
                      <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                        <Link to="/signup">Get started</Link>
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Cancel anytime. No hidden fees.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Agency Plan */}
              <div className="space-y-0">
                <div className="bg-yellow-50 text-yellow-800 text-sm font-medium px-6 py-2 rounded-t-xl">
                  Managed
                </div>
                <Card className="rounded-t-none border-t-0 shadow-md">
                  <CardHeader className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-extrabold text-foreground mb-2">Agency</h3>
                      <div className="text-4xl font-extrabold text-foreground">
                        {getPriceText(plans.agency.monthly, plans.agency.startingFrom)}
                        {billingCycle === 'annual' && (
                          <span className="text-lg text-muted-foreground font-normal ml-2">
                            billed annually
                          </span>
                        )}
                      </div>
                    </div>
                    <hr className="border-gray-200" />
                    <Badge variant="outline" className="w-fit text-xs text-muted-foreground border-gray-300">
                      All Standard features, plus:
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {plans.agency.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="p-1 rounded-full bg-yellow-400 flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-black" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full font-semibold">
                        Contact sales »
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
                Q&A
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Frequently asked questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-0">
              {faqItems.map((item, index) => (
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
      </main>
      <Footer />
    </div>
  );
}