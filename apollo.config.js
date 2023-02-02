module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'lt-test-gql',
      url: 'http://localhost:3001/graphql',
    },
  },
};
