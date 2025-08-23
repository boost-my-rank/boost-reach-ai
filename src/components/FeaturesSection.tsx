import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Target, 
  PenTool, 
  Send, 
  Shield, 
  FileText,
  ArrowRight 
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Opportunity Sourcing",
    description: "Always-on monitoring of HARO, Featured.com, Help a B2B Writer, and similar sources.",
    badge: "24/7 Monitoring"
  },
  {
    icon: Target,
    title: "Smart Matching",
    description: "We only pitch opportunities aligned with your expertise and ICP.",
    badge: "Targeted"
  },
  {
    icon: PenTool,
    title: "Drafting & Fact-check",
    description: "Expert responses crafted with your voice; human-reviewed.",
    badge: "Quality Assured"
  },
  {
    icon: Send,
    title: "Submission & Follow-ups",
    description: "On-time submissions, polite follow-ups, zero spam tactics.",
    badge: "Professional"
  },
  {
    icon: Shield,
    title: "Quality & Compliance",
    description: "No paid link schemes, no PBNs—strictly earned editorial.",
    badge: "White-hat"
  },
  {
    icon: FileText,
    title: "Reporting",
    description: "URL, anchor, DA, status (pitched/accepted/live), monthly summary + CSV.",
    badge: "Transparent"
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete End-to-End Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From sourcing to submission to reporting—we handle every step of the backlink outreach process.
            </p>
          </div>

          {/* Process Flow */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-4 bg-background p-4 rounded-lg border border-border/50">
              <span className="text-sm font-semibold text-primary">sourcing</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-primary">submission</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-primary">reporting</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background border-border/50"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}