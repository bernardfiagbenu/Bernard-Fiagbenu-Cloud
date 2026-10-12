import Link from 'next/link';
import type { Metadata } from 'next';
import { PAPERS } from '@/lib/papers';
import { SITE_URL } from '@/lib/seo';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Research | BERNARD FIAGBENU',
  description:
    'Academic research papers in Artificial Intelligence, Telecommunications, Educational Technology, Blockchain Supply Chains, and Renewable Energy by BERNARD FIAGBENU.',
  alternates: {
    canonical: `${SITE_URL}/research`,
  },
  openGraph: {
    title: 'Research Papers | BERNARD FIAGBENU',
    description:
      'Academic research papers in Artificial Intelligence, Telecommunications, Educational Technology, Blockchain Supply Chains, and Renewable Energy by BERNARD FIAGBENU.',
    url: `${SITE_URL}/research`,
    type: 'website',
  },
};

export default function ResearchIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <main className="max-w-[680px] mx-auto px-6 py-12 md:py-20 space-y-12">
        {/* Navigation Top Bar */}
        <header className="flex items-baseline justify-between border-b border-[var(--border)] pb-4 text-[13px]">
          <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text)]">
            &larr; Home
          </Link>
          <ThemeToggle />
        </header>

        {/* Index Header */}
        <section className="space-y-4">
          <h1 className="text-[20px] font-semibold tracking-tight text-[var(--text)]">
            Research Papers
          </h1>
          <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
            Five journal-grade working papers investigating applied machine learning, sub-6 GHz phased arrays, higher education adoption models, maritime blockchain logistics, and rooftop solar economics in Ghana.
          </p>
        </section>

        {/* List of 5 Papers */}
        <section className="space-y-8 border-t border-[var(--border)] pt-8">
          <div className="space-y-10">
            {PAPERS.map((paper) => (
              <article key={paper.slug} className="space-y-3 group research-row">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[12px] font-mono uppercase tracking-wider text-[var(--text-muted)] row-num">
                    Area {paper.areaNumber}: {paper.areaTitle}
                  </span>
                  <span className="text-[12px] font-mono text-[var(--text-subtle)] shrink-0">
                    {paper.date}
                  </span>
                </div>

                <h2 className="text-[16px] font-medium leading-snug">
                  <Link
                    href={`/research/${paper.slug}`}
                    className="hover:text-[var(--text)] row-title"
                  >
                    {paper.title}
                  </Link>
                </h2>

                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed line-clamp-3">
                  {paper.abstract.background} {paper.abstract.objective}
                </p>

                <div className="flex items-center gap-4 text-[13px] pt-1">
                  <Link
                    href={`/research/${paper.slug}`}
                    className="font-medium hover:text-[var(--text)]"
                  >
                    Read online &rarr;
                  </Link>
                  <a
                    href={paper.pdfUrl}
                    download={`${paper.slug}.pdf`}
                    className="text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    Download PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="border-t border-[var(--border)] pt-6 pb-12 text-[12px] text-[var(--text-subtle)] flex justify-between font-mono">
          <span>BERNARD FIAGBENU</span>
          <span>Accra, GMT</span>
        </footer>
      </main>
    </div>
  );
}
