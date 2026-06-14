import styles from '../../App.module.css';

type DashboardHeaderProps = {
  currentDate: string;
  currentTime: string;
  refreshedAt: string;
  latencyMs: number;
  successRate: number;
};

export function DashboardHeader({
  currentDate,
  currentTime,
  refreshedAt,
  latencyMs,
  successRate,
}: DashboardHeaderProps) {
  return (
    <header className={styles.dashboardHeader}>
      <div>
        <p className={styles.eyebrow}>全国资金路由监测中心</p>
        <h1>银行资金地图交易系统</h1>
        <p className={styles.headerCopy}>
          集中呈现跨区域资金清算、分支机构头寸调拨、交易路径监测与风控处置，
          支持银行资金运行全景可视与日内调度决策。
        </p>
      </div>
      <div className={styles.headerMeta}>
        <span>业务日期 {currentDate}</span>
        <span>当前时钟 {currentTime}</span>
        <span>刷新时间 {refreshedAt}</span>
        <span>接口时延 {latencyMs} ms</span>
        <span>成功率 {successRate}%</span>
      </div>
    </header>
  );
}
