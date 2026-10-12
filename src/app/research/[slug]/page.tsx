import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PAPERS, type Paper } from '@/lib/papers';
import { SITE_URL } from '@/lib/seo';
import ThemeToggle from '@/components/ThemeToggle';
import CiteBlock from '@/components/CiteBlock';
import ReadingProgressBar from '@/components/ReadingProgressBar';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PAPERS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = PAPERS.find((p) => p.slug === slug);
  if (!paper) {
    return {
      title: 'Paper Not Found | BERNARD FIAGBENU',
    };
  }

  const paperUrl = `${SITE_URL}/research/${paper.slug}`;
  const pdfAbsoluteUrl = `${SITE_URL}${paper.pdfUrl}`;
  const description = `${paper.abstract.objective} ${paper.abstract.results}`.slice(0, 155);

  return {
    title: `${paper.title} | BERNARD FIAGBENU`,
    description,
    alternates: {
      canonical: paperUrl,
    },
    openGraph: {
      type: 'article',
      title: paper.title,
      description,
      url: paperUrl,
      publishedTime: paper.isoDate,
      authors: ['BERNARD FIAGBENU'],
      tags: paper.keywords,
      siteName: 'BERNARD FIAGBENU',
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.title,
      description,
    },
    other: {
      citation_title: paper.title,
      citation_author: 'BERNARD FIAGBENU',
      citation_publication_date: paper.isoDate.replace(/-/g, '/'),
      citation_online_date: paper.isoDate.replace(/-/g, '/'),
      citation_abstract_html_url: paperUrl,
      citation_pdf_url: pdfAbsoluteUrl,
      citation_keywords: paper.keywords.join(', '),
      citation_language: 'en',
    },
  };
}

export default async function PaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = PAPERS.find((p) => p.slug === slug);

  if (!paper) {
    notFound();
  }

  const paperUrl = `${SITE_URL}/research/${paper.slug}`;
  const otherPapers = PAPERS.filter((p) => p.slug !== paper.slug);

  const scholarlyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@id': `${paperUrl}#article`,
    headline: paper.title,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'BERNARD FIAGBENU',
      jobTitle: 'Computer Scientist',
    },
    datePublished: paper.isoDate,
    dateModified: paper.isoDate,
    abstract: `${paper.abstract.background} ${paper.abstract.objective} ${paper.abstract.methods} ${paper.abstract.results} ${paper.abstract.conclusion}`,
    keywords: paper.keywords.join(', '),
    inLanguage: 'en',
    isAccessibleForFree: true,
    url: paperUrl,
    encoding: {
      '@type': 'MediaObject',
      contentUrl: `${SITE_URL}${paper.pdfUrl}`,
      encodingFormat: 'application/pdf',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Research',
        item: `${SITE_URL}/research`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: paper.shortTitle,
        item: paperUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <ReadingProgressBar />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="max-w-[720px] mx-auto px-6 py-12 md:py-20 space-y-12">
        {/* Navigation Top Bar */}
        <header className="flex items-baseline justify-between border-b border-[var(--border)] pb-4 text-[13px]">
          <div className="flex items-center gap-4 text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text)]">
              &larr; Home
            </Link>
            <span>/</span>
            <Link href="/research" className="hover:text-[var(--text)]">
              All Research
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={paper.pdfUrl}
              download={`${paper.slug}.pdf`}
              className="text-[var(--text)] font-medium"
            >
              Download PDF
            </a>
            <ThemeToggle />
          </div>
        </header>

        {/* Paper Header */}
        <article className="space-y-10 text-[15px] leading-relaxed">
          <header className="space-y-4">
            <div className="text-[12px] uppercase font-mono tracking-wider text-[var(--text-muted)]">
              Area {paper.areaNumber}: {paper.areaTitle}
            </div>

            <h1 className="text-[22px] md:text-[26px] font-semibold leading-tight tracking-tight text-[var(--text)]">
              {paper.title}
            </h1>

            <div className="text-[13px] text-[var(--text-muted)] space-y-1 pt-1">
              <p className="text-[var(--text)] font-semibold tracking-wide">
                {paper.authors}
              </p>
              <p>Computer Scientist · {paper.affiliation}</p>
              <p className="font-mono text-[12px] pt-1 text-[var(--text-subtle)]">
                {paper.date} · Working Paper
              </p>
            </div>
          </header>

          {/* Structured Abstract Block */}
          <section className="border-y border-[var(--border)] py-6 space-y-3 bg-[var(--bg)]" aria-label="Abstract">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Abstract
            </h2>
            <div className="space-y-2 text-[14px] leading-relaxed text-[var(--text)]">
              <p>
                <strong className="font-semibold text-[var(--text)]">Background: </strong>
                {paper.abstract.background}
              </p>
              <p>
                <strong className="font-semibold text-[var(--text)]">Objective: </strong>
                {paper.abstract.objective}
              </p>
              <p>
                <strong className="font-semibold text-[var(--text)]">Methods: </strong>
                {paper.abstract.methods}
              </p>
              <p>
                <strong className="font-semibold text-[var(--text)]">Results: </strong>
                {paper.abstract.results}
              </p>
              <p>
                <strong className="font-semibold text-[var(--text)]">Conclusion: </strong>
                {paper.abstract.conclusion}
              </p>
            </div>
            <div className="text-[13px] text-[var(--text-muted)] pt-2">
              <span className="font-medium text-[var(--text)]">Keywords: </span>
              {paper.keywords.join(', ')}
            </div>
          </section>

          {/* Table of Contents */}
          <nav aria-label="Table of Contents" className="p-4 border border-[var(--border)] rounded text-[13px] space-y-2">
            <div className="font-semibold text-[13px] text-[var(--text)] uppercase tracking-wider font-mono">
              Contents
            </div>
            <ul className="space-y-1 list-none p-0 m-0">
              {paper.sections.map((sec) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                    {sec.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#declarations" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  Declarations
                </a>
              </li>
              <li>
                <a href="#references" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  References
                </a>
              </li>
              <li>
                <a href="#cite" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  Cite This Paper
                </a>
              </li>
            </ul>
          </nav>

          {/* Paper Body Sections */}
          <div className="space-y-10">
            {paper.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="space-y-4">
                <h2 className="text-[17px] font-semibold text-[var(--text)] pt-2 border-b border-[var(--border-subtle)] pb-1">
                  {sec.title}
                </h2>

                <div className="space-y-3">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                {sec.table && (
                  <div className="my-6 overflow-x-auto border border-[var(--border)] rounded p-2">
                    <caption className="block text-left text-[12px] font-medium text-[var(--text-muted)] mb-2 px-1">
                      {sec.table.caption}
                    </caption>
                    <table className="w-full text-left text-[13px] border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--border)]">
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-2 px-3 font-semibold text-[var(--text)]">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((r, rIdx) => (
                          <tr key={rIdx} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--border-subtle)]/30">
                            {r.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2 px-3 text-[var(--text-muted)]">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Declarations */}
            <section id="declarations" className="space-y-3 border-t border-[var(--border)] pt-8">
              <h2 className="text-[16px] font-semibold text-[var(--text)]">
                Declarations
              </h2>
              <div className="space-y-2 text-[13px] text-[var(--text-muted)]">
                <p>
                  <strong className="text-[var(--text)]">Conflict of Interest: </strong>
                  {paper.declarations.conflictOfInterest}
                </p>
                <p>
                  <strong className="text-[var(--text)]">Funding: </strong>
                  {paper.declarations.funding}
                </p>
                <p>
                  <strong className="text-[var(--text)]">Data Availability: </strong>
                  {paper.declarations.dataAvailability}
                </p>
                <p>
                  <strong className="text-[var(--text)]">AI-Assistance Disclosure: </strong>
                  {paper.declarations.aiAssistance}
                </p>
              </div>
            </section>

            {/* References */}
            <section id="references" className="space-y-4 border-t border-[var(--border)] pt-8">
              <h2 className="text-[16px] font-semibold text-[var(--text)]">
                References
              </h2>
              <ol className="space-y-2 text-[13px] text-[var(--text-muted)] pl-4 list-decimal">
                {paper.references.map((ref, rIdx) => (
                  <li key={rIdx} className="leading-relaxed">
                    {ref}
                  </li>
                ))}
              </ol>
            </section>

            {/* Cite This Paper Block */}
            <section id="cite" className="border-t border-[var(--border)] pt-8">
              <CiteBlock apa={paper.apa} bibtex={paper.bibtex} />
            </section>

            {/* More Research Navigation */}
            <section className="border-t border-[var(--border)] pt-8 space-y-4">
              <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                More Research
              </h3>
              <div className="space-y-3">
                {otherPapers.map((op) => (
                  <div key={op.slug} className="flex items-baseline justify-between gap-4 text-[14px]">
                    <Link href={`/research/${op.slug}`} className="hover:text-[var(--text)]">
                      {op.title}
                    </Link>
                    <span className="text-[12px] font-mono text-[var(--text-subtle)] shrink-0">
                      Area {op.areaNumber}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>

        {/* Minimal Footer */}
        <footer className="border-t border-[var(--border)] pt-6 pb-12 text-[12px] text-[var(--text-subtle)] flex justify-between font-mono">
          <span>BERNARD FIAGBENU</span>
          <span>Accra, GMT</span>
        </footer>
      </main>
    </div>
  );
}
