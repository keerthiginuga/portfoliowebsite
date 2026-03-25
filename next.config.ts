import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /** Enables View Transitions API integration with navigations (see portfolio-v2.css `view-transition-name` on works slides / case-study heroes). */
    viewTransition: true,
  },
};

export default nextConfig;
