import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /** Enables View Transitions API integration with navigations (see portfolio-v2.css `view-transition-name` on works slides / case-study heroes). */
    viewTransition: true,
  },
  headers: async () => [
    {
      source: "/favicon.ico",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate",
        },
      ],
    },
    {
      source: "/icon.svg",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate",
        },
      ],
    },
  ],
};

export default nextConfig;
