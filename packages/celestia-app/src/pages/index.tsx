import React from 'react';
const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';


const Home = ({allItems}) => {
  return (
    <div className="w-full">
      <Header />
      <Hero allItems={allItems}/>
      <Footer />
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