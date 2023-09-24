import React from 'react';
const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

const Home = ({ predictions, prices, itemNames, locationNames }) => {
  console.log(locationNames);
  
  return (
    <div className="w-full">
      <Header />
      <Hero predictions={predictions} prices={prices} itemNames={itemNames} locationNames={locationNames}/>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
  });

  const { data: predictions } = await client.query({
    query: gql`
      query allPredictions {
        allModelPredictAverageIncreases(condition: { regionId: 10000043, increase: false }) {
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
    `,
  });

  const { data: prices } = await client.query({
    query: gql`
      query itemHistoryById {
        allMarketHistoryPulls(condition: { regionId: 10000043, typeId: 597 }, orderBy: DATE_ASC) {
          edges {
            node {
              typeId
              regionId
              average
              date
              highest
              lowest
            }
          }
        }
      }
    `,
  });

const { data: itemNames } = await client.query({
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
  `,
});

const { data: locationNames } = await client.query({
  query: gql`
    query allLocations {
      allLocations {
        edges {
          node {
            id
            regionId
            regionName
          }
        }
      }
    }
  `,
});

  return {
    props: {
      predictions: [predictions],
      prices: [prices],
      itemNames: [itemNames],
      locationNames: [locationNames]
    },
  };
}

export default Home;
