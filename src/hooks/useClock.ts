import { useEffect, useState } from 'react';

function createClockSnapshot() {
  const now = new Date();

  return {
    currentDate: now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    currentTime: now.toLocaleTimeString('zh-CN', {
      hour12: false,
    }),
  };
}

export function useClock() {
  const [clock, setClock] = useState(createClockSnapshot);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(createClockSnapshot());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return clock;
}
