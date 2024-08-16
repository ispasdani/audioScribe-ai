/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "kindly-finch-810.convex.cloud",
      },
      { protocol: "https", hostname: "img.clerk.com" },
      {
        protocol: "https",
        hostname: "loyal-gerbil-2.convex.cloud", // Add this line
      },
    ],
  },
};

export default nextConfig;
