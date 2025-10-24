import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty object tells Next “I’m fine with Turbopack”
  turbopack: {},

  // If later you need to transpile libs, add them here:
  // transpilePackages: ["@wormhole-foundation/wormhole-connect"]
};

export default nextConfig;
