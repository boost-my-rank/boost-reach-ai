import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Backlinker AI has generated over 70+ dofollow backlinks for my site that are relevant + authoritative within 6 months. My Domain Rating (DR) went from 0 to 15. Notable links include College Recruiter, GoBankingRates, Marketer Interview, HR.com, HubSpot and Fiverr.",
    author: "Ryan Hawker",
    role: "Owner",
    company: "ThriveOneFive Media",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    quote: "We stopped chasing cold links—now the press comes to us.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Solutions",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    quote: "Three legit DA40+ links a month changed our authority curve.",
    author: "Michael Rodriguez",
    role: "SEO Manager",
    company: "GrowthCorp",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    quote: "Hands-off and transparent reporting—perfect for a lean team.",
    author: "Emily Thompson",
    role: "Founder",
    company: "StartupLaunch",
    avatar: "/placeholder.svg",
    rating: 5
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from businesses that have transformed their SEO strategy with our AI-powered backlink service. <span className="font-semibold text-foreground">Real results, real growth.</span>
            </p>
          </div>

          <div className="relative">
            <Card className="bg-background border-border/50 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-8">
                  {/* Quote */}
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl text-muted-foreground/20 mb-4">"</div>
                    <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed max-w-3xl mx-auto">
                      {currentTestimonial.quote}
                    </blockquote>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex justify-center space-x-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <img 
                        src={currentTestimonial.avatar} 
                        alt={currentTestimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground text-lg">{currentTestimonial.author}</div>
                      <div className="text-muted-foreground">{currentTestimonial.role}</div>
                      <div className="text-primary font-medium">{currentTestimonial.company}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}