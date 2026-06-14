import { Suspense, lazy } from 'react';
import type { EChartsOption } from 'echarts';
import type { EChartsType } from 'echarts/core';
import styles from '../../App.module.css';

const ReactChart = lazy(async () => {
  const mod = await import('../ReactChart');
  return { default: mod.ReactChart };
});

type ChartBlockProps = {
  option: EChartsOption;
  height: number;
  onEvents?: Record<string, (params: unknown, chart: EChartsType) => void>;
};

export function ChartBlock({ option, height, onEvents }: ChartBlockProps) {
  return (
    <Suspense fallback={<div className={styles.chartLoading}>图表加载中...</div>}>
      <ReactChart option={option} height={height} onEvents={onEvents} />
    </Suspense>
  );
}
