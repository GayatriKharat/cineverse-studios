import type { NextConfig } from "next";
import path from "path";

const basePath = process.env.BASE_PATH ?? "";
const isExport = process.env.OUTPUT_EXPORT === "true" || process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : { output: "standalone" }),
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
