import path from "node:path";

/** @type {import('next').NextConfig} */
const workspaceRoot = path.resolve(__dirname, "../..");

const nextConfig = {
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
