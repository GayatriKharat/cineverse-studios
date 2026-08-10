import type { NextConfig } from "next";
import path from "path";
const basePath = process.env.BASE_PATH ?? "";
const nextConfig: NextConfig = { output: "export", trailingSlash: true, basePath, assetPrefix: basePath, images: { unoptimized: true }, outputFileTracingRoot: path.join(process.cwd()) };
export default nextConfig;
