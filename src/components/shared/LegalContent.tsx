import { ReactNode } from "react";

interface LegalContentProps {
  title: string;
  children: ReactNode;
}

interface LegalHeadingProps {
  children: ReactNode;
}

interface LegalParagraphProps {
  children: ReactNode;
}

interface LegalSectionProps {
  children: ReactNode;
}

export const LegalContent = ({ title, children }: LegalContentProps) => {
  return (
    <>
      <h1 
        className="text-center font-extrabold mb-8"
        style={{
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: '900',
          color: '#0F172A',
          letterSpacing: '-0.02em'
        }}
      >
        {title}
      </h1>
      
      <div className="max-w-none" style={{ fontFamily: 'system-ui, -apple-system, Inter, sans-serif' }}>
        {children}
      </div>
    </>
  );
};

export const LegalHeading = ({ children }: LegalHeadingProps) => {
  return (
    <h2 
      className="font-bold mb-4"
      style={{
        fontSize: 'clamp(18px, 3vw, 22px)',
        fontWeight: '700',
        color: '#0F172A',
        marginTop: '32px',
        marginBottom: '16px',
        letterSpacing: '-0.01em'
      }}
    >
      {children}
    </h2>
  );
};

export const LegalParagraph = ({ children }: LegalParagraphProps) => {
  return (
    <p 
      className="mb-4"
      style={{
        fontSize: 'clamp(16px, 2.5vw, 18px)',
        lineHeight: '1.65',
        color: 'rgba(15, 23, 42, 0.87)',
        marginBottom: '18px'
      }}
    >
      {children}
    </p>
  );
};

export const LegalSection = ({ children }: LegalSectionProps) => {
  return (
    <section className="mb-8">
      {children}
    </section>
  );
};