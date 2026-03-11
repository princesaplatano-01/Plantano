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
}

export default nextConfig
