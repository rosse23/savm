import { React, useState } from "react";
import Button from "../UI/Button";
import CardForm from "../UI/CardForm";
import classes from "./UpdatePassword.module.css";
import { useNavigate } from "react-router-dom";
import { AuthRequests } from "../../lib/api";
import { errorActions } from "../../store/error";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import Modal from "../UI/Modal";
const UpdatePassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const actionButtonupdate = async (e) => {
    e.preventDefault();
    const result = await AuthRequests.updatePassword(
      localStorage.getItem("userToken"),
      credentials
    );

    if (result.status === "fail") {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    } else setShowModal(!showModal);
  };
  const actionButton = async (e) => {
    setShowModal(!showModal);

    dispatch(authActions.setLogout());
    navigate({ pathname: "/" }, { replace: true });
  };
  return (
    <div className={classes.UpdatePassword}>
      <div className={classes.updateform}>
        <CardForm>
          <h2>Cambiar contraseña</h2>
          <div>
            <p htmlFor="password">Ingrese su contraseña</p>
            <input
              type="password"
              id="passwordCurrent"
              name="passwordCurrent"
              value={credentials.passwordCurrent}
              onChange={changeInputHandler}
              placeholder="*******"
              required
            />
          </div>
          <div>
            <p>Ingrese su nueva contraseña</p>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={changeInputHandler}
              placeholder="*******"
              required
            />
          </div>
          <div>
            <p>Repita su nueva contraseña</p>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={credentials.passwordConfirm}
              onChange={changeInputHandler}
              placeholder="*******"
              required
            />
          </div>
          <div className={classes.Butacept}>
            <Button onClick={actionButtonupdate}>Aceptar</Button>
          </div>
          <Modal showModal={showModal}>
            <p>Acaba de cambiar su contraseña, Debe volver a iniciar sesión</p>
            <div className={classes.buttoncontainer}>
              <Button onClick={actionButton}>Aceptar</Button>
            </div>
          </Modal>
        </CardForm>
      </div>
    </div>
  );
};

export default UpdatePassword;
