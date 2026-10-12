import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PAPERS } from '@/lib/papers';
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
  const description = `${paper.abstract.objective} ${paper.abstract.fiveProblemsSentence}`.slice(0, 155);

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
    abstract: `${paper.abstract.background} ${paper.abstract.objective} ${paper.abstract.fiveProblemsSentence} ${paper.abstract.artifactBuiltSentence} ${paper.abstract.conclusion}`,
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
              Area {paper.areaNumber}: {paper.areaTitle} &middot; Problem-to-Solution Paper
            </div>

            <h1 className="text-[22px] md:text-[26px] font-semibold leading-tight tracking-tight text-[var(--text)]">
              {paper.title}
            </h1>

            <div className="text-[13px] text-[var(--text-muted)] space-y-1 pt-1">
              <p className="text-[var(--text)] font-semibold tracking-wide">
                {paper.authors}
              </p>
              <p>Computer Scientist &middot; {paper.affiliation}</p>
              <p className="font-mono text-[12px] pt-1 text-[var(--text-subtle)]">
                {paper.date} &middot; Peer-Reviewed Working Paper &middot; Open Artifact
              </p>
            </div>
          </header>

          {/* Structured Abstract Block */}
          <section className="border-y border-[var(--border)] py-6 space-y-3 bg-[var(--bg)]" aria-label="Abstract">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
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
                <strong className="font-semibold text-[var(--text)]">Results & Top 5 Problems: </strong>
                {paper.abstract.results} {paper.abstract.fiveProblemsSentence}
              </p>
              <p>
                <strong className="font-semibold text-[var(--text)]">Tangible Artifact: </strong>
                {paper.abstract.artifactBuiltSentence}
              </p>
              <p>
                <strong className="font-semibold text-[var(--text)]">Conclusion: </strong>
                {paper.abstract.conclusion}
              </p>
            </div>
            <div className="text-[13px] text-[var(--text-muted)] pt-2 font-mono">
              <span className="font-medium text-[var(--text)]">Keywords: </span>
              {paper.keywords.join(', ')}
            </div>
          </section>

          {/* Table of Contents */}
          <nav aria-label="Table of Contents" className="p-4 border border-[var(--border)] rounded text-[13px] space-y-2">
            <div className="font-semibold text-[13px] text-[var(--text)] uppercase tracking-wider font-mono">
              Contents
            </div>
            <ul className="space-y-1 list-none p-0 m-0 font-mono text-[12px]">
              <li>
                <a href="#problem-landscape" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  1. Problem Landscape & Evidence-Based Ranking
                </a>
              </li>
              <li>
                <a href="#theory-to-solution" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  2. From Theory to Tangible Solution (Subsections 5.1 &ndash; 5.5)
                </a>
              </li>
              <li>
                <a href="#theory-to-practice-ladder" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  3. Theory-to-Practice Ladder Diagram
                </a>
              </li>
              <li>
                <a href="#summary-solutions" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  4. Summary Table of Solutions
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  5. National Implementation Roadmap
                </a>
              </li>
              <li>
                <a href="#declarations" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  6. Declarations
                </a>
              </li>
              <li>
                <a href="#references" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  7. References
                </a>
              </li>
              <li>
                <a href="#cite" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                  8. Cite This Paper
                </a>
              </li>
            </ul>
          </nav>

          {/* SECTION 1: Problem Landscape */}
          <section id="problem-landscape" className="space-y-6">
            <h2 className="text-[18px] font-semibold text-[var(--text)] border-b border-[var(--border-subtle)] pb-2">
              1. Problem Landscape: The Top 5 Challenges Facing Ghana
            </h2>

            <div className="space-y-3">
              {paper.problemLandscapeNarrative.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Ranking Criteria */}
            <div className="p-4 border border-[var(--border-subtle)] rounded bg-[var(--bg)] space-y-2">
              <h3 className="text-[13px] font-semibold text-[var(--text)] uppercase tracking-wider font-mono">
                Evidence-Based Problem Ranking Criteria
              </h3>
              <ul className="list-disc list-inside space-y-1 text-[13px] text-[var(--text-muted)]">
                {paper.rankingCriteria.map((crit, cIdx) => (
                  <li key={cIdx}>{crit}</li>
                ))}
              </ul>
            </div>

            {/* Candidate Scoring Matrix Table */}
            <div className="overflow-x-auto border border-[var(--border)] rounded p-2">
              <caption className="block text-left text-[12px] font-medium text-[var(--text-muted)] mb-2 px-1 font-mono">
                Table 1: Ranked Evaluation of National Problem Candidates in {paper.areaTitle}
              </caption>
              <table className="w-full text-left text-[12px] border-collapse font-mono">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-2 px-2 text-[var(--text)]">Rank</th>
                    <th className="py-2 px-2 text-[var(--text)]">Candidate Problem</th>
                    <th className="py-2 px-1 text-center text-[var(--text)]">Impact (10)</th>
                    <th className="py-2 px-1 text-center text-[var(--text)]">Urgency (10)</th>
                    <th className="py-2 px-1 text-center text-[var(--text)]">Evidence (10)</th>
                    <th className="py-2 px-1 text-center text-[var(--text)]">Tractability (10)</th>
                    <th className="py-2 px-1 text-center font-bold text-[var(--text)]">Total (40)</th>
                  </tr>
                </thead>
                <tbody>
                  {paper.candidateProblems.map((prob) => (
                    <tr key={prob.rank} className="border-b border-[var(--border-subtle)] hover:bg-[var(--border-subtle)]/30">
                      <td className="py-2 px-2 font-bold">{prob.rank}</td>
                      <td className="py-2 px-2">
                        <span className="font-sans font-medium text-[13px] block text-[var(--text)]">{prob.name}</span>
                        <span className="text-[11px] text-[var(--text-muted)] font-sans">Source: {prob.evidenceSource}</span>
                      </td>
                      <td className="py-2 px-1 text-center">{prob.impactScore}</td>
                      <td className="py-2 px-1 text-center">{prob.urgencyScore}</td>
                      <td className="py-2 px-1 text-center">{prob.evidenceScore}</td>
                      <td className="py-2 px-1 text-center">{prob.tractabilityScore}</td>
                      <td className="py-2 px-1 text-center font-bold text-[var(--text)]">{prob.totalScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 2: From Theory to Tangible Solution */}
          <section id="theory-to-solution" className="space-y-12 border-t border-[var(--border)] pt-8">
            <h2 className="text-[18px] font-semibold text-[var(--text)] border-b border-[var(--border-subtle)] pb-2">
              2. From Theory to Tangible Solution (Subsections 5.1 &ndash; 5.5)
            </h2>

            {paper.solutions.map((sol) => (
              <div key={sol.subNumber} className="space-y-6 p-4 border border-[var(--border)] rounded bg-[var(--bg)]">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[16px] font-semibold text-[var(--text)]">
                    {sol.subNumber}. {sol.problemTitle}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 border border-[var(--border)] rounded text-[var(--text)]">
                    {sol.tangibleArtifact.maturity}
                  </span>
                </div>

                {/* a. Root Cause Analysis */}
                <div className="space-y-1 text-[14px]">
                  <h4 className="font-mono text-[12px] uppercase text-[var(--text-muted)] font-semibold">
                    a. Root-Cause Analysis
                  </h4>
                  <p className="text-[var(--text)] leading-relaxed">
                    {sol.rootCauseAnalysis}
                  </p>
                </div>

                {/* b. Theoretical Foundation */}
                <div className="space-y-1 text-[14px]">
                  <h4 className="font-mono text-[12px] uppercase text-[var(--text-muted)] font-semibold">
                    b. Theoretical Foundation
                  </h4>
                  <p className="text-[var(--text)] leading-relaxed">
                    {sol.theoreticalFoundation}
                  </p>
                </div>

                {/* c. Proposed Solution and SVG Architecture */}
                <div className="space-y-2 text-[14px]">
                  <h4 className="font-mono text-[12px] uppercase text-[var(--text-muted)] font-semibold">
                    c. Proposed Technical Solution & System Architecture
                  </h4>
                  <p className="text-[var(--text)] leading-relaxed">
                    {sol.proposedSolution}
                  </p>
                  <div
                    className="py-2"
                    dangerouslySetInnerHTML={{ __html: sol.architectureSvg }}
                  />
                </div>

                {/* d. Tangible Artifact */}
                <div className="p-3 border border-[var(--border)] rounded bg-[var(--border-subtle)]/20 space-y-1 text-[13px]">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-[var(--text)] font-mono text-[12px]">
                      d. Tangible Artifact: {sol.tangibleArtifact.name}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">
                      Maturity: {sol.tangibleArtifact.maturity}
                    </span>
                  </div>
                  <p className="text-[var(--text-muted)]">
                    {sol.tangibleArtifact.description}
                  </p>
                  <div className="pt-1 font-mono text-[11px]">
                    <span className="text-[var(--text-muted)]">Artifact Location: </span>
                    <span className="text-[var(--text)] font-semibold">{sol.tangibleArtifact.path}</span>
                  </div>
                </div>

                {/* e. Validation */}
                <div className="space-y-1 text-[13px]">
                  <h4 className="font-mono text-[12px] uppercase text-[var(--text-muted)] font-semibold">
                    e. Validation Protocol & Success Threshold
                  </h4>
                  <p className="text-[var(--text)]">
                    <strong className="text-[var(--text)]">Method: </strong>
                    {sol.validation.method}
                  </p>
                  <p className="text-[var(--text-muted)]">
                    <strong className="text-[var(--text)]">Metrics & Threshold: </strong>
                    {sol.validation.metrics} &mdash; {sol.validation.successThreshold}
                  </p>
                </div>

                {/* f. Implementation Pathway for Ghana */}
                <div className="space-y-2 text-[13px] border-t border-[var(--border-subtle)] pt-3">
                  <h4 className="font-mono text-[12px] uppercase text-[var(--text-muted)] font-semibold">
                    f. Implementation Pathway for Ghana
                  </h4>
                  <p>
                    <strong className="text-[var(--text)]">Key Stakeholders: </strong>
                    {sol.implementationPathway.stakeholders.join(', ')}
                  </p>
                  <p>
                    <strong className="text-[var(--text)]">Estimated Budget (USD / GHS): </strong>
                    <span className="font-mono">{sol.implementationPathway.costEstimate}</span>
                  </p>
                  <div className="space-y-1 pl-2 border-l border-[var(--border)] text-[12px] text-[var(--text-muted)]">
                    <p>{sol.implementationPathway.phases.phase1}</p>
                    <p>{sol.implementationPathway.phases.phase2}</p>
                    <p>{sol.implementationPathway.phases.phase3}</p>
                  </div>
                  <p className="pt-1 text-[12px]">
                    <strong className="text-[var(--text)]">Risks & Mitigation: </strong>
                    {sol.implementationPathway.risksAndMitigation}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* SECTION 3: Theory to Practice Ladder */}
          <section id="theory-to-practice-ladder" className="space-y-4 border-t border-[var(--border)] pt-8">
            <h2 className="text-[18px] font-semibold text-[var(--text)]">
              3. Theory-to-Practice Ladder
            </h2>
            <p className="text-[14px] text-[var(--text-muted)]">
              Synthesis diagram mapping each identified national problem to its theoretical basis, concrete system architecture, tangible artifact, and current empirical maturity level.
            </p>
            <div
              className="py-2"
              dangerouslySetInnerHTML={{ __html: paper.theoryToPracticeLadderSvg }}
            />
          </section>

          {/* SECTION 4: Summary Table of Solutions */}
          <section id="summary-solutions" className="space-y-4 border-t border-[var(--border)] pt-8">
            <h2 className="text-[18px] font-semibold text-[var(--text)]">
              4. Summary Table of Solutions
            </h2>
            <div className="overflow-x-auto border border-[var(--border)] rounded p-2">
              <table className="w-full text-left text-[12px] border-collapse font-mono">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    {paper.summaryTableOfSolutions.headers.map((h, idx) => (
                      <th key={idx} className="py-2 px-2 text-[var(--text)] font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paper.summaryTableOfSolutions.rows.map((r, rIdx) => (
                    <tr key={rIdx} className="border-b border-[var(--border-subtle)] hover:bg-[var(--border-subtle)]/30">
                      {r.map((cell, cIdx) => (
                        <td key={cIdx} className="py-2 px-2 text-[var(--text-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 5: National Roadmap */}
          <section id="roadmap" className="space-y-4 border-t border-[var(--border)] pt-8">
            <h2 className="text-[18px] font-semibold text-[var(--text)]">
              5. National Implementation Roadmap
            </h2>
            <div className="space-y-3 text-[14px] leading-relaxed">
              {paper.roadmapNarrative.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </section>

          {/* SECTION 6: Declarations */}
          <section id="declarations" className="space-y-3 border-t border-[var(--border)] pt-8">
            <h2 className="text-[16px] font-semibold text-[var(--text)]">
              6. Declarations
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
                <strong className="text-[var(--text)]">Data & Artifact Availability: </strong>
                {paper.declarations.dataAvailability}
              </p>
              <p>
                <strong className="text-[var(--text)]">AI-Assistance Disclosure: </strong>
                {paper.declarations.aiAssistance}
              </p>
            </div>
          </section>

          {/* SECTION 7: References */}
          <section id="references" className="space-y-4 border-t border-[var(--border)] pt-8">
            <h2 className="text-[16px] font-semibold text-[var(--text)]">
              7. References (APA 7)
            </h2>
            <ol className="space-y-2 text-[13px] text-[var(--text-muted)] pl-4 list-decimal font-sans">
              {paper.references.map((ref, rIdx) => (
                <li key={rIdx} className="leading-relaxed">
                  {ref}
                </li>
              ))}
            </ol>
          </section>

          {/* SECTION 8: Cite This Paper */}
          <section id="cite" className="border-t border-[var(--border)] pt-8">
            <CiteBlock apa={paper.apa} bibtex={paper.bibtex} />
          </section>

          {/* More Research Navigation */}
          <section className="border-t border-[var(--border)] pt-8 space-y-4">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              More Research & Artifacts
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
