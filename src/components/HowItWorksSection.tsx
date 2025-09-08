import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, FileText, Link } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Tell us about your business",
    // description: "Brand, topics, boundaries, target pages/anchors.",
    details: "During onboarding, you provide us with your website and bio that journalists will use to credit you. We'll use this to learn about your business, expertise areas, and SEO goals to ensure we target the right journalists."
  },
  {
    number: "02",
    icon: FileText,
    title: "We find opportunities",
    // description: "Only relevant journalist requests get a pitch.",
    details: "Our smart AI + human review team finds journalists looking for article quotes on questions relevant to your business. Once we find an opportunity, we'll draft a pitch and send it to the journalist. If they accept your quote, you get a backlink."
  },
  {
    number: "03",
    icon: Link,
    title: "You get 3 backlinks every month & a report",
    // description: "Live links verified; monthly report sent.",
    details: "Every month we'll make sure you receive a minimum of three backlinks, or your money back. We'll also send you a detailed report of all the backlinks we secured for you, with information about each outlet."
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 bg-background scroll-mt-24">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Our proven AI system consistently delivers 100+ targeted pitches monthly to high-authority publications, resulting in guaranteed 3+ high-authority backlinks per month.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2 z-0" />
                )}

                <Card className="relative z-10 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background border-border/50">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {/* Step Number */}
                      <div className="relative">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.number}
                        </div>
                        <Badge 
                          variant="outline" 
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-background"
                        >
                          <step.icon className="h-3 w-3 mr-1" />
                          Step {index + 1}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm font-medium text-primary">
                        {step.description}
                      </p>

                      {/* Details */}
                      <p className="text-muted-foreground leading-relaxed">
                        {step.details}
                      </p>

                      {/* Check Mark */}
                      <div className="flex justify-center">
                        <CheckCircle className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Expected Impact Timeline */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-border/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Expected Impact Timeline
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Badge variant="outline" className="mb-3">Week 1-2</Badge>
                    <p className="text-sm text-muted-foreground">
                      Onboarding & initial research phase
                    </p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-3">Week 3-4</Badge>
                    <p className="text-sm text-muted-foreground">
                      First pitches sent & initial responses
                    </p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-3">Week 5-6</Badge>
                    <p className="text-sm text-muted-foreground">
                      First backlinks secured & live
                    </p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-3">Week 7-8</Badge>
                    <p className="text-sm text-muted-foreground">
                      Full momentum & consistent results
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}