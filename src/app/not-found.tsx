import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | BERNARD FIAGBENU',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center px-6">
      <div className="max-w-[420px] text-center space-y-4">
        <h1 className="text-[18px] font-semibold tracking-tight">
          404 &mdash; Page Not Found
        </h1>
        <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
          The requested resource does not exist on this domain.
        </p>
        <p className="text-[14px] pt-2">
          <Link href="/" className="hover:text-[var(--text)]">
            &larr; Return to home
          </Link>
        </p>
      </div>
    </div>
  );
}
