import React from 'react';
const { Line } = require('react-chartjs-2');
const { Chart, registerables } = require('chart.js');
Chart.register(...registerables);

const Graph = ({ prices }) => {
  const priceHistory = prices[0].allMarketHistoryPulls.edges;
  const last30PriceHistory = priceHistory.slice(-30);
  const dates = last30PriceHistory.map((item) => item.node.date);
  const averages = last30PriceHistory.map((item) => parseFloat(item.node.average));
  const highest = last30PriceHistory.map((item) => parseFloat(item.node.highest));
  const lowest = last30PriceHistory.map((item) => parseFloat(item.node.lowest));

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Average Price',
        data: averages,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Highest Price',
        data: highest,
        fill: false,
        borderColor: 'rgb(192, 75, 75)',
        tension: 0.1,
      },
      {
        label: 'Lowest Price',
        data: lowest,
        fill: false,
        borderColor: 'rgb(75, 75, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM DD',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Price',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Price history for ${priceHistory[0].node.typeId}`, // Add your desired chart title here
        font: {
          size: 16,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="h-96 p-2">
      <Line options={options} data={data} />
    </div>
  );
};

export default Graph;
