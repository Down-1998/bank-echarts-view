import type { PropsWithChildren } from 'react';
import styles from './SectionCard.module.css';

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
    <section className={`${styles.card} ${className}`.trim()}>
      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <span className={styles.accent} />
      </div>
      {children}
    </section>
  );
}
