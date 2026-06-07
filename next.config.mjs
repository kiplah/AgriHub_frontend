/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["encrypted-tbn0.gstatic.com","via.placeholder.com"],
      },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
