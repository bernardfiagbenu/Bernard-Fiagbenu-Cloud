import React from 'react';

interface SectionContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ title, subtitle, children }) => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">{title}</h2>
        {subtitle && <p className="text-lg text-muted-foreground font-body">{subtitle}</p>}
        <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
      </div>
      {children}
    </section>
  );
};

export default SectionContainer;
