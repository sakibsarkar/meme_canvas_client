/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placeimg.com", "example.com","res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeimg.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
