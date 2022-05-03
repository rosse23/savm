import React, { useState } from "react";
import axios from "axios";
import { Form } from "../UI/Form";
import classes from "./NewUser.module.css";
import UserRequests from "../../lib/api/user-requests";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const NewUser = (props) => {
  const [errors, setErrors] = useState(null);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const actionButton = async (e) => {
    e.preventDefault();
    const result = await UserRequests.createOne(
      credentials,
      localStorage.getItem("userToken")
    );

    if (result.status === "fail") {
      setErrors(result.message);
      console.log(errors);
      return;
    }

    /* dispatch(
      authActions.setLogin({
        token: result.token,
        name: result.data.user.name,
      })
    );*/
    // setTimeout(() => {
    // }, 2000);
    navigate({ pathname: "/index" }, { replace: true });
  };

  return (
    <div className={classes.NewUser}>
      <Form>
        <h2>Nuevo Usuario</h2>
        <p type="Name:">
          <input
            placeholder="Ingrese su nombre.."
            id="email"
            name="name"
            value={credentials.name}
            onChange={changeInputHandler}
          ></input>
        </p>
        <p type="Email:">
          <input
            placeholder="Ingrese su email.."
            id="email"
            name="email"
            value={credentials.email}
            onChange={changeInputHandler}
          ></input>
        </p>
        <p type="Password:">
          <input
            placeholder="Ingrese su contraseña.."
            id="email"
            name="password"
            value={credentials.password}
            onChange={changeInputHandler}
          ></input>
        </p>
        <p type="ConfirmPassword:">
          <input
            placeholder="Vuelva a ingresar su contraseña.."
            id="email"
            name="confirmpassword"
            value={credentials.confirmpassword}
            onChange={changeInputHandler}
          ></input>
        </p>
        <button onClick={actionButton}>Crear</button>
      </Form>
    </div>
  );
};

export default NewUser;
