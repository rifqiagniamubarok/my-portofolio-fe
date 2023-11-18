/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {},
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'localhost', 'api.rifqiagniamubarok.com'],
  },
};

module.exports = nextConfig;
