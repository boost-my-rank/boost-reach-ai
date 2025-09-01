import { ReactNode } from "react";

interface LegalPageProps {
  children: ReactNode;
}

export const LegalPage = ({ children }: LegalPageProps) => {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="bg-card rounded-lg shadow-sm border p-6 sm:p-8 lg:p-12">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};