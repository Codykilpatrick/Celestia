import Graph from './graph';

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
  typeId: string;
}

interface HeroProps {
  predictions: {
    allModelPredictAverageIncreases: {
      edges: {
        node: PredictionNode;
      }[];
    };
  }[];
  prices: GLfloat;
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

const Hero = ({ predictions, prices, itemNames, locationNames }: HeroProps) => {
  const itemMap: Record<string, string> = {};
  const locationMap: Record<string, string> = {};

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
        <Graph prices={prices} />
      </div>
      <div className="bg-violet-3 mt-16 rounded-lg">
        <div className="flex justify-center ">
          <div className="mx-4 text-mauve-12">Filter by Region</div>
          <div className="mx-4 text-mauve-12">Search Item</div>
        </div>
        <div className="overflow-x-auto">
          {' '}
          {/* Add this div for horizontal scrolling */}
          <table className="w-full table-auto text-mauve-12 m-2">
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
                <tr key={prediction.id}>
                  <td className="border px-4 py-2">{prediction.locationName}</td>
                  <td className="border px-4 py-2">{prediction.increase ? 'True' : 'False'}</td>
                  <td className="border px-4 py-2">{prediction.horizon}</td>
                  <td className="border px-4 py-2">{prediction.confidence}</td>
                  <td className="border px-4 py-2">{prediction.datePredicted}</td>
                  <td className="border px-4 py-2">{prediction.itemName}</td>
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
