import React from "react";
import Portada from "../components/UI/Portada";
import ListUser from "../components/user/ListUser";
import { MdOutlinePets } from "react-icons/md";

import classes from "./Pet.module.css";
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
      <ListUser />
    </div>
  );
};

export default Pet;
