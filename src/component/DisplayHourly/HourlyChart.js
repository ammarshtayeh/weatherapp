import React from 'react';
import { Line } from 'react-chartjs-2';

const HourlyChart = ({ data }) => {
  // Convert temperature values from Fahrenheit to Celsius
  const celsiusData = data.values.map((temp) => (temp - 32) * (5 / 9));

  // Format the data to match the Chart.js format
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Hourly Data',
        data: celsiusData,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        beginAtZero: true, // or set your desired min value
      },
      y: {
        beginAtZero: true,
        callback: function (value) {
          return value + '°C'; // Add the Celsius symbol to y-axis labels
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default HourlyChart;
