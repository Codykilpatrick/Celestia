import React from 'react';
const { gql } = require('@apollo/client');
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import client from '@/apollo/apollo-client';
import {
  ALL_PREDICTIONS_QUERY,
  ITEM_HISTORY_QUERY,
  ALL_ITEMS_QUERY,
  ALL_LOCATIONS_QUERY,
} from '@/apollo/graphql-queries';

interface PredictionNode {
  id: string;
  regionId: string;
  increase: boolean;
  horizon: string;
  confidence: number;
  datePredicted: string;
  typeId: number;
}

interface ItemNode {
  id: string;
  itemName: string;
}

interface LocationNode {
  id: string;
  regionId: string;
  regionName: string;
}

interface HomeProps {
  predictions: {
    allModelPredictAverageIncreases: {
      edges: {
        node: PredictionNode;
      }[];
    };
  }[];
  itemNames: {
    allItems: {
      edges: {
        node: ItemNode;
      }[];
    };
  }[];
  locationNames: {
    allLocations: {
      edges: {
        node: LocationNode;
      }[];
    };
  }[];
}

const Home = ({ predictions, itemNames, locationNames }: HomeProps) => {
  return (
    <div className="w-full">
      <Header />
      <Hero predictions={predictions} itemNames={itemNames} locationNames={locationNames} />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
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
      locationNames: [locationNames],
    },
  };
}

export default Home;
