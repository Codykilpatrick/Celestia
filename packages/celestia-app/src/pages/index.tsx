import React from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const Home = ({launches}) => {
  console.log('launches', launches)
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphiql',
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
      launches: [data]
    }
  }
}

export default Home;
