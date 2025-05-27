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
};

export default nextConfig;