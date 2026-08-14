import type { NextConfig } from "next";
import path from "path";

const basePath = process.env.BASE_PATH ?? "";
const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
