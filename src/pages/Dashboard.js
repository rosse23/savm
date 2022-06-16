import React from 'react';
import classes from './Dashboard.module.css';
import Productsxcate from '../components/statistics/Productsxcate';
import Visitasxspecies from '../components/statistics/Visitasxspecies';
import Salesxproduct from '../components/statistics/Salesxproduct';

const Dashboard = () => {
  return (
    <div className={classes.Dashboard}>
      <h1>Estadisticas</h1>
      <div className={classes.content}>
        <div className={classes.item}>
          <Productsxcate />
        </div>
        <div className={classes.item}>
          <Visitasxspecies />
        </div>
      </div>

      {/* <div className={classes.item}>
        <Salesxproduct />
      </div> */}
    </div>
  );
};

export default Dashboard;
