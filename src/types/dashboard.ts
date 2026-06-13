import type { EChartsOption } from 'echarts';

// 顶部指标卡的数据结构。
export type SummaryMetric = {
  tag: string;
  label: string;
  value: number;
  unit: string;
  trend: number;
  note: string;
  decimals?: number;
};

// 地图航线的基础交易路由。
export type RouteItem = {
  from: string;
  to: string;
  amount: number;
};

// 饼图序列项，统一表示渠道或结构占比。
export type PieSeriesItem = {
  name: string;
  value: number;
};

// 地图城市坐标点，第三位数值用于热度或金额强度。
export type GeoCity = {
  name: string;
  value: [number, number, number];
};

// 风险摘要项，供左侧摘要与抽屉复用。
export type RiskItem = {
  name: string;
  detail: string;
  level: 'High' | 'Medium' | 'Low';
};

// 顶部流程时间轴节点。
export type TimelineStep = {
  time: string;
  title: string;
  status: 'completed' | 'active' | 'pending';
};

// 预警播报项，用于滚动播报和明细列表。
export type AlertItem = {
  id: string;
  time: string;
  title: string;
  level: 'Critical' | 'High' | 'Medium';
  branch: string;
};

// 清算交易流水记录。
export type TransactionItem = {
  id: string;
  branch: string;
  counterparty: string;
  channel: string;
  amount: number;
  status: 'Completed' | 'Review' | 'Routing';
  time: string;
};

// 页面整体接口响应结构，保持与真实后端较接近的层次。
export type DashboardPayload = {
  header: {
    latencyMs: number;
    successRate: number;
  };
  summary: SummaryMetric[];
  map: {
    totalAmount: number;
    routes: RouteItem[];
  };
  risks: RiskItem[];
  timeline: TimelineStep[];
  alerts: AlertItem[];
  transactions: TransactionItem[];
  charts: {
    bar: EChartsOption;
    line: EChartsOption;
    pie: EChartsOption;
    map: EChartsOption;
  };
};
