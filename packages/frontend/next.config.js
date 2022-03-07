const { withSentryConfig } = require('@sentry/nextjs');
const { i18n } = require('./next-i18next.config');

module.exports = withSentryConfig(
  /** @type {import('next').NextConfig} */
  {
    i18n,
    reactStrictMode: true
  },
  {
    silent: true
  }
);
