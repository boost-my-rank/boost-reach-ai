import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Volume2 } from "lucide-react";

export function VideoSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Live Demo
            </h2>
            <p className="text-xl text-muted-foreground">
              Watch our demo of our backlink outreach in action
            </p>
          </div>

          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20">
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="mx-auto w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                      <Play className="h-8 w-8 text-primary ml-1 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        Live Demo: From Opportunity to Backlink
                      </h3>
                      <p className="text-muted-foreground">
                        See how we source, write, and submit on your behalf
                      </p>
                    </div>
                  </div>
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-white">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm">HD Quality</span>
                  </div>
                  <div className="text-white text-sm">
                    4:32 min
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Schedule a live demo call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}