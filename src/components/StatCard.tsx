import CountUp from 'react-countup';
import type { SummaryMetric } from '../types/dashboard';
import styles from './StatCard.module.css';

type StatCardProps = {
  item: SummaryMetric;
};

function getTagLabel(tag: string) {
  const mapping: Record<string, string> = {
    Clearing: '清算',
    Liquidity: '流动性',
    Processing: '处理',
    Compliance: '合规',
  };

  return mapping[tag] ?? tag;
}

export function StatCard({ item }: StatCardProps) {
  const trendClassName = item.trend >= 0 ? styles.up : styles.down;

  return (
    <article className={styles.card}>
      <div className={styles.titleRow}>
        <span className={styles.kicker}>{getTagLabel(item.tag)}</span>
        <span className={`${styles.trend} ${trendClassName}`}>
          {item.trend >= 0 ? '+' : ''}
          {item.trend}%
        </span>
      </div>
      <strong className={styles.value}>
        <CountUp end={item.value} decimals={item.decimals ?? 0} duration={1.8} />
        {item.unit}
      </strong>
      <p className={styles.label}>{item.label}</p>
      <p className={styles.note}>{item.note}</p>
    </article>
  );
}
