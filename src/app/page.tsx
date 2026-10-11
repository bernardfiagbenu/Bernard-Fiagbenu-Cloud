import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

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
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <main className="max-w-[680px] mx-auto px-6 py-12 md:py-20 space-y-16">
        {/* Header */}
        <header className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
          <div>
            <h1 className="text-[17px] font-semibold tracking-tight">
              Bernard Fiagbenu
            </h1>
            <p className="text-[13px] text-[var(--text-muted)] mt-0.5">
              Computer Scientist · Ghana
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Navigation Anchors */}
        <nav aria-label="Sections" className="text-[13px] text-[var(--text-muted)] flex gap-4 -mt-8">
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Section 1: About */}
        <section id="about" className="space-y-4">
          <h2 className="text-[14px] font-semibold tracking-wide uppercase text-[var(--text-muted)]">
            About
          </h2>

          <div className="space-y-4">
            {/* Passport-style 3:4 portrait photo, left-aligned, above the text */}
            <div>
              <picture>
                <source srcSet="/profile.webp" type="image/webp" />
                <Image
                  src="/profile.jpg"
                  alt="Portrait of Bernard Fiagbenu"
                  width={160}
                  height={213}
                  priority
                  className="w-[128px] h-[171px] md:w-[160px] md:h-[213px] object-cover"
                />
              </picture>
            </div>

            <div className="space-y-2 text-[15px] leading-relaxed">
              <p>
                I am a computer scientist based in Ghana. I build software systems
                and research artificial intelligence, with a focus on deep learning, natural language processing,
                and its practical impact on the Ghanaian economy.
              </p>
              <p className="text-[var(--text-muted)] text-[14px]">
                My work centers on solving real-world constraints in emerging markets, including low-resource
                languages, cross-border freight transparency, and resilient distributed applications.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Research */}
        <section id="research" className="space-y-4 border-t border-[var(--border)] pt-12">
          <h2 className="text-[14px] font-semibold tracking-wide uppercase text-[var(--text-muted)]">
            Research
          </h2>

          <div className="space-y-3">
            <p className="text-[15px] leading-relaxed">
              Artificial Intelligence (AI) and Machine Learning: Emphasizing deep learning models, natural language processing, and generative AI research, further boosted by institutional programs like the Google DeepMind AI Research Foundation Grant.
            </p>

            <div className="text-[14px] space-y-1 pt-1">
              <p className="font-medium text-[var(--text)]">
                Artificial Intelligence and Machine Learning in Ghana&apos;s Economy: Opportunities in Deep Learning, Natural Language Processing, and Generative AI
              </p>
              <div className="flex items-center gap-4 text-[13px] pt-1">
                <Link href="/research">
                  Read online
                </Link>
                <a href="/research-paper.pdf" download="Bernard_Fiagbenu_AI_Ghana_Research_Paper.pdf">
                  Read the paper (PDF)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Projects */}
        <section id="projects" className="space-y-6 border-t border-[var(--border)] pt-12">
          <h2 className="text-[14px] font-semibold tracking-wide uppercase text-[var(--text-muted)]">
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

                <div className="text-[13px]">
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

                <p className="text-[12px] text-[var(--text-subtle)] pt-1">
                  {project.tags.join(' / ')}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Section 4: Contact */}
        <section id="contact" className="space-y-4 border-t border-[var(--border)] pt-12 pb-8">
          <h2 className="text-[14px] font-semibold tracking-wide uppercase text-[var(--text-muted)]">
            Contact
          </h2>

          <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
            I am available for research collaborations, engineering consultations, and technical inquiries.
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
        <footer className="border-t border-[var(--border)] pt-6 pb-12 text-[12px] text-[var(--text-subtle)] flex justify-between">
          <span>Bernard Fiagbenu</span>
          <span>Accra, Ghana</span>
        </footer>
      </main>
    </div>
  );
}
