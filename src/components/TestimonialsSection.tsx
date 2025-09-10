import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";


const testimonials = [
  {
    quote: "BoostMyRank got us featured in ten highly reputable publications in only two months. By month three our domain authority was up 15 points. If you're tired of spending tens of hours reaching out to publications to get featured, I recommend BoostMyRank.",
    author: "Aidan Mattrick",
    role: "CEO",
    company: "VoiceValet",
    avatar: "/aidan_avatar.webp",
    rating: 5
  },
  {
    quote: "BoostMyRank generated us around thirty authoritative backlinks, which boosted our domain rating from 3 to 19 and our organic traffic by 300% in six months. Their team was super responsive to our questions and easy to work with. I highly recommend them.",
    author: "PJ Jhaveri",
    role: "Founder",
    company: "Loch Digital",
    avatar: "/pjavatar.jpeg",
    rating: 5
  },
  {
    quote: "We were trying to get featured in high-authority publications, but the process was slow and we often weren't fast enough in responding within six hours. BoostMyRank helped us do that with no work on our part and within a month we started showing up in top news sites. It was the growth boost we were missing.",
    author: "Quentin Thomassin",
    role: "Founder",
    company: "QT Marketing",
    avatar: "/quentin_avatar.png",
    rating: 5
  },
  {
    quote: "Our brand stands at the intersection of innovation and media, so credibility is everything. BoostMyRank helped us secure media coverage that aligned with our mission and accelerated our visibility without draining our team. I recommend it to anyone looking to grow their brand.",
    author: "Lin Yang",
    role: "Founder",
    company: "The Innovators Club",
    avatar: "/linyang_avatar.jpeg",
    rating: 5
  }
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

          <div className="relative mx-8">
            <Card className="bg-background border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header - Avatar + Name/Title */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img 
                        src={currentTestimonial.avatar} 
                        alt={`Photo of ${currentTestimonial.author}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-foreground text-lg">{currentTestimonial.author}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </div>
                      {/* Rating Stars */}
                      <div className="flex space-x-1 mt-3">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote - Centered */}
                  <div className="pt-4">
                    <blockquote className="text-lg font-medium text-foreground leading-relaxed text-center">
                      {currentTestimonial.quote}
                    </blockquote>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons - Positioned outside content area */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm hover:bg-background"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm hover:bg-background"
              aria-label="Next testimonial"
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