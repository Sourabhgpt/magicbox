/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "development" ? '' : process.env.NEXT_PUBLIC_BASE_URL
};

module.exports = nextConfig
