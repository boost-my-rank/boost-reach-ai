import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Link, TrendingUp } from "lucide-react";

const caseStudies = [
  {
    category: "B2B SaaS",
    vertical: "Cybersecurity",
    timeframe: "60 days",
    links: "6 (DA 40–60)",
    impact: "+18% organic sessions QoQ",
    quote: "Press mentions gave us instant credibility with prospects.",
    metrics: {
      organicTraffic: "+18%",
      domainAuthority: "+12 points",
      backlinks: "6 high-quality"
    }
  },
  {
    category: "E-commerce",
    vertical: "Fashion Tech",
    timeframe: "90 days",
    links: "9 (DA 35–55)",
    impact: "+32% organic revenue",
    quote: "The ROI was clear within the first quarter—we're scaling up.",
    metrics: {
      organicTraffic: "+45%",
      domainAuthority: "+8 points",
      backlinks: "9 high-quality"
    }
  },
  {
    category: "Professional Services",
    vertical: "Marketing Agency",
    timeframe: "45 days",
    links: "4 (DA 42–58)",
    impact: "+24% qualified leads",
    quote: "Being quoted in industry publications transformed our authority.",
    metrics: {
      organicTraffic: "+28%",
      domainAuthority: "+6 points",
      backlinks: "4 high-quality"
    }
  },
];

export function CaseStudiesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
            Success Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Read success stories from current customers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how businesses like yours are growing their organic traffic and authority with our backlink service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {caseStudies.map((study, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-background border-border/50"
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-medium">
                      {study.category}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Vertical */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {study.vertical}
                    </h3>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">{study.timeframe}</span>
                      <span className="mx-2">•</span>
                      <Link className="h-4 w-4 mr-1" />
                      <span>Links: {study.links}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 mr-2 text-accent" />
                      <span className="font-semibold text-accent">Impact: {study.impact}</span>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm italic text-foreground leading-relaxed border-l-3 border-primary pl-4">
                    "{study.quote}"
                  </blockquote>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{study.metrics.organicTraffic}</div>
                      <div className="text-xs text-muted-foreground">Traffic</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{study.metrics.domainAuthority}</div>
                      <div className="text-xs text-muted-foreground">DA Boost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{study.metrics.backlinks}</div>
                      <div className="text-xs text-muted-foreground">Links</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            See more stories
          </Button>
        </div>
      </div>
    </section>
  );
}