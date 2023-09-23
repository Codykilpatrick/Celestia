import React from 'react';
const { Line } = require('react-chartjs-2');
const { Chart, registerables } = require('chart.js');
Chart.register(...registerables);

const Graph = ({ prices }) => {
  const priceHistory = prices[0].allMarketHistoryPulls.edges;

  // Extract dates and averages from the GraphQL data
  const dates = priceHistory.map((item) => item.node.date);
  const averages = priceHistory.map((item) => parseFloat(item.node.average));
  
  // Define the data for the line chart
  const data = {
    dates,
    datasets: [
      {
        label: 'Average Price',
        data: averages,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Customize chart options (you can adjust these as needed)
  const options = {
    scales: {
      x: {
        time: {
          unit: 'day', // Customize the time unit as needed
          displayFormats: {
            day: 'MMM DD', // Format for displaying dates
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
  };

  return (
    <div>
      <Line options={options} data={data}/>
    </div>
  );
};

export default Graph;
