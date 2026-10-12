import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { PAPERS } from '@/lib/papers';

export default function sitemap(): MetadataRoute.Sitemap {
  const stableLastModified = new Date('2026-10-11T00:00:00Z');

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: stableLastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [`${SITE_URL}/bernard-fiagbenu-portrait.jpg`],
    },
    {
      url: `${SITE_URL}/research`,
      lastModified: stableLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Paper routes
  PAPERS.forEach((paper) => {
    routes.push({
      url: `${SITE_URL}/research/${paper.slug}`,
      lastModified: new Date(`${paper.isoDate}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.85,
    });

    // PDF files
    routes.push({
      url: `${SITE_URL}${paper.pdfUrl}`,
      lastModified: new Date(`${paper.isoDate}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
