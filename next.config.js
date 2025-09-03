const repoBasePath = process.env.NEXT_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export
  output: undefined,
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production', // Only ignore in production
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Only use basePath in production
  basePath: process.env.NODE_ENV === 'production' ? repoBasePath : undefined,
  assetPrefix: process.env.NODE_ENV === 'production' ? repoBasePath : undefined,

  webpack: config => {
    // Use filesystem cache in development, memory in production
    config.cache =
      process.env.NODE_ENV === 'development' ? { type: 'filesystem' } : { type: 'memory' };

    return config;
  },

  experimental: {
    // Better CSS handling
    optimizeCss: false,
  },
};

module.exports = nextConfig;
