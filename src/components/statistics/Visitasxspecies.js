import { React, useEffect, useState } from 'react';
import { VisitRequests } from '../../lib/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const Visitasxspecies = () => {
  const [especie, setEspecie] = useState([]);
  const [cant, setCant] = useState([]);
  useEffect(() => {
    const getdatos = async () => {
      const result = await VisitRequests.showMostAttendantKind(
        localStorage.getItem('userToken')
      );
      {
        var auxespecie = [],
          auxcant = [];
        result.data?.map((elemento) => {
          auxespecie.push(elemento._id);
          auxcant.push(elemento.totalVisits);
        });
        setEspecie(auxespecie);
        setCant(auxcant);
      }

      console.log(auxespecie);
      console.log(auxcant);
    };
    getdatos();
  }, []);

  const data = {
    labels: especie,
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
      <h2>visitas por especies</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default Visitasxspecies;
