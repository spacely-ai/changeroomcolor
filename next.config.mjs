/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow image host
  images: {
    remotePatterns: [
      { hostname: "upcdn.io" },
      { hostname: "storage.googleapis.com" },
    ],
  },
};

export default nextConfig;
