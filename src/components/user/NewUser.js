import React from "react";
import axios from "axios";
import { Form } from "../UI/Form";
import classes from "./NewUser.module.css";

const NewUser = (props) => {
  return (
    <div className={classes.NewUser}>
      <Form>
        <h2>Nuevo Usuario</h2>
        <p type="Name:">
          <input placeholder="Ingrese su nombre.."></input>
        </p>
        <p type="Email:">
          <input placeholder="Ingrese su email.."></input>
        </p>
        <p type="Password:">
          <input placeholder="Ingrese su contraseña.."></input>
        </p>
        <p type="ConfirmPassword:">
          <input placeholder="Vuelva a ingresar su contraseña.."></input>
        </p>
        <button>Crear</button>
      </Form>
    </div>
  );
};

export default NewUser;
