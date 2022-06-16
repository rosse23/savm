import React, { useState, useEffect } from 'react';
import { ProductRequests } from '../../lib/api/';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Salesxproduct = () => {
  const data = {
    labels: ['hola', 'hola1', 'hola2'],
    datasets: [
      {
        axis: 'y',
        backgroundColor: '#3490dc',
        hoverBackgroundColor: '#1d4f79',
        data: [1, 2, 3],
      },
    ],
  };
  return (
    <div>
      <h2>Ventas por producto</h2>
      <Bar
        data={data}
        options={{
          indexAxis: 'y',
          plugins: {
            title: {
              display: false,
              text: 'currText',
              font: { size: 12, family: 'rubik' },
            },
            legend: { display: false, position: 'right' },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default Salesxproduct;
