import React from "react";
import classes from "./Getme.module.css";
import { Getmeinfo } from "./Getmeinfo";
import Getmenavbar from "./Getmenavbar";
import { Route, Routes } from "react-router-dom";
import EditMe from "./EditMe";
import UpdatePassword from "./UpdatePassword";
import Portada from "../UI/Portada";
import { BsPersonFill } from "react-icons/bs";
const Getme = () => {
  return (
    <div className={classes.contenidoperfil}>
      <div className={classes.portp}>
        <Portada>
          <BsPersonFill />
          <h1>Perfil de Usuario</h1>
        </Portada>
      </div>
      <div className={classes.Getme}>
        <Getmenavbar />
        <Routes>
          <Route path="/" element={<Getmeinfo />} />
          <Route path="editme" element={<EditMe />} />
          <Route path="password" element={<UpdatePassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default Getme;
