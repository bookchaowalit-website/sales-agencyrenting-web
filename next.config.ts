import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      // The old portfolio link page now lives on the main site.
      { source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true },
    ];
  },
};

export default nextConfig;
