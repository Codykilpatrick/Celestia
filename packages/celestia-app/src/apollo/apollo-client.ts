const { ApolloClient, InMemoryCache } = require('@apollo/client');

const uri = process.env.NODE_ENV === 'production' ? 'https://celestia-api.fly.dev/graphql' : 'http://localhost:8080/graphql';

console.log('uri', uri);

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;