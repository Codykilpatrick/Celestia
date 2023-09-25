const { ApolloClient, InMemoryCache } = require('@apollo/client')

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

export default client;
