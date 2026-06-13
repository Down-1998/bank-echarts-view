import { useMemo, useState } from 'react';
import type { EChartsOption } from 'echarts';
import { getCityProfile } from '../config/cityProfiles';
import type { DashboardPayload, RiskItem } from '../types/dashboard';

type CityFocus = {
  name: string;
  amount: number;
};

function parseMapPoint(params: unknown): CityFocus | null {
  if (!params || typeof params !== 'object') {
    return null;
  }

  const maybeParams = params as {
    name?: string;
    data?: { value?: number[] | number };
    value?: number[] | number;
  };

  const name = maybeParams.name;
  if (!name) {
    return null;
  }

  const rawValue = maybeParams.data?.value ?? maybeParams.value;
  const amount = Array.isArray(rawValue) ? Number(rawValue[2] ?? 0) : Number(rawValue ?? 0);

  return { name, amount };
}

function createCityBarOption(data: { name: string; amount: number }[]): EChartsOption {
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
      data: data.map((item) => item.name),
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: '#dbe7ff' },
    },
    series: [
      {
        type: 'bar',
        data: data.map((item) => item.amount),
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
              { offset: 0, color: '#14d9cf' },
              { offset: 1, color: '#4c7dff' },
            ],
          },
        },
      },
    ],
  };
}

function createCityPieOption(data: { name: string; value: number }[]): EChartsOption {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#9db1cd' },
      itemGap: 16,
    },
    color: ['#5c7cff', '#1ad5d1', '#ffc857', '#ff7a6b', '#7bd389'],
    series: [
      {
        type: 'pie',
        radius: ['45%', '68%'],
        center: ['50%', '44%'],
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
        data,
      },
    ],
  };
}

function createDrawerTrendOption(cityName: string, values: number[]): EChartsOption {
  return {
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => `${value} 亿元`,
    },
    grid: { left: 8, right: 8, top: 28, bottom: 12, containLabel: true },
    xAxis: {
      type: 'category',
      data: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'T'],
      boundaryGap: false,
      axisLabel: { color: '#9db1cd' },
      axisLine: { lineStyle: { color: 'rgba(109, 141, 179, 0.35)' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#9db1cd' },
      splitLine: { lineStyle: { color: 'rgba(121, 151, 189, 0.12)' } },
    },
    series: [
      {
        name: `${cityName}资金趋势`,
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbolSize: 7,
        data: values,
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
              { offset: 0, color: 'rgba(255, 209, 102, 0.28)' },
              { offset: 1, color: 'rgba(255, 209, 102, 0.03)' },
            ],
          },
        },
      },
    ],
  };
}

function createSelectedMapOption(baseOption: EChartsOption, cityName: string): EChartsOption {
  const nextOption: EChartsOption = {
    ...baseOption,
    geo: {
      ...(baseOption.geo as Record<string, unknown>),
      selectedMode: 'single',
      emphasis: {
        itemStyle: {
          areaColor: '#1e4b7a',
        },
      },
    },
  };

  const series = Array.isArray(baseOption.series) ? baseOption.series : [];
  nextOption.series = series.map((item, index) => {
    if (index !== 1 || typeof item !== 'object' || !item) {
      return item;
    }

    const chartSeries = item as {
      data?: Array<{
        name: string;
        value: number[];
        itemStyle?: {
          color?: string;
          shadowBlur?: number;
          shadowColor?: string;
        };
      }>;
    };

    return {
      ...item,
      data: chartSeries.data?.map((point) =>
        point.name === cityName
          ? {
              ...point,
              itemStyle: {
                color: '#ffd166',
                shadowBlur: 20,
                shadowColor: 'rgba(255, 209, 102, 0.8)',
              },
            }
          : point,
      ),
    };
  }) as EChartsOption['series'];

  return nextOption;
}

function pickRisks(primary: RiskItem[], fallback: RiskItem[]) {
  return primary.length > 0 ? primary : fallback;
}

export function useDashboardDrilldown(data: DashboardPayload | null) {
  const [focusCity, setFocusCity] = useState<CityFocus>({ name: '上海', amount: 12.8 });
  const [selectedCity, setSelectedCity] = useState<CityFocus | null>(null);

  const activeCityName = selectedCity?.name ?? focusCity.name;
  // 钻取优先使用点击城市，其次回退到当前悬浮焦点城市。
  const activeProfile = getCityProfile(activeCityName);

  const linkedRisks = useMemo(() => {
    if (!data) {
      return [];
    }

    return pickRisks(activeProfile.risks, data.risks);
  }, [activeProfile, data]);

  const linkedAlerts = useMemo(() => {
    if (!data) {
      return [];
    }

    return activeProfile.alerts.length > 0 ? activeProfile.alerts : data.alerts;
  }, [activeProfile, data]);

  const linkedTransactions = useMemo(() => {
    if (!data) {
      return [];
    }

    return activeProfile.transactions.length > 0 ? activeProfile.transactions : data.transactions;
  }, [activeProfile, data]);

  const cityBarOption = useMemo(() => {
    if (activeProfile.incomingCities.length === 0) {
      return null;
    }

    return createCityBarOption(activeProfile.incomingCities);
  }, [activeProfile]);

  const cityPieOption = useMemo(() => {
    if (activeProfile.channelMix.length === 0) {
      return null;
    }

    return createCityPieOption(activeProfile.channelMix);
  }, [activeProfile]);

  const drawerTrendOption = useMemo(() => {
    return createDrawerTrendOption(activeCityName, activeProfile.trend);
  }, [activeCityName, activeProfile]);

  const selectedMapOption = useMemo(() => {
    if (!data || !selectedCity) {
      return null;
    }

    return createSelectedMapOption(data.charts.map, selectedCity.name);
  }, [data, selectedCity]);

  function handleMapHover(params: unknown) {
    const city = parseMapPoint(params);
    if (!city) {
      return;
    }

    // 悬浮只更新联动焦点，不直接打开抽屉，避免误触打断浏览。
    setFocusCity(city);
  }

  function handleMapClick(params: unknown) {
    const city = parseMapPoint(params);
    if (!city) {
      return;
    }

    // 点击明确表示用户要钻取该分行，因此同时更新焦点并展开详情。
    setFocusCity(city);
    setSelectedCity(city);
  }

  function closeDrawer() {
    setSelectedCity(null);
  }

  return {
    activeCityName,
    cityBarOption,
    cityPieOption,
    closeDrawer,
    drawerTrendOption,
    focusCity,
    handleMapClick,
    handleMapHover,
    linkedAlerts,
    linkedRisks,
    linkedTransactions,
    selectedCity,
    selectedMapOption,
  };
}
