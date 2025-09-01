import { ReactNode } from "react";

interface LegalPageLayoutProps {
  children: ReactNode;
}

export const LegalPageLayout = ({ children }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Subtle vignette glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(80% 40% at 50% 0%, rgba(15,23,42,0.06), transparent 60%)'
        }}
      />
      
      <main className="relative py-18 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[800px]">
          <div 
            className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12"
            style={{
              border: '1px solid rgba(15,23,42,0.06)',
              boxShadow: '0 30px 60px -15px rgba(15,23,42,0.15), 0 0 0 1px rgba(15,23,42,0.02)'
            }}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};