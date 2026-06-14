import type { AlertItem } from '../../types/dashboard';
import { SectionCard } from '../SectionCard';
import styles from '../../App.module.css';
import { getAlertLevelClassName, getRiskLevelLabel } from './dashboardHelpers';

type AlertsPanelProps = {
  cityName: string;
  alerts: AlertItem[];
};

export function AlertsPanel({ cityName, alerts }: AlertsPanelProps) {
  return (
    <SectionCard title={`实时预警播报 - ${cityName}`} subtitle="交易监测与异常提示队列">
      <div className={styles.alertMarquee}>
        <div className={styles.alertTrack}>
          {[...alerts, ...alerts].map((alert, index) => (
            <div className={styles.alertChip} key={`${alert.id}-${index}`}>
              <span className={getAlertLevelClassName(styles, alert.level)}>
                {getRiskLevelLabel(alert.level)}
              </span>
              <strong>{alert.branch}</strong>
              <p>{alert.title}</p>
              <time>{alert.time}</time>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.alertFeed}>
        {alerts.map((alert) => (
          <div className={styles.alertRow} key={alert.id}>
            <div className={styles.alertMain}>
              <span className={getAlertLevelClassName(styles, alert.level)}>
                {getRiskLevelLabel(alert.level)}
              </span>
              <strong>{alert.title}</strong>
              <p>{alert.branch}</p>
            </div>
            <time>{alert.time}</time>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
