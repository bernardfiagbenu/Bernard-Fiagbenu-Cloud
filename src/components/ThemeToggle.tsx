'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

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
      // Ignore localStorage access errors in private browsing/sandboxed iframes
    }
    setMounted(false);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Ignore localStorage write error
    }
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <span className="text-[13px] text-[var(--text-muted)] cursor-default select-none">
        light / dark
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors underline underline-offset-2 decoration-[var(--border)] hover:decoration-[var(--text)] bg-transparent border-0 p-0 cursor-pointer"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  );
}
