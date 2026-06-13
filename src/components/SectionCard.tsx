import type { PropsWithChildren } from 'react';

type SectionCardProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  className?: string;
}>;

export function SectionCard({
  title,
  subtitle,
  className = '',
  children,
}: SectionCardProps) {
  return (
    <section className={`section-card ${className}`.trim()}>
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <span className="section-accent" />
      </div>
      {children}
    </section>
  );
}
