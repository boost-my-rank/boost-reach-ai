import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTABanner() {
  return (
    <section className="bg-background">
      <div className="container px-4 py-16">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Ready to boost your SEO rankings?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of businesses already growing their organic traffic with our proven backlink service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link to="/signup">Try it now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://calendar.app.google/xWgL9AeYruybGjgv5" target="_blank" rel="noopener noreferrer">
                  Book a demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}