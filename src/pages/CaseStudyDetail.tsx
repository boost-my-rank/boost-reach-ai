import { useParams, Navigate } from "react-router-dom";
import { UnifiedHeader } from "@/components/UnifiedHeader";
import { Footer } from "@/components/Footer";
import { getCaseStudyBySlug } from "@/data/caseStudies";

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/case-studies" replace />;
  }

  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-blue-300 text-blue-700 text-xs font-semibold">
              Case Study
            </div>
            <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold">
              For Associations
            </div>
            <span className="text-sm text-muted-foreground">
              Last updated: {caseStudy.updatedAt}
            </span>
          </div>

          {/* Title and Subtitle */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
            {caseStudy.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            {caseStudy.subtitle}
          </p>

          {/* Hero Media Card */}
          <div 
            className="rounded-2xl overflow-hidden shadow-md bg-gradient-to-br mb-16 p-8 min-h-[400px] flex items-center justify-between"
            style={{ 
              background: `linear-gradient(135deg, ${caseStudy.accentFrom}, ${caseStudy.accentTo})`
            }}
          >
            {/* Person Image */}
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <img 
                src={caseStudy.heroImage} 
                alt={caseStudy.personName}
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>

            {/* Right Side Content */}
            <div className="text-right text-white">
              <div className="mb-4">
                <div className="text-3xl font-bold mb-2">BoostMyRank</div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-black text-white text-sm font-semibold">
                  CASE STUDY
                </div>
              </div>
              
              {/* Organization Logo/Name */}
              <div className="text-2xl font-bold">{caseStudy.orgName}</div>
            </div>
          </div>

          {/* Summary Callout (Optional) */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Challenge</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {caseStudy.challenge.p1.substring(0, 120)}...
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Solution</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {caseStudy.solution.p1.substring(0, 120)}...
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Impact</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {caseStudy.impact.p1.substring(0, 120)}...
                </p>
              </div>
            </div>
          </div>

          {/* Challenge Section */}
          <section className="mb-16">
            <h2 className="mt-12 mb-6 text-3xl font-extrabold text-gray-900">Challenge</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: caseStudy.challenge.p1 }}></p>
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: caseStudy.challenge.p2 }}></p>
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: caseStudy.challenge.p3 }}></p>
            </div>
            
            <blockquote className="mt-8 mb-12 border-l-4 border-gray-900 pl-6 italic text-xl leading-relaxed text-gray-800 bg-gray-50 py-4 rounded-r-lg">
              "{caseStudy.challenge.quote}"
              {caseStudy.challenge.attribution && (
                <footer className="text-sm text-muted-foreground mt-2 not-italic" dangerouslySetInnerHTML={{ __html: `— ${caseStudy.challenge.attribution}` }}>
                </footer>
              )}
            </blockquote>
          </section>

          {/* Solution Section */}
          <section className="mb-16">
            <h2 className="mt-12 mb-6 text-3xl font-extrabold text-gray-900">Solution</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: caseStudy.solution.p1 }}></p>
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: caseStudy.solution.p2 }}></p>
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: caseStudy.solution.p3 }}></p>
            </div>
            
            <blockquote className="mt-8 mb-12 border-l-4 border-gray-900 pl-6 italic text-xl leading-relaxed text-gray-800 bg-gray-50 py-4 rounded-r-lg">
              "{caseStudy.solution.quote}"
              {caseStudy.solution.attribution && (
                <footer className="text-sm text-muted-foreground mt-2 not-italic" dangerouslySetInnerHTML={{ __html: `— ${caseStudy.solution.attribution}` }}>
                </footer>
              )}
            </blockquote>
          </section>

          {/* Impact Section */}
          <section className="mb-16">
            <h2 className="mt-12 mb-6 text-3xl font-extrabold text-gray-900">Impact</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: caseStudy.impact.p1 }}></p>
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: caseStudy.impact.p2 }}></p>
              <p className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: caseStudy.impact.p3 }}></p>
            </div>
            
            <blockquote className="mt-8 mb-12 border-l-4 border-gray-900 pl-6 italic text-xl leading-relaxed text-gray-800 bg-gray-50 py-4 rounded-r-lg">
              "{caseStudy.impact.quote}"
              {caseStudy.impact.attribution && (
                <footer className="text-sm text-muted-foreground mt-2 not-italic" dangerouslySetInnerHTML={{ __html: `— ${caseStudy.impact.attribution}` }}>
                </footer>
              )}
            </blockquote>
          </section>

          {/* Back to Case Studies */}
          <div className="text-center pt-8 border-t border-gray-200">
            <a 
              href="/case-studies" 
              className="inline-flex items-center text-primary hover:text-primary/80 font-semibold underline decoration-dotted underline-offset-4"
            >
              ← Back to all case studies
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}