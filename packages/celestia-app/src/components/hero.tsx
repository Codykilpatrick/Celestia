const Hero = () => {
  const items = ['item', 'item', 'item', 'item', 'item'];
  return (
    <div className="h-full mx-12">
      <div className="bg-violet-3 h-72 mt-16 text-mauve-11 rounded-lg">GRAPH</div>
      <div className="bg-violet-3 mt-16 rounded-lg">
        <div className="flex justify-center ">
          <div className="mx-4 text-mauve-12">Filter by Region</div>
          <div className="mx-4 text-mauve-12 ">Search Item</div>
        </div>
        <div>
        {items.map((item) => (
          <div key={item} className="text-mauve-12 py-2">{item}</div>
          ))}
          </div>
      </div>
    </div>
  );
};

export default Hero;