const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

const defaultConfig = {
  poweredByHeader: false,
  publicRuntimeConfig: {
    apiEndpoint: isProduction ? '/graphql' : 'http://localhost:4000/graphql',
  },
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
  },
};

module.exports = withPlugins([withBundleAnalyzer({})], defaultConfig);
