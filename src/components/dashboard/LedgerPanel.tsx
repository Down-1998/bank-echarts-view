import type { TransactionItem } from '../../types/dashboard';
import { SectionCard } from '../SectionCard';
import styles from '../../App.module.css';
import { formatYi, getLedgerStatusClassName, getTransactionStatusLabel } from './dashboardHelpers';

type LedgerPanelProps = {
  cityName: string;
  transactions: TransactionItem[];
};

export function LedgerPanel({ cityName, transactions }: LedgerPanelProps) {
  return (
    <section className={styles.bottomGrid}>
      <SectionCard
        title={`清算交易流水台账 - ${cityName}`}
        subtitle="最新路由、审核与清算指令明细"
        className={styles.ledgerPanel}
      >
        <div className={styles.ledgerTable}>
          <div className={styles.ledgerHead}>
            <span>交易编号</span>
            <span>机构</span>
            <span>交易对手</span>
            <span>业务渠道</span>
            <span>金额</span>
            <span>状态</span>
            <span>时间</span>
          </div>
          {transactions.map((row) => (
            <div className={styles.ledgerRow} key={row.id}>
              <span>{row.id}</span>
              <span>{row.branch}</span>
              <span>{row.counterparty}</span>
              <span>{row.channel}</span>
              <span>{formatYi(row.amount)}</span>
              <span className={getLedgerStatusClassName(styles, row.status)}>
                {getTransactionStatusLabel(row.status)}
              </span>
              <span>{row.time}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}
