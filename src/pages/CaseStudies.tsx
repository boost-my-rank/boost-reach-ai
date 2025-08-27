import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              SUCCESS STORIES
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn about our customers' successes with BoostMyRank.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                to={`/case-studies/${study.slug}`}
                className="group block"
              >
                <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
                  <div className="px-6 py-6">
                    <h2 className="text-xl md:text-2xl font-extrabold leading-tight text-gray-900 line-clamp-3">
                      {study.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}