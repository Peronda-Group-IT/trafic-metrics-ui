/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/route",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "172.10.7.185",
      },
      {
        protocol: "https",
        hostname: "cerahub.perondagroup.com",
      },
    ],
  },
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
