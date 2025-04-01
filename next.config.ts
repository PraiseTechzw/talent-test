import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/register',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
