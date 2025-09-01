import { ReactNode } from "react";

interface LegalContentProps {
  title: string;
  children: ReactNode;
}

export const LegalContent = ({ title, children }: LegalContentProps) => {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
        {title}
      </h1>
      
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </>
  );
};

export const LegalSection = ({ children }: { children: ReactNode }) => {
  return <section className="mb-8">{children}</section>;
};

export const LegalHeading = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-xl font-bold text-foreground mb-4">{children}</h2>;
};

export const LegalParagraph = ({ children }: { children: ReactNode }) => {
  return <p className="text-lg leading-relaxed text-muted-foreground mb-6">{children}</p>;
};

export const LegalParagraphLast = ({ children }: { children: ReactNode }) => {
  return <p className="text-lg leading-relaxed text-muted-foreground">{children}</p>;
};