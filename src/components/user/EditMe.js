import { React, useState, useEffect } from "react";
import { Form } from "../UI/Form";
import classes from "./EditMe.module.css";
import { AuthRequests } from "../../lib/api";
import Button from "../UI/Button";
import { FaUserEdit } from "react-icons/fa";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
const EditMe = () => {
  const [user, setUser] = useState({ rol: "" });
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    ci: "",
    role: "",
    createdAt: "",
    updatedAt: "",
    passwordChangedAt: "",
  });
  const dispatch = useDispatch();

  useEffect(async () => {
    const result = await AuthRequests.getMe(localStorage.getItem("userToken"));
    console.log(result);
    setCredentials(result.data.data);
    console.log(result);
    if (result.status === "fail") {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    console.log(result.data.data.role);
    if (result.data.data.role === "user") {
      setUser({ rol: "Usuario" });
    } else {
      setUser({ rol: "Administrador" });
    }
  }, []);

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e);
  };

  const actionButton = async (e) => {
    e.preventDefault();
    const result = await AuthRequests.updateMe(
      localStorage.getItem("userToken"),
      credentials
    );
    if (result.status === "fail") {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }

    /*  dispatch(
      authActions.setLogin({
        token: result.token,
        name: result.data.user.name,
      })
    );*/
    /* navigate({ pathname: "/menu" }, { replace: true });*/
  };
  return (
    <div className={classes.EditMe}>
      <section className={classes.edittitle}>
        <h2>Editar Informacion Personal</h2> <FaUserEdit />
      </section>

      <section>
        <Form>
          <p type="Nombre:">
            <input
              value={credentials.name}
              id="name"
              name="name"
              onChange={changeInputHandler}
            ></input>
          </p>
          <p type="Email:">
            <input
              value={credentials.email}
              id="email"
              name="email"
              onChange={changeInputHandler}
            ></input>
          </p>
          <p type="Ci:">
            <input
              value={credentials.ci}
              id="ci"
              name="ci"
              onChange={changeInputHandler}
            ></input>
          </p>
          <p type="Rol:">{user.rol}</p>
          <p type="Fecha de registro:"> {credentials.createdAt}</p>
          <p type="Fecha de modificación:"> {credentials.updatedAt}</p>
          <p type="Fecha de modificación de contraseña:">
            {credentials.passwordChangedAt}
          </p>
        </Form>
        <div className={classes.Butacept}>
          <Button onClick={actionButton}>Aceptar</Button>
        </div>
      </section>
    </div>
  );
};

export default EditMe;
