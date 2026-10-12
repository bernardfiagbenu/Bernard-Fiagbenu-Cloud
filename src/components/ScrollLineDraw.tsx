'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollLineDraw() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={lineRef}
      className={`draw-rule w-full h-[1px] bg-[var(--border)] ${isDrawn ? 'is-drawn' : ''}`}
      aria-hidden="true"
    />
  );
}
