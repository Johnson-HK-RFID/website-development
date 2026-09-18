import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
  agentRules: false,
  experimental: { globalNotFound: true },
  // Include native image libraries that are loaded dynamically by Sharp.
  outputFileTracingIncludes: { "/*": ["./node_modules/@img/sharp-*/**/*"] },
  poweredByHeader: false,
  // Keep the original English URLs. Native rewrites avoid a Next 16 proxy
  // origin mismatch when standalone binds to a different host than the request.
  async rewrites() {
    return { beforeFiles: [
      { source: "/", destination: "/en" },
      { source: "/:path((?!zh-HK(?:/|$)|en(?:/|$)|api(?:/|$)|_next(?:/|$)|opengraph-image|.*\\.).+)", destination: "/en/:path" },
    ] };
  },
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path+", destination: "/:path+", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
    ] }];
  }
};
export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
