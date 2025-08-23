import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, AlertCircle } from "lucide-react";

export function ImpactSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What to expect over time
            </h2>
            <p className="text-xl text-muted-foreground">
              Understanding the timeline and impact of our backlink service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Average Link DA */}
            <Card className="text-center bg-background border-border/50">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">35–55</h3>
                    <p className="text-sm font-medium text-muted-foreground">Average Link DA</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    High-authority domains that Google values for ranking improvements
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Compounding Results */}
            <Card className="text-center bg-background border-border/50">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">3–6 months</h3>
                    <p className="text-sm font-medium text-muted-foreground">Compounding Timeline</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Measurable lift in referring domains and organic impressions
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Important Note */}
            <Card className="text-center bg-background border-border/50">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-warning" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Important</Badge>
                    <p className="text-sm font-medium text-muted-foreground">Results Disclaimer</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Results vary by site quality, content, and competition level
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Timeline */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-border/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-center mb-8">Expected Impact Timeline</h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-sm font-semibold text-primary mb-2">Week 1-2</div>
                  <p className="text-sm text-muted-foreground">Opportunity sourcing begins</p>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-primary mb-2">Week 3-4</div>
                  <p className="text-sm text-muted-foreground">First links start appearing</p>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-accent mb-2">Month 2-3</div>
                  <p className="text-sm text-muted-foreground">Rankings begin to improve</p>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-accent mb-2">Month 4-6</div>
                  <p className="text-sm text-muted-foreground">Compounding traffic growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}