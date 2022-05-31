import React from "react";
import ListEsthetic from "../components/esthetic/ListEsthetic";
import NewEsthetic from "../components/esthetic/NewEsthetic";
import { Route, Routes } from "react-router-dom";
import Portada from "../components/UI/Portada";
import classes from "./Esthetic.module.css";
import { FaBath, FaDog } from "react-icons/fa";
import { ImScissors } from "react-icons/im";
import GetEsthetic from "../components/esthetic/GetEsthetic";
import UpdateEsthetic from "../components/esthetic/UpdateEsthetic";

const Esthetic = () => {
  return (
    <div className={classes.Esthetic}>
      <div className={classes.Porte}>
        <Portada>
          <FaBath />
          <h1>Estética y Peluqueria</h1>
          <ImScissors />
        </Portada>
      </div>
      <Routes>
        <Route path="/" element={<ListEsthetic />} />
        <Route path="newesthetic" element={<NewEsthetic />} />
        <Route path="viewesthetic" element={<GetEsthetic />} />
        <Route path="editesthetic" element={<UpdateEsthetic />} />
      </Routes>
    </div>
  );
};

export default Esthetic;
