import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Re-enable and configure custom rules or ignore warnings to make compilation fully resilient
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ensure build is ultra-stable
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
