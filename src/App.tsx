import { Suspense, lazy } from 'react';
import type { EChartsOption } from 'echarts';
import type { EChartsType } from 'echarts/core';
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardDrilldown } from './hooks/useDashboardDrilldown';
import { useClock } from './hooks/useClock';
import { SectionCard } from './components/SectionCard';
import { StatCard } from './components/StatCard';

const ReactChart = lazy(async () => {
  const mod = await import('./components/ReactChart');
  return { default: mod.ReactChart };
});

type ChartBlockProps = {
  option: EChartsOption;
  height: number;
  onEvents?: Record<string, (params: unknown, chart: EChartsType) => void>;
};

function formatAmount(value: number) {
  return `${(value / 100000000).toFixed(2)} 亿元`;
}

function formatYi(value: number) {
  return `${value.toFixed(2)} 亿元`;
}

function getRiskLevelLabel(level: string) {
  const mapping: Record<string, string> = {
    Low: '低',
    Medium: '中',
    High: '高',
    Critical: '重大',
  };

  return mapping[level] ?? level;
}

function getTransactionStatusLabel(status: string) {
  const mapping: Record<string, string> = {
    Completed: '已清算',
    Review: '审核中',
    Routing: '路由中',
  };

  return mapping[status] ?? status;
}

function ChartBlock({ option, height, onEvents }: ChartBlockProps) {
  return (
    <Suspense fallback={<div className="chart-loading">图表加载中...</div>}>
      <ReactChart option={option} height={height} onEvents={onEvents} />
    </Suspense>
  );
}

export default function App() {
  const { data, loading, error, refreshedAt } = useDashboardData();
  const { currentDate, currentTime } = useClock();
  const drilldown = useDashboardDrilldown(data);

  if (loading && !data) {
    return (
      <div className="screen-shell">
        <div className="loading-state">正在加载银行资金地图交易系统...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="screen-shell">
        <div className="loading-state error-state">
          {error ?? '驾驶舱数据加载失败。'}
        </div>
      </div>
    );
  }

  return (
    <div className="screen-shell">
      <div className="screen-backdrop" />

      {/* 分行详情抽屉打开时增加全屏遮罩，点击空白处即可关闭。 */}
      {drilldown.selectedCity ? (
        <button
          type="button"
          className="drawer-overlay"
          aria-label="关闭分行详情抽屉"
          onClick={drilldown.closeDrawer}
        />
      ) : null}

      {/* 顶部抬头区承载系统名称、业务说明与实时运行指标。 */}
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">全国资金路由监测中心</p>
          <h1>银行资金地图交易系统</h1>
          <p className="header-copy">
            集中呈现跨区域资金清算、分支机构头寸调拨、交易路径监测与风控处置，
            支撑银行资金运行全景可视与日内调度决策。
          </p>
        </div>
        <div className="header-meta">
          <span>业务日期 {currentDate}</span>
          <span>当前时钟 {currentTime}</span>
          <span>刷新时间 {refreshedAt}</span>
          <span>接口时延 {data.header.latencyMs} ms</span>
          <span>成功率 {data.header.successRate}%</span>
        </div>
      </header>

      {/* 指标卡展示当日清算、流动性、处理量与风控等核心经营数据。 */}
      <section className="stat-grid">
        {data.summary.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      {/* 时间轴展示日内关键处理节点，模拟清算作业编排进度。 */}
      <section className="timeline-strip">
        {data.timeline.map((step) => (
          <div key={`${step.time}-${step.title}`} className={`timeline-step ${step.status}`}>
            <span className="timeline-time">{step.time}</span>
            <strong>{step.title}</strong>
            <i />
          </div>
        ))}
      </section>

      {/* 主体区域采用“左侧分析栏 + 中部地图与洞察区”的驾驶舱结构。 */}
      <main className="dashboard-grid">
        <div className="dashboard-column dashboard-side">
          {/* 左上：分行资金排名或选中城市的往来城市排名。 */}
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

          {/* 左中：全局渠道占比，或切换到选中分行的业务结构。 */}
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

          {/* 左下：根据地图焦点城市联动更新的风险摘要。 */}
          <SectionCard
            title={`联动风控摘要 - ${drilldown.focusCity.name}`}
            subtitle="根据地图焦点城市动态更新"
          >
            <div className="risk-list">
              {drilldown.linkedRisks.map((risk) => (
                <div className="risk-item" key={risk.name}>
                  <div>
                    <strong>{risk.name}</strong>
                    <p>{risk.detail}</p>
                  </div>
                  <span className={`risk-badge risk-${risk.level.toLowerCase()}`}>
                    {getRiskLevelLabel(risk.level)}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="dashboard-main">
          {/* 中上：全国资金航线地图，支持 hover 联动与 click 钻取。 */}
          <SectionCard
            title="全国清算航线资金图"
            subtitle={`累计清算金额 ${formatAmount(data.map.totalAmount)}`}
            className="map-panel"
          >
            <div className="map-legend">
              <span>
                <i className="legend-dot origin" />
                核心资金枢纽
              </span>
              <span>
                <i className="legend-dot route" />
                模拟清算航线
              </span>
              <span>
                <i className="legend-dot target" />
                收款分支机构
              </span>
            </div>

            <div className="map-stage">
              <ChartBlock
                option={drilldown.selectedMapOption ?? data.charts.map}
                height={500}
                onEvents={{
                  mouseover: drilldown.handleMapHover,
                  click: drilldown.handleMapClick,
                }}
              />
              <aside className="map-hover-card">
                <p>地图联动详情</p>
                <strong>{drilldown.focusCity.name}</strong>
                <span>资金流量 {formatYi(drilldown.focusCity.amount)}</span>
                <small>悬浮查看重点城市热度，点击城市打开分行详情抽屉</small>
              </aside>
            </div>
          </SectionCard>

          {/* 中下：趋势与预警并列，压缩地图下方空白并提升监控密度。 */}
          <div className="insight-grid">
            <SectionCard title="小时级清算趋势" subtitle="近 24 小时资金处理曲线">
              <ChartBlock option={data.charts.line} height={300} />
            </SectionCard>

            <SectionCard
              title={`实时预警播报 - ${drilldown.focusCity.name}`}
              subtitle="交易监测与异常提示队列"
            >
              <div className="alert-marquee">
                <div className="alert-track">
                  {[...drilldown.linkedAlerts, ...drilldown.linkedAlerts].map((alert, index) => (
                    <div className="alert-chip" key={`${alert.id}-${index}`}>
                      <span className={`alert-level ${alert.level.toLowerCase()}`}>
                        {getRiskLevelLabel(alert.level)}
                      </span>
                      <strong>{alert.branch}</strong>
                      <p>{alert.title}</p>
                      <time>{alert.time}</time>
                    </div>
                  ))}
                </div>
              </div>
              <div className="alert-feed">
                {drilldown.linkedAlerts.map((alert) => (
                  <div className="alert-row" key={alert.id}>
                    <div className="alert-main">
                      <span className={`alert-level ${alert.level.toLowerCase()}`}>
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
          </div>
        </div>
      </main>

      {/* 底部展示与当前焦点城市相关的交易流水台账。 */}
      <section className="bottom-grid">
        <SectionCard
          title={`清算交易流水台账 - ${drilldown.focusCity.name}`}
          subtitle="最新路由、审核与清算指令明细"
          className="ledger-panel"
        >
          <div className="ledger-table">
            <div className="ledger-head">
              <span>交易编号</span>
              <span>机构</span>
              <span>交易对手</span>
              <span>业务渠道</span>
              <span>金额</span>
              <span>状态</span>
              <span>时间</span>
            </div>
            {drilldown.linkedTransactions.map((row) => (
              <div className="ledger-row" key={row.id}>
                <span>{row.id}</span>
                <span>{row.branch}</span>
                <span>{row.counterparty}</span>
                <span>{row.channel}</span>
                <span>{formatYi(row.amount)}</span>
                <span className={`ledger-status ${row.status.toLowerCase()}`}>
                  {getTransactionStatusLabel(row.status)}
                </span>
                <span>{row.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      {/* 右侧抽屉展示点击城市后的趋势、风险、预警和关联交易。 */}
      {drilldown.selectedCity ? (
        <aside className="branch-drawer branch-drawer-open">
          <div className="branch-drawer-head">
            <div>
              <p>分行详情抽屉</p>
              <h3>{drilldown.selectedCity.name}资金联动视图</h3>
              <span>当前监测流量 {formatYi(drilldown.selectedCity.amount)}</span>
            </div>
            <button type="button" className="drawer-close" onClick={drilldown.closeDrawer}>
              关闭
            </button>
          </div>

          <div className="drawer-grid">
            <section className="drawer-card">
              <h4>近 7 日资金趋势</h4>
              <ChartBlock option={drilldown.drawerTrendOption} height={220} />
            </section>

            <section className="drawer-card">
              <h4>风险摘要</h4>
              {drilldown.linkedRisks.map((risk) => (
                <div className="drawer-item" key={risk.name}>
                  <strong>{risk.name}</strong>
                  <p>{risk.detail}</p>
                  <span className={`risk-badge risk-${risk.level.toLowerCase()}`}>
                    {getRiskLevelLabel(risk.level)}
                  </span>
                </div>
              ))}
            </section>

            <section className="drawer-card">
              <h4>预警列表</h4>
              {drilldown.linkedAlerts.length > 0 ? (
                drilldown.linkedAlerts.map((alert) => (
                  <div className="drawer-item" key={alert.id}>
                    <strong>{alert.title}</strong>
                    <p>{alert.branch}</p>
                    <div className="drawer-meta">
                      <span className={`alert-level ${alert.level.toLowerCase()}`}>
                        {getRiskLevelLabel(alert.level)}
                      </span>
                      <time>{alert.time}</time>
                    </div>
                  </div>
                ))
              ) : (
                <div className="drawer-empty">当前分行暂无预警记录</div>
              )}
            </section>

            <section className="drawer-card drawer-card-wide">
              <h4>关联交易</h4>
              {drilldown.linkedTransactions.length > 0 ? (
                drilldown.linkedTransactions.map((row) => (
                  <div className="drawer-item" key={row.id}>
                    <strong>{row.counterparty}</strong>
                    <p>
                      {row.branch} / {row.channel}
                    </p>
                    <div className="drawer-meta">
                      <span>{formatYi(row.amount)}</span>
                      <span className={`ledger-status ${row.status.toLowerCase()}`}>
                        {getTransactionStatusLabel(row.status)}
                      </span>
                      <time>{row.time}</time>
                    </div>
                  </div>
                ))
              ) : (
                <div className="drawer-empty">当前分行暂无关联交易</div>
              )}
            </section>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
