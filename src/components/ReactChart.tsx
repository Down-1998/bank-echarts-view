import { useEffect, useState } from 'react';
import type { EChartsOption } from 'echarts';
import type { EChartsType } from 'echarts/core';

type ReactChartProps = {
  option: EChartsOption;
  height: number;
  onEvents?: Record<string, (params: unknown, chart: EChartsType) => void>;
};

type ReactChartCoreComponent = typeof import('echarts-for-react/lib/core').default;
type EchartsModule = typeof import('echarts');

export function ReactChart({ option, height, onEvents }: ReactChartProps) {
  const [ChartComponent, setChartComponent] = useState<ReactChartCoreComponent | null>(null);
  const [echartsModule, setEchartsModule] = useState<EchartsModule | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadChartRuntime() {
      // 仅在图表组件真正渲染时再加载运行时，降低首屏打包体积。
      const [{ default: ReactEChartsCore }, echarts] = await Promise.all([
        import('echarts-for-react/lib/core'),
        import('echarts'),
      ]);

      if (!mounted) {
        return;
      }

      setChartComponent(() => ReactEChartsCore);
      setEchartsModule(echarts);
    }

    loadChartRuntime();

    return () => {
      mounted = false;
    };
  }, []);

  if (!ChartComponent || !echartsModule) {
    return <div className="chart-loading">图表加载中...</div>;
  }

  return (
    <ChartComponent
      echarts={echartsModule}
      option={option}
      notMerge
      lazyUpdate
      onEvents={onEvents}
      style={{ height: `${height}px`, width: '100%' }}
    />
  );
}
