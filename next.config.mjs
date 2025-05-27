/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["https://coopers-page.vercel.app"], // Opcional: para imagens de outros domínios
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_TO: process.env.EMAIL_TO,
  }
};

export default nextConfig;