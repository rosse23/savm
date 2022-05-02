import axios from "axios";
import { React, useEffect, useState } from "react";
import classes from "./ListUser.module.css";
import List from "../UI/List";
import { IoIosEye } from "react-icons/io";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";

const ListUser = () => {
  const API_URL = "http://localhost:8000/api/user/";
  const [user, SetUser] = useState([]);
  useEffect(() => {
    axios
      .get("https://peticiones.online/api/users")
      .then((response) => SetUser(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={classes.ListUser}>
      <List>
        <header className={classes.cabecera}>
          <h2>Lista de Usuarios</h2>
          <MdOutlineAddCircle />
        </header>
        <div className={classes.tabla}>
          <table className={classes.cuerpotabla}>
            <thead className={classes.title}>
              <tr>
                <th>
                  <div>Nombre</div>
                </th>
                <th>
                  <div>CI</div>
                </th>
                <th>
                  <div>Email</div>
                </th>
                <th>
                  <div></div>
                </th>
              </tr>
            </thead>
            <tbody className={classes.bodytable}>
              {user.map((users) => (
                <tr>
                  <td className={classes.filaFoto}>
                    <div>
                      <img src={users.image} alt="user" />
                    </div>
                    <div>{users.first_name}</div>
                  </td>
                  <td>
                    <div>{users.id}</div>
                  </td>
                  <td>
                    <div>{users.email}</div>
                  </td>
                  <td>
                    <div className={classes.iconos}>
                      <NavLink
                        className={classes.ico1}
                        exact
                        to="/user/creation"
                      >
                        <IoIosEye />
                        <span className={classes.tooltiptext}>Ver</span>
                      </NavLink>
                      <NavLink
                        className={classes.ico2}
                        exact
                        to="/user/creation"
                      >
                        <AiTwotoneEdit />
                        <span className={classes.tooltiptext}>Editar</span>
                      </NavLink>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </List>
    </div>
  );
};

export default ListUser;
