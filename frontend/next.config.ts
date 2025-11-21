import type { NextConfig } from "next";

/**
 * Next.js configuration adjusted to avoid runtime "image optimization using the default loader
 * is not compatible with `output: export`" error in static export builds.
 * We explicitly disable the image optimization loader by setting images.unoptimized = true,
 * while preserving allowed remote hosts for next/image.
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

export default nextConfig;
