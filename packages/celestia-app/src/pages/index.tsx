import React from 'react';
const { gql } = require('@apollo/client');
import Hero from '@/components/hero';
import client from '@/apollo/apollo-client';

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
  typeId: string;
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

const Home = ({ itemNames, locationNames }: HomeProps) => {
  return (
    <div className="w-full hover:cursor-default">
      <Hero itemNames={itemNames} locationNames={locationNames} />
    </div>
  );
};

export async function getStaticProps() {
  const { data: itemNames } = await client.query({
    query: gql`
      query allItems {
        allItems {
          edges {
            node {
              itemName
              typeId
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
      itemNames: [itemNames],
      locationNames: [locationNames],
    },
  };
}

export default Home;
