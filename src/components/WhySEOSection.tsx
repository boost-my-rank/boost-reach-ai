import { Card, CardContent } from "@/components/ui/card";
import { Search, Target, Cog } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "More links from reputable websites increases your organic (free) traffic",
    subtitle: "This is because high-authority websites like Forbes and CNN linking to your page through quotes you provide increases your own authority.",
  },
  {
    icon: Target,
    title: "Every time a customer searches for your services, you rank higher",
    subtitle: "You can spend less on Google keyword ads and rely more on your SEO ranking to convert customers.",
  },
  {
    icon: Cog,
    title: "We source, write, and submit",
    subtitle: "Our service is totally hands-off for you. Tell us what you sell and we'll take care of sourcing relevant opportunities in high-authority websites looking for quotes.",
  },
];

export function WhySEOSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
              Why boost your SEO
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build your domain authority so your website ranks higher in Google results
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background border-border/50"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Main Text */}
                    <h3 className="text-lg font-bold text-foreground leading-tight">
                      {feature.title}
                    </h3>

                    {/* Sub Text */}
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.subtitle}
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