import type { EChartsOption } from 'echarts';

export type SummaryMetric = {
  tag: string;
  label: string;
  value: number;
  unit: string;
  trend: number;
  note: string;
  decimals?: number;
};

export type RouteItem = {
  from: string;
  to: string;
  amount: number;
};

export type PieSeriesItem = {
  name: string;
  value: number;
};

export type GeoCity = {
  name: string;
  value: [number, number, number];
};

export type RiskItem = {
  name: string;
  detail: string;
  level: 'High' | 'Medium' | 'Low';
};

export type TimelineStep = {
  time: string;
  title: string;
  status: 'completed' | 'active' | 'pending';
};

export type AlertItem = {
  id: string;
  time: string;
  title: string;
  level: 'Critical' | 'High' | 'Medium';
  branch: string;
};

export type TransactionItem = {
  id: string;
  branch: string;
  counterparty: string;
  channel: string;
  amount: number;
  status: 'Completed' | 'Review' | 'Routing';
  time: string;
};

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
