'use client';

import { useEffect, useState, useCallback } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // Safe fallback
    }
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = saved === 'dark' || (!saved && prefersDark) ? 'dark' : 'light';
      setTheme(initial);
      if (initial === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch {
      // Fallback
    }
    setMounted(true);

    // Keyboard shortcut: pressing 't' toggles the theme
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        setTheme((current) => {
          const next = current === 'dark' ? 'light' : 'dark';
          applyTheme(next);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [applyTheme]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Support View Transitions API with circular clip path reveal
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const x = e.clientX || window.innerWidth / 2;
      const y = e.clientY || 0;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // @ts-ignore
      const transition = (document as any).startViewTransition(() => {
        applyTheme(nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 400,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      applyTheme(nextTheme);
    }
  };

  if (!mounted) {
    return (
      <span className="text-[13px] text-[var(--text-muted)] cursor-default select-none font-mono">
        light / dark
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors underline underline-offset-2 decoration-[var(--border)] hover:decoration-[var(--text)] bg-transparent border-0 p-0 cursor-pointer font-mono"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title="Toggle theme (press 't')"
    >
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  );
}
