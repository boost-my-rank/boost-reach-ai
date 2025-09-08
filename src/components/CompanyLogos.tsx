// Placeholder for company logos - these can be updated later
const clientLogos = [
  { name: "Company 1", logo: "/client1.png", isImage: true },
  { name: "Company 2", logo: "/client2.png", isImage: true },
  { name: "Company 3", logo: "/client3.png", isImage: true },
  { name: "Company 4", logo: "/client4.png", isImage: true },
  { name: "Company 5", logo: "/client5.png", isImage: true },
  { name: "Company 6", logo: "/client6.png", isImage: true },
  { name: "Company 7", logo: "/client7.png", isImage: true },
  { name: "Company 8", logo: "/client8.png", isImage: true },
];

const publicationLogos = [
  { name: "", logo: "/forbes_logo.png", isImage: true },
  { name: "", logo: "/cnn.png", isImage: true },
  { name: "", logo: "/newsweek.png", isImage: true },
  { name: "", logo: "/healthline.png", isImage: true },
];

export function CompanyLogos() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        {/* Client Logos Section - Commented out for now */}
        {/* <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            Boosting SEO rankings of dozens of leading companies:
          </h3>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mx-auto max-w-5xl">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {clientLogos.map((company, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Publications Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            As Seen In:
          </h3>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {publicationLogos.map((publication) => (
                <div key={publication.name} className="flex items-center gap-3">
                  {publication.isImage ? (
                    <img 
                      src={publication.logo} 
                      alt={`${publication.name} logo`}
                      className="h-8 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-2xl">{publication.logo}</span>
                  )}
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