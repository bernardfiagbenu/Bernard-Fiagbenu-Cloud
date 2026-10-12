import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/research/brain-computer-interfaces',
        destination: '/research',
        permanent: true,
      },
      {
        source: '/research/ethical-hacking-ghana',
        destination: '/research',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/#about',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/#projects',
        permanent: true,
      },
    ];
  },
  async headers() {
    const isVercelProduction = process.env.VERCEL_ENV === 'production';
    const securityHeaders = [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ];

    // If on a Vercel preview/branch deployment, prevent indexing
    if (process.env.VERCEL_ENV && !isVercelProduction) {
      securityHeaders.push({
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow',
      });
    }

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/papers/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(ico|png|jpg|jpeg|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
