import { useEffect, React, useState } from "react";
import classes from "./Usercontainer.module.css";
import Button from "../UI/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { MdPermContactCalendar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AuthRequests } from "../../lib/api";
import { authActions } from "../../store/auth";

const Usercontainer = (props) => {
  const isOpenCU = props;
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    const result = await AuthRequests.getMe(localStorage.getItem("userToken"));
    setUser(result.data.data);
    if (result.status === "fail") {
      return;
    }
  }, []);

  const actionHandler = () => {
    dispatch(authActions.setLogout());
    navigate({ pathname: "/" }, { replace: true });
  };

  return (
    <div className={classes.Usercontainer}>
      <div className={classes.datosuser}>
        <div>
          <img src={"http://localhost:8000/img/users/" + user.photo} alt="" />
        </div>
        <div>
          <p>{user.name}</p>
          <p>{user.ci}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <div className={classes.info}>
        <NavLink
          to="/app/user/getme"
          className={classes.Navinfo}
          onClick={() => isOpenCU(false)}
        >
          <MdPermContactCalendar />
          <div className={classes.linkinfo}>
            <p>Mi cuenta</p>
            <p>Información personal</p>
          </div>
        </NavLink>
        <div className={classes.butoninfo}>
          <Button onClick={actionHandler}>Cerrar sesión</Button>
        </div>
      </div>
    </div>
  );
};

export default Usercontainer;
