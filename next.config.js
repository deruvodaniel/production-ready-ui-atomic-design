/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  trailingSlash: false,
  async redirects() {
    return [{ source: '/storybook', destination: '/storybook/index.html', permanent: true }];
  },
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/storybook/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800' },
        ],
      },
    ];
  },
  webpack: config => {
    config.cache = { type: 'memory' };
    return config;
  },
};

module.exports = nextConfig;
