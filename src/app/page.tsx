import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PAPERS } from '@/lib/papers';
import { SITE_URL, PERSON } from '@/lib/seo';
import ThemeToggle from '@/components/ThemeToggle';
import NameReveal from '@/components/NameReveal';
import TextScramble from '@/components/TextScramble';
import HeroCanvas from '@/components/HeroCanvas';
import CustomCursor from '@/components/CustomCursor';
import AccraClock from '@/components/AccraClock';
import ScrollLineDraw from '@/components/ScrollLineDraw';

export const metadata: Metadata = {
  title: 'BERNARD FIAGBENU | Computer Scientist',
  description:
    'Academic portfolio and research of Bernard Fiagbenu, Computer Scientist in Ghana. Investigating artificial intelligence, telecommunications, and energy systems.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'BERNARD FIAGBENU | Computer Scientist',
    description:
      'Academic portfolio and research of Bernard Fiagbenu, Computer Scientist in Ghana. Investigating artificial intelligence, telecommunications, and energy systems.',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/bernard-fiagbenu-portrait.jpg`,
        width: 480,
        height: 640,
        alt: 'Portrait of Bernard Fiagbenu',
      },
    ],
  },
};

interface Project {
  title: string;
  subtitle: string;
  liveUrl: string;
  description: string;
  bulletPoints: string[];
  tags: string[];
}

const projects: Project[] = [
  {
    title: 'China Xpress',
    subtitle: 'Shipment Tracking Web Application',
    liveUrl: 'https://shipingtracker.vercel.app/',
    description:
      'Full-stack web platform for China-Ghana logistics that lets clients track supplier packages in real time by tracking number, with a secure staff portal for back-end management.',
    bulletPoints: [
      'Built instant tracking-number status lookup and supplier tracking integration to improve supply chain transparency for cross-border freight.',
      'Implemented an administrative staff gateway for managing shipment records.',
      'Deployed on Vercel.',
    ],
    tags: [
      'Full-Stack Development',
      'Web Application',
      'Frontend Development',
      'Vercel',
      'UI/UX Design',
      'Logistics & Supply Chain',
    ],
  },
];

export default function HomePage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: PERSON.name,
    jobTitle: PERSON.jobTitle,
    url: SITE_URL,
    image: `${SITE_URL}/bernard-fiagbenu-portrait.jpg`,
    description:
      'Bernard Fiagbenu is a computer scientist based in Ghana working on artificial intelligence, telecommunications, educational technology, supply chain, and renewable energy.',
    sameAs: PERSON.sameAs,
    knowsAbout: PERSON.knowsAbout,
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'BERNARD FIAGBENU',
    author: {
      '@id': `${SITE_URL}/#person`,
    },
  };

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    mainEntity: {
      '@id': `${SITE_URL}/#person`,
    },
  };

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'China Xpress',
    url: 'https://shipingtracker.vercel.app/',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Full-stack shipment tracking platform for China-Ghana logistics with real-time tracking number status lookup and staff administrative portal.',
    author: {
      '@id': `${SITE_URL}/#person`,
    },
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--text)] selection:text-[var(--bg)]">
      <CustomCursor />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <main className="max-w-[680px] mx-auto px-6 py-12 md:py-20 space-y-16">
        {/* Header: Name and Theme Toggle */}
        <header className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
          <div>
            <NameReveal />
            <TextScramble />
          </div>
          <ThemeToggle />
        </header>

        {/* Section Navigation Anchors */}
        <nav aria-label="Sections" className="text-[13px] text-[var(--text-muted)] flex gap-4 -mt-8 font-mono">
          <a href="#about" className="hover:text-[var(--text)]">About</a>
          <a href="#research" className="hover:text-[var(--text)]">Research</a>
          <a href="#projects" className="hover:text-[var(--text)]">Projects</a>
          <a href="#contact" className="hover:text-[var(--text)]">Contact</a>
        </nav>

        {/* Section 1: About */}
        <section id="about" className="space-y-6 relative stagger-reveal">
          <div className="relative">
            <HeroCanvas />

            <div className="space-y-6">
              {/* Profile Photo: Passport style, IN COLOUR (only colored element on site) */}
              <div>
                <picture>
                  <source srcSet="/profile.webp" type="image/webp" />
                  <source srcSet="/bernard-fiagbenu-portrait.jpeg" type="image/jpeg" />
                  <Image
                    src="/bernard-fiagbenu-portrait.jpg"
                    alt="Portrait of Bernard Fiagbenu"
                    width={160}
                    height={213}
                    priority
                    className="w-[128px] h-[171px] md:w-[160px] md:h-[213px] object-cover portrait-reveal"
                  />
                </picture>
              </div>

              {/* Direct, first-person narrative */}
              <div className="space-y-3 text-[15px] leading-relaxed">
                <p>
                  I am Bernard Fiagbenu, a computer scientist working on artificial intelligence, telecommunications, educational technology, supply chain and energy systems, with a focus on applications in Ghana.
                </p>
                <p className="text-[var(--text-muted)] text-[14px]">
                  I develop software platforms and investigate applied computational methods to address operational constraints across emerging markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ScrollLineDraw />

        {/* Section 2: Research */}
        <section id="research" className="space-y-6 stagger-reveal">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[14px] font-semibold tracking-wide uppercase text-[var(--text-muted)] font-mono">
              Research
            </h2>
            <Link
              href="/research"
              className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] font-mono"
            >
              All Papers &rarr;
            </Link>
          </div>

          <div className="space-y-8">
            {PAPERS.map((paper) => (
              <article key={paper.slug} className="space-y-2 group research-row">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[12px] font-mono uppercase tracking-wider text-[var(--text-muted)] row-num">
                    {paper.areaNumber}. {paper.areaTitle}
                  </span>
                </div>

                <div className="text-[15px] font-medium leading-snug">
                  <Link
                    href={`/research/${paper.slug}`}
                    className="hover:text-[var(--text)] row-title"
                  >
                    {paper.title}
                  </Link>
                </div>

                <div className="flex items-center gap-4 text-[13px] pt-1">
                  <Link
                    href={`/research/${paper.slug}`}
                    className="text-[var(--text)] font-medium"
                  >
                    Read
                  </Link>
                  <span className="text-[var(--text-subtle)]">/</span>
                  <a
                    href={paper.pdfUrl}
                    download={`${paper.slug}.pdf`}
                    className="text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    PDF
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Institutional Context Line (Flagged for Review) */}
          <div className="pt-4 border-t border-[var(--border-subtle)] text-[12px] text-[var(--text-subtle)] leading-relaxed">
            <span className="font-mono uppercase text-[11px] block text-[var(--text-muted)] mb-1">
              Institutional Context (For Review):
            </span>
            Research in this portfolio is connected to AI research activity at GCTU, supported by the Google DeepMind AI Research Foundation Grant awarded to the university.
          </div>
        </section>

        <ScrollLineDraw />

        {/* Section 3: Projects */}
        <section id="projects" className="space-y-6 stagger-reveal">
          <h2 className="text-[14px] font-semibold tracking-wide uppercase text-[var(--text-muted)] font-mono">
            Projects
          </h2>

          <div className="space-y-8">
            {projects.map((project) => (
              <article key={project.title} className="space-y-2">
                <div>
                  <h3 className="text-[15px] font-semibold inline">
                    {project.title}
                  </h3>
                  <span className="text-[14px] text-[var(--text-muted)] ml-2">
                    ({project.subtitle})
                  </span>
                </div>

                <div className="text-[13px] font-mono">
                  <span className="text-[var(--text-muted)]">Live: </span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.liveUrl}
                  </a>
                </div>

                <p className="text-[14px] leading-relaxed text-[var(--text)]">
                  {project.description}
                </p>

                <ul className="list-disc list-inside space-y-1 text-[13px] text-[var(--text-muted)] pl-1">
                  {project.bulletPoints.map((point, index) => (
                    <li key={index} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>

                <p className="text-[12px] font-mono text-[var(--text-subtle)] pt-1">
                  Tags: {project.tags.join(' / ')}
                </p>
              </article>
            ))}
          </div>
        </section>

        <ScrollLineDraw />

        {/* Section 4: Contact */}
        <section id="contact" className="space-y-4 stagger-reveal">
          <h2 className="text-[14px] font-semibold tracking-wide uppercase text-[var(--text-muted)] font-mono">
            Contact
          </h2>

          <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
            I am available for technical discussions, research collaborations, and engineering inquiries.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            <a
              href="https://github.com/bernardfiagbenu"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/bernard-fiagbenu-26b50b19a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="border-t border-[var(--border)] pt-6 pb-12 text-[12px] text-[var(--text-subtle)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono">
          <div className="space-x-4">
            <span>BERNARD FIAGBENU</span>
            <span className="text-[var(--border)]">|</span>
            <span>Computer Scientist</span>
          </div>
          <div className="flex items-center gap-4">
            <AccraClock />
            <span className="text-[var(--text-subtle)] hidden sm:inline" title="Shortcut">
              [press &apos;t&apos; to toggle theme]
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
