import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/terminal/site",
        destination: "/terminal/site/index.html",
        permanent: false,
      },
      {
        source: "/terminal/site/",
        destination: "/terminal/site/index.html",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/terminal/shots/:path*",
        destination: "/terminal/site/shots/:path*",
      },
    ];
  },
};

export default nextConfig;
