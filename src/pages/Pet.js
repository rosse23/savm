import React from "react";
import Portada from "../components/UI/Portada";
import ListUser from "../components/user/ListUser";
import NewPet from "../components/pet/NewPet";
import { MdOutlinePets } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import classes from "./Pet.module.css";
import ListPet from "../components/pet/ListPet";
import GetPet from "../components/pet/GetPet";
import AddinfoPet from "../components/pet/AddinfoPet";
const Pet = (props) => {
  return (
    <div
      // className={`${classes.User} ${
      //   props.isOpenHamburger ? classes.User : classes.UserMargi
      // }`}
      className={classes.User}
    >
      <div className={classes.Port}>
        <Portada>
          <MdOutlinePets />
          <h1>Pacientes</h1>
        </Portada>
      </div>
      <Routes>
        <Route path="/" element={<ListPet />} />
        <Route path="newpet" element={<NewPet />} />
        <Route path="newpetadd" element={<AddinfoPet />} />
        <Route path="viewpet" element={<GetPet />} />
        <Route path="editpet" element={<ListUser />} />
      </Routes>
    </div>
  );
};

export default Pet;
