const { ApolloClient, InMemoryCache } = require('@apollo/client');

const client = new ApolloClient({
  uri: 'https://celestia-api.fly.dev/graphql',
  cache: new InMemoryCache(),
});

export default client;
