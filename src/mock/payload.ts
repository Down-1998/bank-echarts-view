import type { EChartsOption } from 'echarts';
import type {
  AlertItem,
  DashboardPayload,
  GeoCity,
  PieSeriesItem,
  RouteItem,
  SummaryMetric,
  TimelineStep,
  TransactionItem,
} from '../types/dashboard';

type MapRouteLine = {
  fromName: string;
  toName: string;
  value: number;
  coords: [number, number][];
};

type ScatterPoint = {
  name: string;
  value: [number, number, number];
};

// 地图城市坐标表，用于航线起终点和散点热度定位。
const cityMap: Record<string, GeoCity> = {
  北京: { name: '北京', value: [116.4074, 39.9042, 0] },
  上海: { name: '上海', value: [121.4737, 31.2304, 0] },
  广州: { name: '广州', value: [113.2644, 23.1291, 0] },
  深圳: { name: '深圳', value: [114.0579, 22.5431, 0] },
  成都: { name: '成都', value: [104.0665, 30.5728, 0] },
  杭州: { name: '杭州', value: [120.1551, 30.2741, 0] },
  武汉: { name: '武汉', value: [114.3054, 30.5931, 0] },
  西安: { name: '西安', value: [108.9398, 34.3416, 0] },
  南京: { name: '南京', value: [118.7969, 32.0603, 0] },
  重庆: { name: '重庆', value: [106.5516, 29.563, 0] },
};

// 左侧柱状图默认展示的重点分行净流入规模。
const branches = [
  { name: '上海', amount: 12.8 },
  { name: '深圳', amount: 11.1 },
  { name: '广州', amount: 9.6 },
  { name: '北京', amount: 8.9 },
  { name: '杭州', amount: 7.4 },
  { name: '成都', amount: 6.8 },
];

// 中部趋势图默认展示的小时级资金处理曲线。
const trendHours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
const trendValues = [3.6, 4.2, 5.1, 8.4, 9.8, 10.4, 8.1, 6.7];

// 左侧饼图默认展示的业务渠道结构。
const channelMix: PieSeriesItem[] = [
  { name: '同业划拨', value: 38 },
  { name: '企业代发', value: 24 },
  { name: '资金归集', value: 18 },
  { name: '跨境贸易', value: 12 },
  { name: '托管清算', value: 8 },
];

// 地图航线模拟全国分支机构之间的资金清算往来。
const routes: RouteItem[] = [
  { from: '北京', to: '上海', amount: 3.8 },
  { from: '北京', to: '广州', amount: 2.6 },
  { from: '上海', to: '深圳', amount: 2.9 },
  { from: '上海', to: '成都', amount: 2.1 },
  { from: '深圳', to: '杭州', amount: 1.8 },
  { from: '广州', to: '西安', amount: 1.4 },
  { from: '北京', to: '武汉', amount: 1.9 },
  { from: '上海', to: '南京', amount: 1.2 },
];

// 顶部时间轴模拟日内清算作业编排进度。
const timeline: TimelineStep[] = [
  { time: '08:00', title: '日初头寸检查完成', status: 'completed' },
  { time: '10:30', title: '司库资金调拨窗口开启', status: 'completed' },
  { time: '13:00', title: '同业清算撮合批次处理中', status: 'active' },
  { time: '16:30', title: '合规复核批量扫描待执行', status: 'pending' },
  { time: '19:00', title: '日终备付金再平衡待启动', status: 'pending' },
];

// 预警播报区使用的模拟监控事件。
const alerts: AlertItem[] = [
  {
    id: 'ALT-901',
    time: '12:14:08',
    title: '跨境贸易交易触发反洗钱强化规则',
    level: 'Critical',
    branch: '深圳自贸区分行',
  },
  {
    id: 'ALT-776',
    time: '12:11:42',
    title: '大额司库归集交易需双人复核授权',
    level: 'High',
    branch: '上海司库中心',
  },
  {
    id: 'ALT-743',
    time: '12:08:19',
    title: '企业批量代发因路由拥塞出现延迟',
    level: 'Medium',
    branch: '北京清算中心',
  },
  {
    id: 'ALT-711',
    time: '12:04:05',
    title: '备付金余额接近预警观察阈值',
    level: 'High',
    branch: '广州南区分行',
  },
];

// 底部台账与抽屉详情共用的模拟交易流水。
const transactions: TransactionItem[] = [
  {
    id: 'TXN20260612001',
    branch: '上海司库中心',
    counterparty: '浦东重点企业资金池',
    channel: '资金归集',
    amount: 5.82,
    status: 'Completed',
    time: '12:13:26',
  },
  {
    id: 'TXN20260612002',
    branch: '北京清算中心',
    counterparty: '国能控股集团',
    channel: '同业划拨',
    amount: 3.26,
    status: 'Routing',
    time: '12:11:14',
  },
  {
    id: 'TXN20260612003',
    branch: '深圳自贸区分行',
    counterparty: '南湾进出口有限公司',
    channel: '跨境贸易',
    amount: 2.48,
    status: 'Review',
    time: '12:09:37',
  },
  {
    id: 'TXN20260612004',
    branch: '广州南区分行',
    counterparty: '珠江制造集团',
    channel: '企业代发',
    amount: 1.94,
    status: 'Completed',
    time: '12:05:12',
  },
  {
    id: 'TXN20260612005',
    branch: '杭州数字金融事业部',
    counterparty: '云商零售集团',
    channel: '托管清算',
    amount: 1.36,
    status: 'Completed',
    time: '12:01:08',
  },
];

function buildSummary(): SummaryMetric[] {
  // 顶部四张指标卡统一从这里出数，便于后续替换为真实接口字段。
  return [
    {
      tag: 'Clearing',
      label: '当日清算总量',
      value: 286.42,
      unit: 'B',
      trend: 8.4,
      decimals: 2,
      note: '公司金融与同业资金清算总额',
    },
    {
      tag: 'Liquidity',
      label: '日间可调拨资金',
      value: 94.7,
      unit: 'B',
      trend: 3.2,
      decimals: 1,
      note: '当前可用于跨机构调拨的头寸余额',
    },
    {
      tag: 'Processing',
      label: '已处理交易笔数',
      value: 126840,
      unit: '',
      trend: 6.1,
      note: '经风控筛查后自动放行的清算指令',
    },
    {
      tag: 'Compliance',
      label: '风险拦截率',
      value: 99.12,
      unit: '%',
      trend: -0.4,
      decimals: 2,
      note: '清算提交前被风控识别并拦截的比例',
    },
  ];
}

function createBarOption(): EChartsOption {
  // 横向柱状图用于展示重点分行资金净流入排名。
  return {
    grid: { left: 10, right: 12, top: 32, bottom: 8, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      valueFormatter: (value) => `${value} 亿元`,
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#8ca2bf' },
      splitLine: { lineStyle: { color: 'rgba(121, 151, 189, 0.12)' } },
    },
    yAxis: {
      type: 'category',
      data: branches.map((item) => item.name),
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: '#dbe7ff' },
    },
    series: [
      {
        type: 'bar',
        data: branches.map((item) => item.amount),
        barWidth: 16,
        itemStyle: {
          borderRadius: [0, 10, 10, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#1ad5d1' },
              { offset: 1, color: '#5c7cff' },
            ],
          },
        },
      },
    ],
  };
}

function createLineOption(): EChartsOption {
  // 面积折线图强调日内资金处理波峰与波谷。
  return {
    grid: { left: 12, right: 14, top: 36, bottom: 16, containLabel: true },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => `${value} 亿元`,
    },
    xAxis: {
      type: 'category',
      data: trendHours,
      boundaryGap: false,
      axisLine: { lineStyle: { color: 'rgba(109, 141, 179, 0.35)' } },
      axisLabel: { color: '#9db1cd' },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#9db1cd' },
      splitLine: { lineStyle: { color: 'rgba(121, 151, 189, 0.12)' } },
    },
    series: [
      {
        type: 'line',
        data: trendValues,
        smooth: true,
        showSymbol: true,
        symbolSize: 8,
        lineStyle: { width: 3, color: '#ffd166' },
        itemStyle: { color: '#ffd166', borderColor: '#fff0c2', borderWidth: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 209, 102, 0.32)' },
              { offset: 1, color: 'rgba(255, 209, 102, 0.02)' },
            ],
          },
        },
      },
    ],
  };
}

function createPieOption(): EChartsOption {
  // 环形饼图用于展示渠道结构占比。
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#9db1cd' },
      itemGap: 18,
    },
    color: ['#5c7cff', '#1ad5d1', '#ffc857', '#ff7a6b', '#a885ff'],
    series: [
      {
        type: 'pie',
        radius: ['45%', '68%'],
        center: ['50%', '46%'],
        itemStyle: {
          borderColor: '#07111f',
          borderWidth: 4,
        },
        label: {
          color: '#ebf3ff',
          formatter: '{b}\n{d}%',
        },
        labelLine: {
          lineStyle: { color: 'rgba(181, 205, 234, 0.55)' },
        },
        data: channelMix,
      },
    ],
  };
}

function createMapOption(): EChartsOption {
  // 将路由交易转换为地图可直接消费的航线段与城市散点数据。
  const routeLines = routes
    .map((item) => {
      const from = cityMap[item.from];
      const to = cityMap[item.to];
      if (!from || !to) {
        return null;
      }

      return {
        fromName: from.name,
        toName: to.name,
        value: item.amount,
        coords: [
          [from.value[0], from.value[1]],
          [to.value[0], to.value[1]],
        ] as [number, number][],
      };
    })
    .filter((item): item is MapRouteLine => item !== null);

  const scatterTargets: ScatterPoint[] = Object.values(cityMap).map((item) => {
    const incoming = routes
      .filter((route) => route.to === item.name || route.from === item.name)
      .reduce((sum, route) => sum + route.amount, 0);

    return {
      name: item.name,
      value: [item.value[0], item.value[1], Number(incoming.toFixed(1))],
    };
  });

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const point = Array.isArray(params) ? params[0] : params;
        if (!point || !('data' in point) || !point.data) {
          return '';
        }

        const rawValue = (point.data as { value?: number[] | number }).value;
        const amount = Array.isArray(rawValue) ? rawValue[2] : rawValue;
        return `${point.name}<br/>资金流量 ${amount ?? '--'} 亿元`;
      },
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.12,
      label: { show: false },
      itemStyle: {
        areaColor: '#0d243f',
        borderColor: '#3b6ea8',
        borderWidth: 1.2,
        shadowColor: 'rgba(40, 132, 255, 0.25)',
        shadowBlur: 18,
      },
      emphasis: {
        itemStyle: {
          areaColor: '#153a63',
        },
      },
    },
    series: [
      {
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        effect: {
          show: true,
          symbol: 'arrow',
          symbolSize: 7,
          trailLength: 0.18,
          period: 4,
        },
        lineStyle: {
          width: 1.5,
          opacity: 0.7,
          curveness: 0.25,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#37e2d5' },
              { offset: 1, color: '#ffd166' },
            ],
          },
        },
        data: routeLines,
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: {
          brushType: 'stroke',
          scale: 4,
        },
        symbolSize: (value: number[]) => 8 + value[2] * 1.5,
        itemStyle: {
          color: '#82f7ff',
          shadowBlur: 15,
          shadowColor: 'rgba(130, 247, 255, 0.55)',
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: '#dce8ff',
        },
        data: scatterTargets,
      },
    ],
  };
}

export function buildDashboardPayload(): DashboardPayload {
  // 响应结构故意贴近真实后端，方便后续平滑切换到正式接口。
  return {
    header: {
      latencyMs: 183,
      successRate: 99.86,
    },
    // 顶部概览指标。
    summary: buildSummary(),
    // 地图总金额与航线基础数据。
    map: {
      totalAmount: 28642000000,
      routes,
    },
    // 左侧风险摘要的全局默认数据。
    risks: [
      {
        name: '大额资金复核',
        detail: '4 笔大额资金交易待二级司库复核确认。',
        level: 'Medium',
      },
      {
        name: '跨境交易模式预警',
        detail: '深圳分行触发反洗钱名单相似度提示。',
        level: 'High',
      },
      {
        name: '备付金阈值监测',
        detail: '上海机构自由备付金缓冲仍高于预警线。',
        level: 'Low',
      },
    ],
    // 顶部流程时间轴。
    timeline,
    // 中部实时预警播报。
    alerts,
    // 底部台账与抽屉关联交易。
    transactions,
    // 页面首屏直接使用的图表配置。
    charts: {
      bar: createBarOption(),
      line: createLineOption(),
      pie: createPieOption(),
      map: createMapOption(),
    },
  };
}
