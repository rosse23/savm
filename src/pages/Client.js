import React from "react";
import Portada from "../components/UI/Portada";
import NewClient from "../components/client/NewClient";
import { HiUsers } from "react-icons/hi";
import classes from "./Client.module.css";
import { Route, Routes } from "react-router-dom";
import ListClient from "../components/client/ListClient";
import GetClient from "../components/client/GetClient";
import UpdateClient from "../components/client/UpdateClient";
const Client = () => {
  return (
    <div
      // className={`${classes.User} ${
      //   props.isOpenHamburger ? classes.User : classes.UserMargi
      // }`}
      className={classes.Client}
    >
      <div className={classes.Portc}>
        <Portada>
          <HiUsers />
          <h1>Clientes</h1>
        </Portada>
      </div>
      <Routes>
        <Route path="/" element={<ListClient />} />
        <Route path="newclient" element={<NewClient />} />
        <Route path="viewclient" element={<GetClient />} />
        <Route path="editclient" element={<UpdateClient />} />
      </Routes>
    </div>
  );
};

export default Client;
