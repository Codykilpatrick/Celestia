import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const ITEMS_QUERY = gql`
  query itemsQuery {
    allItems {
      nodes {
        id
        itemName
      }
    }
  }
`;

function Items() {
  const { loading, error, data } = useQuery(ITEMS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { allItems } = data;

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {allItems.nodes.map((item: any) => (
          <li key={item.id}>{item.itemName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
