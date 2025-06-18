import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarGraph = () => {
  const data = {
    labels: ['Tilgang', 'Feil', 'Konto', 'Grow', 'Sikkerhet', 'Utstyr'],
    datasets: [
      {
        label: 'Antall henvendelser',
        data: [12, 19, 8, 5, 10, 7],
        backgroundColor: [
          '#002b44',
          '#eb5658',
          '#116984',
          '#94bdc6',
          '#6f42c1',
          '#01344e',
        ],
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
