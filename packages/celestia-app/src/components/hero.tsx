const Hero = (predictions) => {
  const currentPredictions = predictions.predictions[0].allModelPredictAverageIncreases.edges
  
  return (
    <div className="h-full mx-12">
      <div className="bg-violet-3 h-72 mt-16 text-mauve-11 rounded-lg">GRAPH</div>
      <div className="bg-violet-3 mt-16 rounded-lg">
        <div className="flex justify-center ">
          <div className="mx-4 text-mauve-12">Filter by Region</div>
          <div className="mx-4 text-mauve-12">Search Item</div>
        </div>
        <table className="w-full text-left text-mauve-12">
          <thead>
            <tr>
              <th>Region ID</th>
              <th>Increase</th>
              <th>Horizon</th>
              <th>Confidence</th>
              <th>Date Predicted</th>
              <th>Type ID</th>
            </tr>
          </thead>
          <tbody>
            {currentPredictions.map((prediction) => (
              <tr key={prediction.node.id}>
                <td>{prediction.node.regionId}</td>
                <td>{prediction.node.increase ? 'True' : 'False'}</td>
                <td>{prediction.node.horizon}</td>
                <td>{prediction.node.confidence}</td>
                <td>{prediction.node.datePredicted}</td>
                <td>{prediction.node.typeId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hero;