import type { RiskItem } from '../../types/dashboard';
import { SectionCard } from '../SectionCard';
import styles from '../../App.module.css';
import { getRiskBadgeClassName, getRiskLevelLabel } from './dashboardHelpers';

type RiskSummaryPanelProps = {
  cityName: string;
  risks: RiskItem[];
};

export function RiskSummaryPanel({ cityName, risks }: RiskSummaryPanelProps) {
  return (
    <SectionCard title={`联动风控摘要 - ${cityName}`} subtitle="根据地图焦点城市动态更新">
      <div className={styles.riskList}>
        {risks.map((risk) => (
          <div className={styles.riskItem} key={risk.name}>
            <div>
              <strong>{risk.name}</strong>
              <p>{risk.detail}</p>
            </div>
            <span className={getRiskBadgeClassName(styles, risk.level)}>
              {getRiskLevelLabel(risk.level)}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
