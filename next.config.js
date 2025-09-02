/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  trailingSlash: false,
  async redirects() {
    return [{ source: '/storybook', destination: '/storybook/index.html', permanent: true }];
  },
  webpack: config => {
    config.cache = { type: 'memory' };
    return config;
  },
};

module.exports = nextConfig;
