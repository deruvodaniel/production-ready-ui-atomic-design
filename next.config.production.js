const repoBasePath = process.env.NEXT_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export only for production Vercel builds
  output: 'export',
  eslint: { 
    ignoreDuringBuilds: true 
  },
  images: { 
    unoptimized: true 
  },
  trailingSlash: true,
  basePath: repoBasePath || undefined,
  assetPrefix: repoBasePath || undefined,
  
  webpack: config => {
    config.cache = { type: 'memory' };
    return config;
  },
  
  // Production optimizations
  experimental: {
    optimizeCss: true,
  }
};

module.exports = nextConfig;
