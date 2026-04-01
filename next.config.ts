import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "conturelle.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "www.conturelle.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "conturelleinternational.com",
      },
      {
        protocol: "https",
        hostname: "www.conturelleinternational.com",
      },
      {
        protocol: "https",
        hostname: "felina.de",
      },
      {
        protocol: "https",
        hostname: "www.felina.de",
      },
    ],
  },
};

export default nextConfig;
