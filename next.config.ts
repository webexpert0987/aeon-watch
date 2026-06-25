import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals = config.externals || []
    return config
  },
}

export default nextConfig
