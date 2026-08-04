import type { NextConfig } from "next";

const isGhPages = process.env.GH_PAGES === "1";
const basePath = isGhPages ? "/save-dogs-showcase" : "";

const nextConfig: NextConfig = {
  ...(isGhPages ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
};

export default nextConfig;
