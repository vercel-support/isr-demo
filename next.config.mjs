const nextConfig = {
  // Enable logging to see cache behavior
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Enable server actions for server-side data fetching
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;

