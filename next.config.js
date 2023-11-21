/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  publicRuntimeConfig: {},
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'localhost', 'api.rifqiagniamubarok.com'],
  },
};

module.exports = nextConfig;
