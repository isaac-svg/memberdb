/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["example.com", "github.com"],
    unoptimized: true,
  },
};

export default nextConfig;
