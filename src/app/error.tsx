'use client';

import Link from 'next/link';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center px-6">
      <div className="max-w-[420px] text-center space-y-4">
        <h1 className="text-[17px] font-semibold">Something went wrong</h1>
        <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
          An unexpected error occurred while rendering this page.
        </p>
        <div className="flex justify-center gap-4 text-[14px] pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="underline underline-offset-2 bg-transparent border-0 cursor-pointer text-inherit"
          >
            Try again
          </button>
          <Link href="/">Return home</Link>
        </div>
      </div>
    </div>
  );
}
