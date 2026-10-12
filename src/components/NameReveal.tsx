'use client';

import { useEffect, useState } from 'react';

const NAME = 'BERNARD FIAGBENU';

export default function NameReveal() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimated(true);
      return;
    }
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1
      className="text-[18px] md:text-[20px] font-semibold tracking-wide select-none"
      aria-label={NAME}
    >
      <span className="sr-only">{NAME}</span>
      <span aria-hidden="true" className="inline-block tracking-[0.06em]">
        {NAME.split('').map((char, index) => (
          <span key={index} className="letter-mask inline-block overflow-hidden">
            <span
              className="letter-char inline-block"
              style={{
                animationDelay: animated ? `${index * 35}ms` : '0ms',
                transform: animated ? 'translateY(0)' : 'translateY(110%)',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </span>
    </h1>
  );
}
