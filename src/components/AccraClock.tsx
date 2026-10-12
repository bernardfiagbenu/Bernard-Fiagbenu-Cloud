'use client';

import { useEffect, useState } from 'react';

export default function AccraClock() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Ghana is in GMT / UTC all year round (no daylight saving time)
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds} GMT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-[12px] text-[var(--text-muted)] select-none">
      Accra, {timeStr || 'GMT'}
    </span>
  );
}
