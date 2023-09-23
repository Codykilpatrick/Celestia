import React from 'react';
const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');


const Home = ({allItems}) => {
  console.log('all Items', allItems)
  return (
    <div className="w-full">
      Celestia
    </div>
  );
};

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query allItems {
        allItems {
          edges {
            node {
              id
              itemName
            }
          }
        }
      }
    `
  });

  return {
    props: {
      allItems: [data]
    }
  }
}

export default Home;