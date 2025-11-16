/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Optimize build performance
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce memory usage during build
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'three', 'framer-motion'],
  },
};

export default nextConfig;
