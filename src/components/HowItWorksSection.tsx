import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, FileText, Link } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Onboarding Brief",
    description: "Brand, topics, boundaries, target pages/anchors.",
    details: "We learn about your business, expertise areas, and SEO goals to ensure perfect alignment."
  },
  {
    number: "02",
    icon: FileText,
    title: "We Scan & Select",
    description: "Only relevant journalist requests get a pitch.",
    details: "Our team monitors multiple sources and filters opportunities that match your industry and expertise."
  },
  {
    number: "03",
    icon: Link,
    title: "You Get Links & Proof",
    description: "Live links verified; monthly report sent.",
    details: "Receive detailed reports with live backlinks, DA scores, and traffic impact measurements."
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
              A simple, scannable flow that delivers results on autopilot
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

          {/* Process Summary */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-border/50">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold mb-4">
                  The entire process is hands-off for you
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Once onboarded, our team handles everything from opportunity identification to content creation 
                  and submission. You'll receive regular reports showing your new backlinks and their impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}