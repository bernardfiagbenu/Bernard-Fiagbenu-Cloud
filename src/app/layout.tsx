import type { Metadata } from 'next';
import { SITE_URL, DEFAULT_META } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_META.defaultTitle,
    template: DEFAULT_META.titleTemplate,
  },
  description: DEFAULT_META.description,
  applicationName: 'BERNARD FIAGBENU',
  authors: [{ name: 'BERNARD FIAGBENU', url: SITE_URL }],
  creator: 'BERNARD FIAGBENU',
  publisher: 'BERNARD FIAGBENU',
  category: 'Science & Technology',
  keywords: [
    'Bernard Fiagbenu',
    'Computer Scientist',
    'Artificial Intelligence',
    'Telecommunications',
    'Ghana',
    'Machine Learning',
    'Academic Portfolio',
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: DEFAULT_META.defaultTitle,
    description: DEFAULT_META.description,
    url: SITE_URL,
    siteName: 'BERNARD FIAGBENU',
    locale: 'en_US',
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
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_META.defaultTitle,
    description: DEFAULT_META.description,
    images: [`${SITE_URL}/bernard-fiagbenu-portrait.jpg`],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash inline script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
