import React from 'react';
const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';


const Home = ({predictions}) => {
  return (
    <div className="w-full">
      <Header />
      <Hero predictions={predictions}/>
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
      query allPredictions {
      allModelPredictAverageIncreases(condition: { regionId: 10000043, increase: true }) {
        totalCount
        edges {
          node {
            id
            regionId
            increase
            horizon
            confidence
            datePredicted
            typeId
          }
        }
      }
    }
    `
  });
  
  return {
    props: {
      predictions: [data]
    }
  }
}

export default Home;