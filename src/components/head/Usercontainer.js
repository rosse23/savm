import { Fragment, React } from "react";
import classes from "./Usercontainer.module.css";
import Button from "../UI/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { MdPermContactCalendar } from "react-icons/md";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
const Usercontainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actionHandler = () => {
    dispatch(authActions.setLogout());
    navigate({ pathname: "/" }, { replace: true });
  };

  return (
    <div className={classes.Usercontainer}>
      <div className={classes.datosuser}>
        <div>
          <img
            src="https://images.unsplash.com/photo-1621784564114-6eea05b89863?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=87&q=80"
            alt=""
          />
        </div>
        <div>
          <p>Meyko Janko</p>
          <p>12345678</p>
          <p>meyko@gmail.com</p>
        </div>
      </div>
      <div className={classes.info}>
        <div className={classes.linkinfo}>
          <MdPermContactCalendar />
          <NavLink to="/main" className={classes.Navinfo}>
            <p>Mi cuenta</p>
            <p>Información personal</p>
          </NavLink>
        </div>
        <div className={classes.butoninfo}>
          <Button onClick={actionHandler}>Cerrar sesión</Button>
        </div>
      </div>
    </div>
  );
};

export default Usercontainer;
