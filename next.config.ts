import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH ?? "";
const isExport = process.env.OUTPUT_EXPORT === "true" || process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : {}),
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
