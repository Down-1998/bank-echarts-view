import CountUp from 'react-countup';
import type { SummaryMetric } from '../types/dashboard';

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
  return (
    <article className="stat-card">
      <div className="stat-title-row">
        <span className="stat-kicker">{getTagLabel(item.tag)}</span>
        <span className={`stat-trend ${item.trend >= 0 ? 'up' : 'down'}`}>
          {item.trend >= 0 ? '+' : ''}
          {item.trend}%
        </span>
      </div>
      <strong className="stat-value">
        <CountUp end={item.value} decimals={item.decimals ?? 0} duration={1.8} />
        {item.unit}
      </strong>
      <p className="stat-label">{item.label}</p>
      <p className="stat-note">{item.note}</p>
    </article>
  );
}
