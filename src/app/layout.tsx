import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bernard Fiagbenu',
  description: 'Computer Scientist based in Ghana. Focused on applied deep learning, natural language processing, and supply chain software.',
  metadataBase: new URL('https://bernardfiagbenu.ai'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Bernard Fiagbenu',
    description: 'Computer Scientist based in Ghana.',
    url: 'https://bernardfiagbenu.ai',
    siteName: 'Bernard Fiagbenu',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Bernard Fiagbenu',
    description: 'Computer Scientist based in Ghana.',
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
      <body>
        {children}
      </body>
    </html>
  );
}
