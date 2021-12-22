const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  /** @type {import('next').NextConfig} */
  {
    reactStrictMode: true,
  },
  {
    silent: true,
  }
);
