import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wolfey.s-ul.eu'
      },
    ]
  },
  allowedDevOrigins: [
    'local-origin.dev',
    '*.local-origin.dev',
    '1teqlmguc8jo22e7h7ma974sq655pbiqjfpijlcuic0k8d0thkch'
  ],
};

export default nextConfig;
