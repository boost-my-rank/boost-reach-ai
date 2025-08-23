import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "We stopped chasing cold links—now the press comes to us.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Solutions",
    rating: 5
  },
  {
    quote: "Three legit DA40+ links a month changed our authority curve.",
    author: "Michael Rodriguez",
    role: "SEO Manager",
    company: "GrowthCorp",
    rating: 5
  },
  {
    quote: "Hands-off and transparent reporting—perfect for a lean team.",
    author: "Emily Thompson",
    role: "Founder",
    company: "StartupLaunch",
    rating: 5
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Short, outcome-focused quotes from real customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background border-border/50"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Rating Stars */}
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg font-medium text-foreground leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="border-t border-border pt-4">
                      <div className="text-sm">
                        <div className="font-semibold text-foreground">{testimonial.author}</div>
                        <div className="text-muted-foreground">{testimonial.role}</div>
                        <div className="text-primary font-medium">{testimonial.company}</div>
                      </div>
                    </div>
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