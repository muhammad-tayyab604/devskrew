/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Configure for WebContainer environment
  experimental: {
    // Use the JavaScript fallback for SWC
    useWasmBinary: true,
  },
  // Override SWC target to use WASM
  swcMinify: true,
  compiler: {
    // Force SWC to use WASM instead of native binaries
    styledComponents: true,
  },
};

module.exports = nextConfig;