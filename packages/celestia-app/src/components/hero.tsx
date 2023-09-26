import Graph from './graph';
import { useState, useEffect } from 'react';
import { ALL_PREDICTIONS_QUERY } from '@/apollo/graphql-queries';
const { useQuery } = require('@apollo/client');

interface LocationNode {
  regionId: string;
  regionName: string;
}

interface Prediction {
  id: string;
  regionId: string;
  increase: boolean;
  horizon: string;
  confidence: number;
  datePredicted: string;
  typeId: number;
  locationName: string;
  itemName: string;
}

interface HeroProps {
  itemNames: {
    allItems: {
      edges: {
        node: {
          id: string;
          itemName: string;
        };
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

const Hero = ({ itemNames, locationNames }: HeroProps) => {
  const itemMap: Record<string, string> = {};
  const locationMap: Record<string, string> = {};
  const [currentItem, setCurrentItem] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentRegionId, setCurrentRegionId] = useState<number>(10000043);

  const [currentItemName, setCurrentItemName] = useState<string | undefined>();

  const handleItemClick = (itemId: number, itemName: string) => {
    setCurrentItem(itemId);
    setCurrentItemName(itemName);
  };

  const {
    data: predictions,
    error,
    refetch,
  } = useQuery(ALL_PREDICTIONS_QUERY, {
    variables: { regionId: currentRegionId },
  });

  useEffect(() => {
    if (predictions) {
      setIsLoading(false);
    }
  }, [predictions]);

  useEffect(() => {
    refetch({ regionId: currentRegionId });
  }, [currentRegionId, refetch]);

  if (isLoading) {
    return (
      <div className="h-96 p-2 flex justify-center">
        <div className="flex flex-col justify-center">Please Select an item from below...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 p-2">
        <div>Error: {error.message}</div>
      </div>
    );
  }

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  locationNames[0].allLocations.edges.forEach(({ node }) => {
    locationMap[node.regionId] = capitalizeWords(node.regionName);
  });

  itemNames[0].allItems.edges.forEach(({ node }) => {
    itemMap[node.id] = node.itemName;
  });

  const newPredictions = predictions?.allModelPredictAverageIncreases?.edges || [];
  const firstPrediction = newPredictions[0]?.node;

  if (!firstPrediction) {
    return <div>No predictions available for this region.</div>;
  }

  const predictionsWithItemNames = newPredictions.map(({ node }) => ({
    ...node,
    itemName: itemMap[node.typeId],
    locationName: locationMap[node.regionId],
  }));

  return (
    <div className="h-full mx-12">
      <div className="bg-violet-3 mt-16 text-mauve-11 rounded-lg overflow-hidden">
        <Graph currentItem={currentItem} currentItemName={currentItemName} />
      </div>
      <div className="bg-violet-3 mt-16 rounded-lg">
        <div className="flex justify-center pt-4">
          <div className="mx-4">
            <label htmlFor="regionSelect" className="text-mauve-12">
              Filter by Region:
            </label>
            <select
              id="regionSelect"
              value={currentRegionId}
              onChange={(e) => setCurrentRegionId(parseInt(e.target.value))}
              className="bg-violet-7 ml-2 rounded-lg"
            >
              <option value={10000043}>Domain</option>
              <option value={10000002}>The Forge</option>
              <option value={10000030}>Heimatar</option>
              <option value={10000032}>Sinq Laison</option>
              <option value={10000042}>Metropolis</option>
            </select>
          </div>
          <div className="mx-4 text-mauve-12">Search Item</div>
        </div>
        <div className="flex justify-center">
          {' '}
          <table className="w-full table-auto text-mauve-12 mx-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Region</th>
                <th className="px-4 py-2">Increase</th>
                <th className="px-4 py-2">Horizon</th>
                <th className="px-4 py-2">Confidence</th>
                <th className="px-4 py-2">Date predicted</th>
                <th className="px-4 py-2">Item name</th>
              </tr>
            </thead>
            <tbody>
              {predictionsWithItemNames.map((prediction: Prediction) => (
                <tr key={prediction.id} className="mx-2">
                  <td className="border px-4 py-2">{prediction.locationName}</td>
                  <td className="border px-4 py-2">{prediction.increase ? 'True' : 'False'}</td>
                  <td className="border px-4 py-2">{prediction.horizon}</td>
                  <td className="border px-4 py-2">{prediction.confidence}</td>
                  <td className="border px-4 py-2">{prediction.datePredicted}</td>
                  <td className="border px-4 py-2">
                    {' '}
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleItemClick(prediction.typeId, prediction.itemName)}
                    >
                      {prediction.itemName}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Hero;
