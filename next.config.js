const repoBasePath = process.env.NEXT_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: repoBasePath || undefined,
  assetPrefix: repoBasePath || undefined,
  webpack: (config) => {
    config.cache = { type: 'memory' };
    return config;
  },
};

module.exports = nextConfig;
