import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center px-6">
      <div className="max-w-[420px] text-center space-y-4">
        <h1 className="text-[17px] font-semibold">404 — Page Not Found</h1>
        <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
          The requested page could not be found.
        </p>
        <p className="text-[14px] pt-2">
          <Link href="/">Return to home</Link>
        </p>
      </div>
    </div>
  );
}
