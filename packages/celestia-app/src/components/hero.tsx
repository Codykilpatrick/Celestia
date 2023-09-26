import Graph from './graph';
import { useState } from 'react';

interface LocationNode {
  regionId: string;
  regionName: string;
}

interface PredictionNode {
  id: string;
  regionId: string;
  increase: boolean;
  horizon: string;
  confidence: number;
  datePredicted: string;
  typeId: number;
}

interface HeroProps {
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

const Hero = ({ predictions, itemNames, locationNames }: HeroProps) => {
  const itemMap: Record<string, string> = {};
  const locationMap: Record<string, string> = {};
  const [currentItem, setCurrentItem] = useState<number | undefined>();
  const [selectedOption, setSelectedOption] = useState('10000043');
  console.log(selectedOption);
  
  const [currentItemName, setCurrentItemName] = useState<string | undefined>();

  const handleItemClick = (itemId: number, itemName: string) => {
    setCurrentItem(itemId);
    setCurrentItemName(itemName);
  };

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  locationNames[0].allLocations.edges.forEach(({ node }) => {
    locationMap[node.regionId] = capitalizeWords(node.regionName);
  });

  itemNames[0].allItems.edges.forEach(({ node }) => {
    itemMap[node.id] = node.itemName;
  });

  const predictionsWithItemNames = predictions[0].allModelPredictAverageIncreases.edges.map(({ node }) => ({
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
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className='bg-violet-7 ml-2 rounded-lg'
            >
              <option value="">Select a Region</option>
              <option value="10000043">Domain</option>
              <option value="10000002">The Forge</option>
              <option value="10000030">Heimatar</option>
              <option value="10000032">Sinq Laison</option>
              <option value="10000042">Metropolis</option>
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
              {predictionsWithItemNames.map((prediction) => (
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
