'use client';

import { useState } from 'react';

interface CiteBlockProps {
  apa: string;
  bibtex: string;
}

export default function CiteBlock({ apa, bibtex }: CiteBlockProps) {
  const [tab, setTab] = useState<'apa' | 'bibtex'>('apa');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = tab === 'apa' ? apa : bibtex;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="border border-[var(--border)] rounded p-4 space-y-3 bg-[var(--bg)]">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-[13px]">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[var(--text)] uppercase tracking-wider font-mono text-[12px]">
            Cite This Paper
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab('apa')}
              className={`text-[12px] font-mono px-2 py-0.5 rounded ${
                tab === 'apa'
                  ? 'bg-[var(--text)] text-[var(--bg)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              APA 7
            </button>
            <button
              type="button"
              onClick={() => setTab('bibtex')}
              className={`text-[12px] font-mono px-2 py-0.5 rounded ${
                tab === 'bibtex'
                  ? 'bg-[var(--text)] text-[var(--bg)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              BibTeX
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="text-[12px] font-mono underline hover:text-[var(--text)] text-[var(--text-muted)] cursor-pointer"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="font-mono text-[12px] leading-relaxed text-[var(--text-muted)] overflow-x-auto whitespace-pre-wrap select-all">
        {tab === 'apa' ? apa : bibtex}
      </div>
    </div>
  );
}
