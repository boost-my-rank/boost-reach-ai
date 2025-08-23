import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, Link, FileText, Target, Plus } from "lucide-react";

const features = [
  { icon: Link, text: "3 editorial backlinks (DA > 30)" },
  { icon: Target, text: "Opportunity sourcing & drafting included" },
  { icon: FileText, text: "Submission, follow-ups, and monthly reporting" },
];

const addOns = [
  { icon: Plus, text: "Extra links" },
  { icon: Plus, text: "Higher DA tiers (e.g., DA>50)" },
  { icon: Plus, text: "Industry-exclusive targeting" },
];

export function PricingSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              One plan that delivers everything you need to boost your SEO
            </p>
          </div>

          {/* Main Pricing Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="relative overflow-hidden bg-background border-2 border-primary/20 shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
              
              <CardHeader className="text-center pb-6">
                <div className="space-y-2">
                  <Badge variant="outline" className="mx-auto">
                    Most Popular
                  </Badge>
                  <CardTitle className="text-2xl">Standard Plan</CardTitle>
                  <div className="text-5xl font-bold text-foreground">
                    $300
                    <span className="text-xl text-muted-foreground font-normal"> / month</span>
                  </div>
                  <p className="text-muted-foreground">
                    Everything you need to start building authority
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Core Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">What's included:</h4>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="p-1 rounded-full bg-accent/10">
                          <Check className="h-4 w-4 text-accent" />
                        </div>
                        <feature.icon className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Add-ons (optional):</h4>
                  <div className="space-y-3">
                    {addOns.map((addon, index) => (
                      <div key={index} className="flex items-center space-x-3 text-muted-foreground">
                        <addon.icon className="h-4 w-4" />
                        <span>{addon.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4 pt-6">
                  <Button variant="cta" size="lg" className="w-full">
                    Start free trial
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Book a demo
                  </Button>
                </div>

                {/* Transparency Note */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Transparency note:</span> Editorial placements depend on journalist selection. 
                      We pitch enough qualified opportunities to reliably hit 3 links/month.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>Results in 7-30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}