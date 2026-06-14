import { SectionCard } from './components/SectionCard';
import { StatCard } from './components/StatCard';
import { AlertsPanel } from './components/dashboard/AlertsPanel';
import { BranchDrawer } from './components/dashboard/BranchDrawer';
import { ChartBlock } from './components/dashboard/ChartBlock';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { LedgerPanel } from './components/dashboard/LedgerPanel';
import { MapOverviewPanel } from './components/dashboard/MapOverviewPanel';
import { RiskSummaryPanel } from './components/dashboard/RiskSummaryPanel';
import { TimelineStrip } from './components/dashboard/TimelineStrip';
import { useClock } from './hooks/useClock';
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardDrilldown } from './hooks/useDashboardDrilldown';
import styles from './App.module.css';

export default function App() {
  const { data, loading, error, refreshedAt } = useDashboardData();
  const { currentDate, currentTime } = useClock();
  const drilldown = useDashboardDrilldown(data);

  if (loading && !data) {
    return (
      <div className={styles.screenShell}>
        <div className={styles.loadingState}>正在加载银行资金地图交易系统...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.screenShell}>
        <div className={`${styles.loadingState} ${styles.errorState}`}>
          {error ?? '驾驶舱数据加载失败。'}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screenShell}>
      <div className={styles.screenBackdrop} />

      <DashboardHeader
        currentDate={currentDate}
        currentTime={currentTime}
        refreshedAt={refreshedAt}
        latencyMs={data.header.latencyMs}
        successRate={data.header.successRate}
      />

      <section className={styles.statGrid}>
        {data.summary.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      <TimelineStrip timeline={data.timeline} />

      <main className={styles.dashboardGrid}>
        <div className={`${styles.dashboardColumn} ${styles.dashboardSide}`}>
          <SectionCard
            title={
              drilldown.activeCityName
                ? `${drilldown.activeCityName}分行往来城市排名`
                : '分行资金净流入排名'
            }
            subtitle={
              drilldown.activeCityName
                ? '点击城市后的重点往来机构分布'
                : '当日重点区域资金归集情况'
            }
          >
            <ChartBlock option={drilldown.cityBarOption ?? data.charts.bar} height={320} />
          </SectionCard>

          <SectionCard
            title={
              drilldown.activeCityName
                ? `${drilldown.activeCityName}分行业务结构`
                : '交易渠道结构分布'
            }
            subtitle={
              drilldown.activeCityName
                ? '按当前选中分行聚合业务通道'
                : '公司金融与清算渠道占比'
            }
          >
            <ChartBlock option={drilldown.cityPieOption ?? data.charts.pie} height={300} />
          </SectionCard>

          <RiskSummaryPanel cityName={drilldown.focusCity.name} risks={drilldown.linkedRisks} />
        </div>

        <div className={styles.dashboardMain}>
          <MapOverviewPanel
            totalAmount={data.map.totalAmount}
            focusCityName={drilldown.focusCity.name}
            focusCityAmount={drilldown.focusCity.amount}
            option={drilldown.selectedMapOption ?? data.charts.map}
            onMapHover={drilldown.handleMapHover}
            onMapClick={drilldown.handleMapClick}
          />

          <div className={styles.insightGrid}>
            <SectionCard title="小时级清算趋势" subtitle="近 24 小时资金处理曲线">
              <ChartBlock option={data.charts.line} height={300} />
            </SectionCard>

            <AlertsPanel cityName={drilldown.focusCity.name} alerts={drilldown.linkedAlerts} />
          </div>
        </div>
      </main>

      <LedgerPanel cityName={drilldown.focusCity.name} transactions={drilldown.linkedTransactions} />

      <BranchDrawer
        selectedCity={drilldown.selectedCity}
        trendOption={drilldown.drawerTrendOption}
        risks={drilldown.linkedRisks}
        alerts={drilldown.linkedAlerts}
        transactions={drilldown.linkedTransactions}
        onClose={drilldown.closeDrawer}
      />
    </div>
  );
}
