import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  /* config options here */
  
  output: 'standalone',
  experimental: {
    reactCompiler: true,
  },
  eslint: {
  ignoreDuringBuilds: true,  // 빌드 시 ESLint 무시
  },
  reactCompiler: true,
  pageExtensions: ['page.tsx', 'page.ts', 'tsx', 'ts'],
  
  webpack: (config) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /\.stories\.(tsx|ts)$/,
      })
    );
    
    return config;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.namu.wiki',
        port: '',
        pathname: '/i/**', // 특정 경로만 허용
      },
      {
        protocol: 'https',
        hostname: 'd3qr7nnlhj7oex.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;