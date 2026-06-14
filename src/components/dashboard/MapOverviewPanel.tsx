import type { EChartsOption } from 'echarts';
import type { EChartsType } from 'echarts/core';
import { SectionCard } from '../SectionCard';
import styles from '../../App.module.css';
import { ChartBlock } from './ChartBlock';
import { formatAmount, formatYi } from './dashboardHelpers';

type MapOverviewPanelProps = {
  totalAmount: number;
  focusCityName: string;
  focusCityAmount: number;
  option: EChartsOption;
  onMapHover: (params: unknown, chart: EChartsType) => void;
  onMapClick: (params: unknown, chart: EChartsType) => void;
};

export function MapOverviewPanel({
  totalAmount,
  focusCityName,
  focusCityAmount,
  option,
  onMapHover,
  onMapClick,
}: MapOverviewPanelProps) {
  return (
    <SectionCard
      title="全国清算航线资金图"
      subtitle={`累计清算金额 ${formatAmount(totalAmount)}`}
      className={styles.mapPanel}
    >
      <div className={styles.mapLegend}>
        <span>
          <i className={`${styles.legendDot} ${styles.legendDotOrigin}`} />
          核心资金枢纽
        </span>
        <span>
          <i className={`${styles.legendDot} ${styles.legendDotRoute}`} />
          模拟清算航线
        </span>
        <span>
          <i className={`${styles.legendDot} ${styles.legendDotTarget}`} />
          收款分支机构
        </span>
      </div>

      <div className={styles.mapStage}>
        <ChartBlock
          option={option}
          height={500}
          onEvents={{
            mouseover: onMapHover,
            click: onMapClick,
          }}
        />
        <aside className={styles.mapHoverCard}>
          <p>地图联动详情</p>
          <strong>{focusCityName}</strong>
          <span>资金流量 {formatYi(focusCityAmount)}</span>
          <small>悬浮查看重点城市热度，点击城市打开分行详情抽屉</small>
        </aside>
      </div>
    </SectionCard>
  );
}
