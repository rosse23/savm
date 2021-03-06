import React, { useState, useEffect } from 'react';
import { ProductRequests } from '../../lib/api/';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Productsxcate = () => {
  const [cate, setCate] = useState([]);
  const [cant, setCant] = useState([]);
  useEffect(() => {
    const getdatos = async () => {
      const result = await ProductRequests.mostDemandProductsCategory(
        localStorage.getItem('userToken')
      );
      {
        var auxproduct = [],
          auxcant = [];
        result.data.rawResult?.map((elemento) => {
          auxproduct.push(elemento._id);
          auxcant.push(elemento.numItemsSold);
        });
        setCate(auxproduct);
        setCant(auxcant);
      }

      console.log(auxproduct);
      console.log(auxcant);
    };
    getdatos();
  }, []);
  const data = {
    labels: cate,
    datasets: [
      {
        label: '# of Votes',
        data: cant,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2>Ventas por categoria</h2>
      <PolarArea data={data} />
    </div>
  );
};

export default Productsxcate;
