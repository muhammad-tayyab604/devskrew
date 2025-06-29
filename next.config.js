/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Disable SWC and use Babel instead for WebContainer compatibility
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
  // Use webpack for transformations instead of SWC
  webpack: (config, { dev, isServer }) => {
    // Fallback to Babel for transformations
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });
    
    return config;
  },
};

module.exports = nextConfig;