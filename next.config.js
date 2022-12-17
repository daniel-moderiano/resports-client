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
      "vod-secure.twitch.tv",
      "yt3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
