import React, { useState } from "react";
import { Form } from "../UI/Form";
import classes from "./NewUser.module.css";
import { UserRequests } from "../../lib/api/";
import { useNavigate } from "react-router-dom";
import { MdAddPhotoAlternate } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import Button from "../UI/Button";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
import Container from "../UI/Container";
const NewUser = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    ci: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const actionButton = async (e) => {
    e.preventDefault();

    const result = await UserRequests.createOne(
      localStorage.getItem("userToken"),
      credentials
    );
    console.log(result.data.user._id);
    if (result.status === "fail") {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );

      return;
    }
    navigate(
      { pathname: `/app/user/newuserphoto?id=${result.data.user._id}` },
      { replace: true }
    );
  };

  return (
    <Container>
      <div className={classes.NewUser}>
        <h2>Nuevo Usuario</h2>
        <div className={classes.formusercontainer}>
          <Form>
            <p type="Nombre:">
              <input
                placeholder="Ingrese su nombre.."
                id="name"
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
            <p type="Ci:">
              <input
                placeholder="Ingrese su ci.."
                id="ci"
                name="ci"
                value={credentials.ci}
                onChange={changeInputHandler}
              ></input>
            </p>
            <p type="Rol:">
              <select id="role" name="role" onChange={changeInputHandler}>
                <option value={"user"}>Usuario</option>
                <option value={"admin"}>Administrador</option>
              </select>
            </p>
            <p type="Contraseña:">
              <input
                type="password"
                placeholder="Ingrese su contraseña.."
                id="password"
                name="password"
                value={credentials.password}
                onChange={changeInputHandler}
              ></input>
            </p>
            <p type="Confirme su contraseña:">
              <input
                type="password"
                placeholder="Vuelva a ingresar su contraseña.."
                id="passwordConfirm"
                name="passwordConfirm"
                value={credentials.passwordConfirm}
                onChange={changeInputHandler}
              ></input>
            </p>
          </Form>
          <div className={classes.crearbut}>
            <Button onClick={actionButton}>Crear</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewUser;
