/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    // domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo**',
      },
      {
        protocol: 'https',
        hostname: 'tmp-riad.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/exterior/**',
      },
      {
        protocol: 'https',
        hostname: 'tmp-riad.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/interior/**',
      },
    ],
  },
};

module.exports = nextConfig;
