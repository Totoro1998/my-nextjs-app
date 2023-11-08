/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cache.modooplay.com",
        port: "",
        pathname: "/imagen-ui/**",
      },
    ],
  },
};

module.exports = nextConfig;
