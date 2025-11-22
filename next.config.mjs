/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Allow Unsplash
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // Allow Imgur (if you use it)
      },
    ],
  },
};

module.exports = nextConfig;