import { useEffect, useState } from 'react';
import { getDashboardData } from '../api/dashboard';
import '../mock/dashboard';
import type { DashboardPayload } from '../types/dashboard';

export function useDashboardData() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshedAt, setRefreshedAt] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const next = await getDashboardData();
        if (!active) {
          return;
        }

        setData(next);
        // 保留最近一次成功拉取时间，方便头部展示接口刷新节奏。
        setRefreshedAt(new Date().toLocaleTimeString('en-GB', { hour12: false }));
      } catch (loadError) {
        if (!active) {
          return;
        }

        const message =
          loadError instanceof Error ? loadError.message : 'Unknown request error';
        setError(message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();
    // 通过固定轮询模拟资金驾驶舱持续刷新场景。
    const timer = window.setInterval(load, 25000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return { data, loading, error, refreshedAt };
}
