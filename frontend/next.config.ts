import type { NextConfig } from "next";

/**
 * Next.js configuration adjusted to avoid runtime "image optimization using the default loader
 * is not compatible with `output: export`" error in static export builds.
 * Explicitly disables image optimization loader for static export.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Disable optimization to be compatible with static export.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
