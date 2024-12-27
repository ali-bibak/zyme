export const baseConfig = {
  featureFlags: {
    ai: true,
  },
  localization: "en-US",
  settings: { theme: "dark", itemsPerPage: 20, enableNotifications: true },
  errorHandling: {
    retryAttempts: 3,
    fallbackURL: "/error",
  },
  caching: {
    cacheDuration: 3600, // in seconds
    cacheBusting: true,
  },
};
