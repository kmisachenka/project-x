const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  poweredByHeader: false,
  publicRuntimeConfig: {
    apiEndpoint: isProduction ? '/graphql' : 'http://localhost:4000/graphql',
  },
};
