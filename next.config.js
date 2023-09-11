/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: process.env.API_URL + "api/:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
