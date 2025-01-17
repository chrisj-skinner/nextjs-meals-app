/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.AWS_BUCKET_HOST,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
