/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.BACKEND_URL,
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'localhost'],
  },
};

module.exports = nextConfig;
