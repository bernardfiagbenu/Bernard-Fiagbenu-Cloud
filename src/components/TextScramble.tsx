'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

const TARGET_TEXT = 'Computer Scientist';
const GLYPHS = '01#%&*+<>~';

export default function TextScramble() {
  const [displayText, setDisplayText] = useState(TARGET_TEXT);
  const frameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  const runScramble = useCallback(() => {
    if (isRunningRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(TARGET_TEXT);
      return;
    }

    isRunningRef.current = true;
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length;

    const tick = () => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iteration) {
              return letter;
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
      });

      iteration += 1 / 3;

      if (iteration < maxIterations) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(TARGET_TEXT);
        isRunningRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      runScramble();
    }, 400);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [runScramble]);

  return (
    <p
      onMouseEnter={runScramble}
      className="text-[13px] text-[var(--text-muted)] font-mono mt-0.5 cursor-default select-none transition-colors hover:text-[var(--text)]"
      title="Computer Scientist (hover to decode)"
    >
      {displayText}
    </p>
  );
}
