import React from "react";
import { Route, Routes } from "react-router-dom";
import Portada from "../components/UI/Portada";
import classes from "./Visit.module.css";
import ListVisit from "../components/visit/ListVisit";
import NewVisit from "../components/visit/NewVisit";
import { FaDog } from "react-icons/fa";
import { GiDogHouse } from "react-icons/gi";
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
        <Route path="/" element={<ListVisit />} />
        <Route path="newvisit" element={<NewVisit />} />
        <Route path="viewvisit" element={<ListVisit />} />
        <Route path="editvisit" element={<ListVisit />} />
      </Routes>
    </div>
  );
};

export default Visit;
