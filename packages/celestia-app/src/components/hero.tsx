const Hero = () => {
  const items = ['item', 'item', 'item', 'item', 'item'];
  return (
    <div className="h-full mx-12">
      <div className="bg-violet-dark-3 h-72 mt-16 text-mauve-dark-11">GRAPH</div>
      <div className="bg-violet-dark-3 mt-16">
        {items.map((item) => (
          <div key={item} className="text-mauve-dark-11 ">{item}</div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
