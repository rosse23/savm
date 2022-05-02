import { Fragment, React } from "react";
import classes from "./Usercontainer.module.css";
import Button from "../UI/Button";
import { NavLink } from "react-router-dom";
import { MdPermContactCalendar } from "react-icons/md";
const Usercontainer = () => {
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
      <div className={classes.linkinfo}>
        <Fragment>
          <MdPermContactCalendar />
          <NavLink to="/main" className={classes.Navinfo}>
            Mi cuenta
          </NavLink>
          <p>Información personal</p>
        </Fragment>
        <Fragment>
          <Button>Cerrar sesión</Button>
        </Fragment>
      </div>
    </div>
  );
};

export default Usercontainer;
