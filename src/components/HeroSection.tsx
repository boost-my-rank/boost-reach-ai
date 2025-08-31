import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-bg.jpg";

const testimonialLogos = [
  { name: "Capterra", rating: "4.9/5", icon: Star },
  { name: "G2", rating: "4.8/5", icon: Award },
  { name: "Trustpilot", rating: "4.9/5", icon: Users },
  { name: "Software Advice", rating: "4.9/5", icon: TrendingUp },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light',
          opacity: 0.1
        }}
      />
      
      <div className="container relative px-4 py-16 md:py-24">
        {/* Hero Button */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold text-sm">
              Meet AI-powered backlink generation
            </span>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Triple SEO Traffic with{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Outreach Backlinks
              </span>{" "}
              on Autopilot
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Receive 3+ backlinks every month from vetted online publications (Forbes, Newsweek, CNN) that mention your product or service. If we miss, we offer a guaranteed refund.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="cta" size="lg" className="min-w-[200px]" asChild>
              <Link to="/signup">Try it now</Link>
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              See case studies
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Results in 7–30 days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}