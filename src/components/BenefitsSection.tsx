import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Award } from "lucide-react";

const benefits = [
  {
    icon: Users,
    audience: "For Marketing & Founders",
    title: "Become a cited expert in reputable publications",
    description: "Build thought leadership and personal brand recognition through expert quotes in high-authority media outlets.",
    badge: "Authority Building",
    badgeVariant: "default" as const,
  },
  {
    icon: TrendingUp,
    audience: "For SEO Teams",
    title: "Earn DA30+ editorial links that actually move rankings",
    description: "Get legitimate, white-hat backlinks from domain authorities above 30 that Google values and rewards in rankings.",
    badge: "SEO Impact",
    badgeVariant: "secondary" as const,
  },
  {
    icon: Award,
    audience: "For the Brand",
    title: "Build trust with quotable press mentions and a growing \"As Seen In\" wall",
    description: "Create social proof and credibility with potential customers through verified media coverage and press mentions.",
    badge: "Brand Trust",
    badgeVariant: "outline" as const,
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benefits That Drive Real Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our service delivers value across your entire organization, from marketing to SEO to brand development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant={benefit.badgeVariant}>
                      {benefit.badge}
                    </Badge>
                  </div>

                  {/* Audience */}
                  <div>
                    <p className="text-sm font-semibold text-primary mb-2">
                      {benefit.audience}
                    </p>
                    <h3 className="text-xl font-bold text-foreground leading-tight">
                      {benefit.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}