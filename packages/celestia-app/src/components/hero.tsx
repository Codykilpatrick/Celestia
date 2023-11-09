import Graph from './graph';
import { useState, useEffect } from 'react';
import { ALL_PREDICTIONS_QUERY } from '@/apollo/graphql-queries';
const { useQuery } = require('@apollo/client');
import * as Tooltip from '@radix-ui/react-tooltip';
import { ArrowUpIcon, ArrowDownIcon, CaretSortIcon, ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

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
          typeId: string;
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
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPredictions, setFilteredPredictions] = useState<Prediction[]>([]);
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSort = (column: string) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const renderSortingIndicator = (column: string) => {
    if (column === sortBy) {
      return sortOrder === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />;
    } else {
      return <CaretSortIcon />;
    }
  };

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
    itemMap[node.typeId] = node.itemName;
  });

  const newPredictions = predictions?.allModelPredictAverageIncreases?.edges || [];
  const firstPrediction = newPredictions[0]?.node;

  if (!firstPrediction) {
    return (
      <div className="h-96 p-2 flex justify-center">
        <div className="flex flex-col justify-center">No predictions available for this region.</div>
      </div>
    );
  }

  const predictionsWithItemNames = newPredictions.map(({ node }: { node: Prediction }) => ({
    ...node,
    itemName: itemMap[node.typeId],
    locationName: locationMap[node.regionId],
  }));

  const totalPages = Math.floor(predictionsWithItemNames.length / itemsPerPage);

  let sortedPredictions = [...predictionsWithItemNames].sort((a, b) => {
    if (sortBy === 'locationName') {
      return sortOrder === 'asc'
        ? a.locationName.localeCompare(b.locationName)
        : b.locationName.localeCompare(a.locationName);
    } else if (sortBy === 'increase') {
      return sortOrder === 'asc' ? a.increase - b.increase : b.increase - a.increase;
    } else if (sortBy === 'itemName') {
      return sortOrder === 'asc' ? a.itemName.localeCompare(b.itemName) : b.itemName.localeCompare(a.itemName);
    } else if (sortBy === 'datePredicted') {
      return sortOrder === 'asc'
        ? a.datePredicted.localeCompare(b.datePredicted)
        : b.datePredicted.localeCompare(a.datePredicted);
    } else {
      return 0;
    }
  });

  sortedPredictions = sortedPredictions.slice(
    itemsPerPage * currentPage - 1,
    currentPage * itemsPerPage + itemsPerPage,
  );

  const changeRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy('');
    setSortOrder('asc');
    setCurrentRegionId(parseInt(event.target.value));
  };

  const handleSearch = (searchQuery: string) => {
    const filtered = predictionsWithItemNames.filter(
      (prediction: Prediction) => prediction.itemName?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredPredictions(filtered.slice(0, 10));
  };

  return (
    <div className="h-full mx-12">
      <div className="bg-plum-3 mt-8 rounded-lg overflow-hidden">
        <Graph currentItem={currentItem} currentItemName={currentItemName} currentRegionId={currentRegionId} />
      </div>
      <div className="bg-plum-3 mt-8 rounded-lg">
        <div className="flex justify-center items-center pt-4 flex-col sm:flex-row">
          <div className="mx-4 my-4 sm:my-0 flex flex-col sm:flex-row">
            <label htmlFor="regionSelect" className="text-gray-11">
              Filter by Region:
            </label>
            <select
              id="regionSelect"
              value={currentRegionId}
              onChange={(event) => changeRegion(event)}
              className="bg-plum-5 hover:bg-plum-6 ml-2 rounded-lg border-plum-8 border-2"
            >
              <option value={10000043}>Domain</option>
              <option value={10000002}>The Forge</option>
              <option value={10000030}>Heimatar</option>
              <option value={10000032}>Sinq Laison</option>
              <option value={10000042}>Metropolis</option>
            </select>
          </div>
          <div className="mx-4 text-gray-11 my-4 sm:my-0 flex flex-col sm:flex-row">
            <label htmlFor="searchItem">Search Item:</label>
            <input
              className="bg-plum-5 hover:bg-plum-6 rounded-lg ml-2 text-gray-12 border-plum-8 border-2"
              type="text"
              id="searchItem"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex w-full justify-center my-2">
          <button
            className="px-2 disabled:text-gray-9 flex flex-row items-center text-gray-11"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage == 1}
          >
            <ArrowLeftIcon />
            <span className="mx-1">Previous</span>
          </button>
          <div className="text-gray-11">
            {currentPage} of {totalPages}
          </div>
          <button
            className="px-2 disabled:text-gray-9 flex flex-row items-center text-gray-11"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage == totalPages}
          >
            <span className="mx-1">Next</span>
            <ArrowRightIcon />
          </button>
        </div>
        <div className="flex justify-center">
          {' '}
          <table className="w-full table-auto text-gray-11 mx-4 mb-4">
            <thead>
              <tr className="grid grid-flow-col auto-cols-max grid-cols-3 md:grid-cols-9">
                <th className="sm:px-0 px-4 py-2 hidden md:block">
                  <div className="flex items-center">
                    <span
                      onClick={() => handleSort('locationName')}
                      className="hover:cursor-pointer hover:text-gray-12"
                    >
                      Region
                    </span>
                    {renderSortingIndicator('locationName')}
                  </div>
                </th>
                <th className="sm:px-0 px-4 py-2">
                  <div className="flex items-center">
                    <span onClick={() => handleSort('increase')} className="hover:cursor-pointer hover:text-gray-12">
                      Increase
                    </span>
                    {renderSortingIndicator('increase')}
                  </div>
                </th>
                <th className="sm:px-0 px-4 py-2 hidden md:block">Horizon</th>
                <th className=" py-2 hidden md:block">Confidence</th>
                <th className="px-4 py-2">
                  <div className="flex items-center">
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <span
                            onClick={() => handleSort('datePredicted')}
                            className="hover:cursor-pointer hover:text-gray-12"
                          >
                            Date
                          </span>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="bg-plum-5 rounded-md text-gray-12 p-2 border-plum-7 border-2"
                            sideOffset={5}
                          >
                            The date this prediction was generated.
                            <Tooltip.Arrow className="fill-white" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                    {renderSortingIndicator('datePredicted')}
                  </div>
                </th>
                <th className="px-4 py-2 col-span-4">
                  <div className="flex items-center">
                    <span onClick={() => handleSort('itemName')} className="hover:cursor-pointer hover:text-gray-12">
                      Item Name
                    </span>
                    {renderSortingIndicator('itemName')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="border border-plum-8">
              {searchTerm
                ? filteredPredictions.map((prediction: Prediction) => (
                    <tr
                      key={prediction.id}
                      className="text-gray-11 grid grid-flow-col auto-cols-max grid-cols-3 md:grid-cols-9"
                    >
                      <td className="border border-plum-8 p-2 hidden md:block">{prediction.locationName}</td>
                      <td className="border border-plum-8 p-2">{prediction.increase ? 'True' : 'False'}</td>
                      <td className="border border-plum-8 p-2 hidden md:block">{prediction.horizon}</td>
                      <td className="border border-plum-8 p-2 hidden md:block">{prediction.confidence}</td>
                      <td className="border border-plum-8 p-2">{prediction.datePredicted}</td>
                      <td className="border border-plum-8 p-2 text-center overflow-hidden col-span-4">
                        {' '}
                        <button
                          className="hover:text-gray-12 hover:underline"
                          onClick={() => handleItemClick(prediction.typeId, prediction.itemName)}
                        >
                          {prediction.itemName}
                        </button>
                      </td>
                    </tr>
                  ))
                : sortedPredictions.map((prediction: Prediction) => (
                    <tr
                      key={prediction.id}
                      className=" text-gray-11 grid grid-flow-col auto-cols-max grid-cols-3 md:grid-cols-9"
                    >
                      <td className="border border-plum-8 p-2 hidden md:block">{prediction.locationName}</td>
                      <td className="border border-plum-8 p-2">{prediction.increase ? 'True' : 'False'}</td>
                      <td className="border border-plum-8 p-2 hidden md:block">{prediction.horizon}</td>
                      <td className="border border-plum-8 p-2 hidden md:block">{prediction.confidence}</td>
                      <td className="border border-plum-8 p-2">{prediction.datePredicted}</td>
                      <td className="border border-plum-8 p-2 text-center overflow-hidden col-span-4">
                        {' '}
                        <button
                          className="hover:text-gray-12 hover:underline text-sm sm:text-base"
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
