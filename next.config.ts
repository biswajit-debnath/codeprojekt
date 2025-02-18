import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: { unoptimized: true },
  // basePath: '/codeprojekt-demo',
  // assetPrefix: '/codeprojekt-demo/',
  
};

// Note: When using custom domains, you need to set the basePath and assetPrefix to empty strings.

export default nextConfig;
