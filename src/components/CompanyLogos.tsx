import { Card } from "@/components/ui/card";

// Placeholder for company logos - these can be updated later
const clientLogos = [
  { name: "Company 1", placeholder: "C1" },
  { name: "Company 2", placeholder: "C2" },
  { name: "Company 3", placeholder: "C3" },
  { name: "Company 4", placeholder: "C4" },
  { name: "Company 5", placeholder: "C5" },
  { name: "Company 6", placeholder: "C6" },
  { name: "Company 7", placeholder: "C7" },
  { name: "Company 8", placeholder: "C8" },
];

const publicationLogos = [
  { name: "Forbes", logo: "📰" },
  { name: "Yahoo", logo: "🌐" },
  { name: "CIO", logo: "💼" },
  { name: "The Digital Project Manager", logo: "⚡" },
];

export function CompanyLogos() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        {/* Client Logos Section */}
        <div className="text-center mb-12">
          <p className="text-lg font-medium text-muted-foreground mb-8">
            Boosting SEO rankings of dozens of leading companies:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {clientLogos.map((company, index) => (
              <Card 
                key={index} 
                className="p-6 bg-background hover:shadow-md transition-shadow duration-200 border-border/50"
              >
                <div className="flex items-center justify-center h-12">
                  {/* Placeholder for logo - can be replaced with actual images */}
                  <div className="w-16 h-8 bg-muted rounded flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {company.placeholder}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Publications Section */}
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground mb-8">
            Seen in / Opportunities from
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {publicationLogos.map((publication) => (
              <div 
                key={publication.name}
                className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border/50 hover:shadow-md transition-shadow duration-200"
              >
                <span className="text-2xl">{publication.logo}</span>
                <span className="font-semibold text-foreground">{publication.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}