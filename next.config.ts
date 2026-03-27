import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // <--- ADD THIS
  images: {
    unoptimized: true,   // <--- ADD THIS (required for static sites)
  },
};

export default nextConfig;