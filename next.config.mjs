/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping99.in',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'images.meesho.com',
      },
      {
        protocol: 'https',
        hostname: 'rukminim2.flixcart.com',
      }
    ],
  },
};

export default nextConfig;
