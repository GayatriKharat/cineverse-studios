import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH ?? "";
// Static HTML export for GitHub Pages / Hostinger shared hosting.
// Hostinger Node.js apps should leave OUTPUT_EXPORT unset so /api/contact works.
const isExport =
  process.env.OUTPUT_EXPORT === "true" ||
  (process.env.GITHUB_ACTIONS === "true" && process.env.DEPLOY_TARGET !== "node");

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : {}),
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
