import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://bernardfiagbenu.ai';
  const currentDate = new Date();

  return [
    {
      url: `${siteUrl}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/research`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
