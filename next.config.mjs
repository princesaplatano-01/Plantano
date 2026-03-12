/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // `swcMinify` is no longer a supported top-level option in some Next.js
  // releases; remove to avoid invalid config warnings. Set `turbopack.root`
  // to ensure Turbopack resolves the workspace root correctly.
  turbopack: {
    root: '.'
  },
  // Allow dev server to serve _next assets to the LAN IP used by your phone.
  // Replace or add additional origins if your phone's IP changes.
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
  allowedDevOrigins: [
    "http://192.168.20.172:3000",
    "http://192.168.68.118:3000"
  ],
}

export default nextConfig
