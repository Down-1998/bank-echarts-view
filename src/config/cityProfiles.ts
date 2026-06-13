import type { AlertItem, RiskItem, TransactionItem } from '../types/dashboard';

export type CityProfile = {
  incomingCities: { name: string; amount: number }[];
  channelMix: { name: string; value: number }[];
  trend: number[];
  risks: RiskItem[];
  alerts: AlertItem[];
  transactions: TransactionItem[];
};

export const defaultCityProfile: CityProfile = {
  incomingCities: [],
  channelMix: [],
  trend: [0, 0, 0, 0, 0, 0, 0],
  risks: [],
  alerts: [],
  transactions: [],
};

// 城市画像配置集中维护，后续新增分行联动时只需要在这里补数据。
export const cityProfiles: Record<string, CityProfile> = {
  北京: {
    incomingCities: [
      { name: '上海', amount: 4.2 },
      { name: '武汉', amount: 2.9 },
      { name: '西安', amount: 2.2 },
      { name: '广州', amount: 1.8 },
    ],
    channelMix: [
      { name: '同业拆借', value: 34 },
      { name: '备付金调拨', value: 26 },
      { name: '集中清算', value: 21 },
      { name: '跨境汇款', value: 19 },
    ],
    trend: [4.1, 4.6, 5.4, 6.2, 6.9, 7.5, 7.1],
    risks: [
      { name: '大额头寸复核', detail: '同业拆借大额头寸待二级复核。', level: 'Medium' },
      { name: '备付金波动监测', detail: '午后备付金占用短时上升。', level: 'Low' },
    ],
    alerts: [
      {
        id: 'BJ-ALT-01',
        time: '12:03:18',
        title: '公司客户批量代发路由切换',
        level: 'Medium',
        branch: '北京清算中心',
      },
    ],
    transactions: [
      {
        id: 'TXN-BJ-001',
        branch: '北京清算中心',
        counterparty: '国能控股集团',
        channel: '同业拆借',
        amount: 3.26,
        status: 'Routing',
        time: '12:11:14',
      },
      {
        id: 'TXN-BJ-002',
        branch: '北京资金运营部',
        counterparty: '华北制造集团',
        channel: '备付金调拨',
        amount: 1.88,
        status: 'Completed',
        time: '11:54:09',
      },
    ],
  },
  上海: {
    incomingCities: [
      { name: '北京', amount: 3.8 },
      { name: '深圳', amount: 3.1 },
      { name: '南京', amount: 2.4 },
      { name: '杭州', amount: 2.2 },
    ],
    channelMix: [
      { name: '资金归集', value: 36 },
      { name: '托管清算', value: 24 },
      { name: '同业划拨', value: 20 },
      { name: '企业代发', value: 20 },
    ],
    trend: [5.6, 6.1, 6.4, 7.2, 8.4, 8.9, 8.2],
    risks: [
      { name: '大额资金复核', detail: '重点客户资金归集需人工复核确认。', level: 'Medium' },
      { name: '备付金阈值监测', detail: '自由备付金缓冲仍高于监测线。', level: 'Low' },
    ],
    alerts: [
      {
        id: 'SH-ALT-01',
        time: '12:11:42',
        title: '大额司库归集交易需双人复核授权',
        level: 'High',
        branch: '上海司库中心',
      },
    ],
    transactions: [
      {
        id: 'TXN-SH-001',
        branch: '上海司库中心',
        counterparty: '浦东重点企业资金池',
        channel: '资金归集',
        amount: 5.82,
        status: 'Completed',
        time: '12:13:26',
      },
      {
        id: 'TXN-SH-002',
        branch: '上海托管清算部',
        counterparty: '华东产业基金',
        channel: '托管清算',
        amount: 2.14,
        status: 'Completed',
        time: '11:48:51',
      },
    ],
  },
  广州: {
    incomingCities: [
      { name: '深圳', amount: 2.8 },
      { name: '北京', amount: 2.1 },
      { name: '西安', amount: 1.9 },
      { name: '成都', amount: 1.4 },
    ],
    channelMix: [
      { name: '企业代发', value: 33 },
      { name: '资金归集', value: 27 },
      { name: '跨境贸易', value: 22 },
      { name: '同业划拨', value: 18 },
    ],
    trend: [3.2, 3.8, 4.1, 4.6, 5.2, 5.8, 5.3],
    risks: [
      { name: '备付金观察', detail: '南区分行备付金余额接近预警观察值。', level: 'High' },
      { name: '集中支付监控', detail: '午间企业代发波峰明显。', level: 'Medium' },
    ],
    alerts: [
      {
        id: 'GZ-ALT-01',
        time: '12:04:05',
        title: '备付金余额接近预警观察阈值',
        level: 'High',
        branch: '广州南区分行',
      },
    ],
    transactions: [
      {
        id: 'TXN-GZ-001',
        branch: '广州南区分行',
        counterparty: '珠江制造集团',
        channel: '企业代发',
        amount: 1.94,
        status: 'Completed',
        time: '12:05:12',
      },
    ],
  },
  深圳: {
    incomingCities: [
      { name: '上海', amount: 2.9 },
      { name: '广州', amount: 2.6 },
      { name: '杭州', amount: 2.1 },
      { name: '北京', amount: 1.6 },
    ],
    channelMix: [
      { name: '跨境贸易', value: 38 },
      { name: '同业划拨', value: 24 },
      { name: '资金归集', value: 22 },
      { name: '托管清算', value: 16 },
    ],
    trend: [4.4, 5.1, 5.9, 6.7, 7.2, 7.8, 7.4],
    risks: [
      { name: '跨境交易预警', detail: '触发反洗钱名单相似度提示。', level: 'High' },
      { name: '路由拥塞观察', detail: '跨境清算链路出现短时排队。', level: 'Medium' },
    ],
    alerts: [
      {
        id: 'SZ-ALT-01',
        time: '12:14:08',
        title: '跨境贸易交易触发反洗钱强化规则',
        level: 'Critical',
        branch: '深圳自贸区分行',
      },
    ],
    transactions: [
      {
        id: 'TXN-SZ-001',
        branch: '深圳自贸区分行',
        counterparty: '南湾进出口有限公司',
        channel: '跨境贸易',
        amount: 2.48,
        status: 'Review',
        time: '12:09:37',
      },
    ],
  },
  杭州: {
    incomingCities: [
      { name: '深圳', amount: 2.2 },
      { name: '上海', amount: 1.9 },
      { name: '南京', amount: 1.5 },
      { name: '北京', amount: 1.2 },
    ],
    channelMix: [
      { name: '托管清算', value: 30 },
      { name: '数字支付', value: 28 },
      { name: '资金归集', value: 24 },
      { name: '企业代发', value: 18 },
    ],
    trend: [2.8, 3.1, 3.5, 4.2, 4.7, 5.1, 4.9],
    risks: [{ name: '支付集中度监测', detail: '电商类资金呈现高频集中特征。', level: 'Medium' }],
    alerts: [],
    transactions: [
      {
        id: 'TXN-HZ-001',
        branch: '杭州数字金融事业部',
        counterparty: '云商零售集团',
        channel: '托管清算',
        amount: 1.36,
        status: 'Completed',
        time: '12:01:08',
      },
    ],
  },
};

export function getCityProfile(cityName: string) {
  return cityProfiles[cityName] ?? defaultCityProfile;
}
