const Graph = ({prices}) => {  
  console.log("LATER", prices[0].allMarketHistoryPulls.edges);
  const priceHistory = prices[0].allMarketHistoryPulls.edges
  return (
    <div>
      {priceHistory.map((item) => (
        <div key={item.node.id}>
          {item.node.average}
        </div>
      ))}
    </div>
  )
}


export default Graph;