import type { EChartsOption } from 'echarts';
import type { AlertItem, RiskItem, TransactionItem } from '../../types/dashboard';
import styles from '../../App.module.css';
import { ChartBlock } from './ChartBlock';
import {
  formatYi,
  getAlertLevelClassName,
  getLedgerStatusClassName,
  getRiskBadgeClassName,
  getRiskLevelLabel,
  getTransactionStatusLabel,
} from './dashboardHelpers';

type BranchDrawerProps = {
  selectedCity: {
    name: string;
    amount: number;
  } | null;
  trendOption: EChartsOption;
  risks: RiskItem[];
  alerts: AlertItem[];
  transactions: TransactionItem[];
  onClose: () => void;
};

export function BranchDrawer({
  selectedCity,
  trendOption,
  risks,
  alerts,
  transactions,
  onClose,
}: BranchDrawerProps) {
  if (!selectedCity) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={styles.drawerOverlay}
        aria-label="关闭分行详情抽屉"
        onClick={onClose}
      />
      <aside className={`${styles.branchDrawer} ${styles.branchDrawerOpen}`}>
        <div className={styles.branchDrawerHead}>
          <div>
            <p>分行详情抽屉</p>
            <h3>{selectedCity.name}资金联动视图</h3>
            <span>当前监测流量 {formatYi(selectedCity.amount)}</span>
          </div>
          <button type="button" className={styles.drawerClose} onClick={onClose}>
            关闭
          </button>
        </div>

        <div className={styles.drawerGrid}>
          <section className={styles.drawerCard}>
            <h4>近 7 日资金趋势</h4>
            <ChartBlock option={trendOption} height={220} />
          </section>

          <section className={styles.drawerCard}>
            <h4>风险摘要</h4>
            {risks.map((risk) => (
              <div className={styles.drawerItem} key={risk.name}>
                <strong>{risk.name}</strong>
                <p>{risk.detail}</p>
                <span className={getRiskBadgeClassName(styles, risk.level)}>
                  {getRiskLevelLabel(risk.level)}
                </span>
              </div>
            ))}
          </section>

          <section className={styles.drawerCard}>
            <h4>预警列表</h4>
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div className={styles.drawerItem} key={alert.id}>
                  <strong>{alert.title}</strong>
                  <p>{alert.branch}</p>
                  <div className={styles.drawerMeta}>
                    <span className={getAlertLevelClassName(styles, alert.level)}>
                      {getRiskLevelLabel(alert.level)}
                    </span>
                    <time>{alert.time}</time>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.drawerEmpty}>当前分行暂无预警记录</div>
            )}
          </section>

          <section className={`${styles.drawerCard} ${styles.drawerCardWide}`}>
            <h4>关联交易</h4>
            {transactions.length > 0 ? (
              transactions.map((row) => (
                <div className={styles.drawerItem} key={row.id}>
                  <strong>{row.counterparty}</strong>
                  <p>
                    {row.branch} / {row.channel}
                  </p>
                  <div className={styles.drawerMeta}>
                    <span>{formatYi(row.amount)}</span>
                    <span className={getLedgerStatusClassName(styles, row.status)}>
                      {getTransactionStatusLabel(row.status)}
                    </span>
                    <time>{row.time}</time>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.drawerEmpty}>当前分行暂无关联交易</div>
            )}
          </section>
        </div>
      </aside>
    </>
  );
}
