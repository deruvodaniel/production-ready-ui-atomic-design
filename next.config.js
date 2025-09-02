/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    // Avoid filesystem cache rename issues in some environments
    config.cache = { type: 'memory' };
    return config;
  },
};

module.exports = nextConfig;
