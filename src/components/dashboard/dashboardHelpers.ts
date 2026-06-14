import type { TimelineStep } from '../../types/dashboard';

type StyleMap = Record<string, string>;

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function formatAmount(value: number) {
  return `${(value / 100000000).toFixed(2)} 亿元`;
}

export function formatYi(value: number) {
  return `${value.toFixed(2)} 亿元`;
}

export function getRiskLevelLabel(level: string) {
  const mapping: Record<string, string> = {
    Low: '低',
    Medium: '中',
    High: '高',
    Critical: '重大',
  };

  return mapping[level] ?? level;
}

export function getTransactionStatusLabel(status: string) {
  const mapping: Record<string, string> = {
    Completed: '已清算',
    Review: '审核中',
    Routing: '路由中',
  };

  return mapping[status] ?? status;
}

export function getTimelineStepClassName(styles: StyleMap, status: TimelineStep['status']) {
  const mapping: Partial<Record<TimelineStep['status'], string>> = {
    completed: styles.timelineStepCompleted,
    active: styles.timelineStepActive,
  };

  return joinClassNames(styles.timelineStep, mapping[status]);
}

export function getRiskBadgeClassName(styles: StyleMap, level: string) {
  const mapping: Record<string, string> = {
    High: styles.riskHigh,
    Medium: styles.riskMedium,
    Low: styles.riskLow,
  };

  return joinClassNames(styles.riskBadge, mapping[level]);
}

export function getAlertLevelClassName(styles: StyleMap, level: string) {
  const mapping: Record<string, string> = {
    Critical: styles.alertLevelCritical,
    High: styles.alertLevelHigh,
    Medium: styles.alertLevelMedium,
  };

  return joinClassNames(styles.alertLevel, mapping[level]);
}

export function getLedgerStatusClassName(styles: StyleMap, status: string) {
  const mapping: Record<string, string> = {
    Completed: styles.ledgerStatusCompleted,
    Review: styles.ledgerStatusReview,
    Routing: styles.ledgerStatusRouting,
  };

  return joinClassNames(styles.ledgerStatus, mapping[status]);
}
