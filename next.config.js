/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  reactStrictMode: false, // Turn this off for now for better debugging
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
