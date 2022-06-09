import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Portada from '../components/UI/Portada';
import classes from './Visit.module.css';
import ListVisit from '../components/visit/ListVisit';
import NewVisit from '../components/visit/NewVisit';
import { FaDog } from 'react-icons/fa';
import { GiDogHouse } from 'react-icons/gi';
import GetVisit from '../components/visit/GetVisit';
import UpdateVisit from '../components/visit/UpdateVisit';
import Endvisit from '../components/visit/Endvisit';
import NewParams from '../components/visit/NewParams';
import NewVaccines from '../components/visit/NewVaccines';
const Visit = () => {
  return (
    <div className={classes.Visit}>
      <div className={classes.Portv}>
        <Portada>
          <FaDog />
          <GiDogHouse />
          <h1>Visitas</h1>
        </Portada>
      </div>
      <Routes>
        <Route path='/' element={<ListVisit />} />
        <Route path='newvisit' element={<NewVisit />} />
        <Route path='paramsvisit' element={<NewParams />} />
        <Route path='vaccinesvisit' element={<NewVaccines />} />
        <Route path='newvisitend' element={<Endvisit />} />
        <Route path='viewvisit' element={<GetVisit />} />
        <Route path='editvisit' element={<UpdateVisit />} />
      </Routes>
    </div>
  );
};

export default Visit;
