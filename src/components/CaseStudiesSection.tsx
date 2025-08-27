import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";

export function CaseStudiesSection() {
  // Get top 3 case studies
  const topCaseStudies = caseStudies.slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              SUCCESS STORIES
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Case Studies
            </h2>
            <p className="text-xl text-muted-foreground">
              Learn about our customers' successes with BoostMyRank
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCaseStudies.map((study) => (
              <Link
                key={study.slug}
                to={`/case-studies/${study.slug}`}
                className="group block"
              >
                <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-background border-border/50">
                  {/* Hero Image Area */}
                  <div 
                    className="aspect-[16/9] relative bg-gradient-to-br p-6 flex items-center justify-between"
                    style={{ 
                      background: `linear-gradient(135deg, ${study.accentFrom}, ${study.accentTo})`
                    }}
                  >
                    {/* Person Image */}
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <img 
                        src={study.heroImage} 
                        alt={study.personName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>

                    {/* Top Right Area - Logo and Case Study Pill */}
                    <div className="flex flex-col items-end space-y-3">
                      {/* Partner Logo */}
                      {study.partnerLogo && (
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <img 
                            src={study.partnerLogo} 
                            alt={study.orgName}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      )}
                      
                      {/* BoostMyRank + Case Study Pill */}
                      <div className="text-right">
                        <div className="text-white font-bold text-lg mb-1">BoostMyRank</div>
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-black text-white text-xs font-semibold">
                          CASE STUDY
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <CardContent className="px-6 py-6">
                    <h3 className="text-lg md:text-xl font-bold leading-tight text-foreground line-clamp-3 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/case-studies">
                <ArrowRight className="h-4 w-4 mr-2" />
                See more stories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}