/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  systemvars: true,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    loader: 'akamai',
    path: '../public',
  },
}

module.exports = nextConfig
