import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Portada from "../components/UI/Portada";
import ListUser from "../components/user/ListUser";
import NewUser from "../components/user/NewUser";
import { HiUsers } from "react-icons/hi";
import classes from "./User.module.css";
const User = (props) => {
  return (
    <div className={classes.User}>
      <div className={classes.Port}>
        <Portada>
          <HiUsers />
          <h1>Usuarios</h1>
        </Portada>
      </div>

      <ListUser />
    </div>
  );
};

export default User;
