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
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            Boosting SEO rankings of dozens of leading companies:
          </h3>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mx-auto max-w-5xl">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {clientLogos.map((company, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className="w-16 h-8 bg-muted rounded flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {company.placeholder}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Publications Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            Seen in / Opportunities from
          </h3>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {publicationLogos.map((publication) => (
                <div key={publication.name} className="flex items-center gap-3">
                  <span className="text-2xl">{publication.logo}</span>
                  <span className="font-semibold text-foreground">{publication.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}