/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'webpack-graphql-loader',
    })
    return config
  },
  ...nextConfig,
}
