import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: [
    "page.tsx",
    "page.ts",
  ],
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
