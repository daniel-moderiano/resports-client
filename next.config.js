/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "static-cdn.jtvnw.net",
      "yt3.ggpht.com",
      "lh3.googleusercontent.com",
      "i.ytimg.com",
    ],
  },
};

module.exports = nextConfig;
