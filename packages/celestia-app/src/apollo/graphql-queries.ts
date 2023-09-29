const { gql } = require('@apollo/client');

export const ALL_PREDICTIONS_QUERY = gql`
  query allPredictionsById($regionId: Int!) {
    allModelPredictAverageIncreases(condition: { regionId: $regionId, increase: false }) {
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
`;

export const ITEM_HISTORY_QUERY = gql`
  query itemHistoryById($typeId: Int!, $regionId: Int!) {
    allMarketHistoryPulls(condition: { regionId: $regionId, typeId: $typeId }, orderBy: DATE_ASC) {
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
`;

export const ALL_ITEMS_QUERY = gql`
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
`;

export const ALL_LOCATIONS_QUERY = gql`
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
`;
