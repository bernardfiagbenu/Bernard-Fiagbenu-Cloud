/**
 * SEO Single Source of Truth for Bernard Fiagbenu's Academic Portfolio
 * Strictly zero email addresses, verified canonicals and structured schema.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://bernardfiagbenu.vercel.app';
export const SITE_NAME = 'BERNARD FIAGBENU';

export interface PersonSchema {
  name: string;
  jobTitle: string;
  sameAs: string[];
  affiliation?: string;
  orcid?: string;
  knowsAbout: string[];
}

export const PERSON: PersonSchema = {
  name: 'BERNARD FIAGBENU',
  jobTitle: 'Computer Scientist',
  sameAs: [
    'https://github.com/bernardfiagbenu',
    'https://www.linkedin.com/in/bernard-fiagbenu-26b50b19a/',
  ],
  knowsAbout: [
    'Artificial Intelligence & Computing',
    'Telecommunications & Engineering',
    'Educational Technology & E-Learning',
    'Supply Chain, Blockchain & Maritime Logistics',
    'Renewable Energy & Sustainability',
  ],
};

export const DEFAULT_META = {
  titleTemplate: '%s | BERNARD FIAGBENU',
  defaultTitle: 'BERNARD FIAGBENU | Computer Scientist',
  description:
    'Academic portfolio and research papers of BERNARD FIAGBENU, Computer Scientist in Ghana. Investigating artificial intelligence, telecommunications, edtech, and logistics.',
};
