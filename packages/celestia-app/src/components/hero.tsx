const Hero = (allItems) => {
  const myItems = allItems.allItems[0].allItems.edges.slice(0, 5)
  return (
    <div className="h-full mx-12">
      <div className="bg-violet-3 h-72 mt-16 text-mauve-11 rounded-lg">GRAPH</div>
      <div className="bg-violet-3 mt-16 rounded-lg">
        <div className="flex justify-center ">
          <div className="mx-4 text-mauve-12">Filter by Region</div>
          <div className="mx-4 text-mauve-12 ">Search Item</div>
        </div>
        <div>
        {myItems.map((item) => (
          <div key={item.node.itemName} className="text-mauve-12 py-2">{item.node.itemName}</div>
          ))}
          </div>
      </div>
    </div>
  );
};

export default Hero;