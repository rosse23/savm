import React, { Fragment, useState } from "react";
import classes from "./OptionContainer.module.css";
import { HiUsers, HiUserGroup } from "react-icons/hi";
import { MdPets, MdLocalGroceryStore } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const routes = [
  {
    path1: "/app/user/newuser",
    path2: "/app/user/listuser",
    path3: "/index",
    name: "Usuarios",
    icon: <HiUsers />,
    op1: "Crear nuevo",
    op2: "Lista / Búsqueda",
    op3: "Descargar listado",
  },
  {
    path1: "/client/newclient",
    path2: "/user/listuser",
    path3: "/index",
    name: "Clientes",
    icon: <HiUserGroup />,
    op1: "Crear nuevo",
    op2: "Lista / Búsqueda",
    op3: "Descargar listado",
  },
  {
    path1: "/pet/newpet",
    path2: "/user/listuser",
    path3: "/index",
    name: "Mascotas",
    icon: <MdPets />,
    op1: "Crear nuevo",
    op2: "Lista / Búsqueda",
    op3: "Descargar listado",
  },
  {
    path1: "/",
    path2: "/user/listuser",
    path3: "/index",
    name: "Ventas",
    icon: <MdLocalGroceryStore />,
    op1: "Crear nuevo",
    op2: "Lista / Búsqueda",
    op3: "Descargar listado",
  },
  {
    path1: "/",
    path2: "/user/listuser",
    path3: "/index",
    name: "Servicios",
    icon: <FaHandHoldingMedical />,
    op1: "Crear nuevo",
    op2: "Lista / Búsqueda",
    op3: "Descargar listado",
  },
];

const OptionContainer = () => {
  const [isHoverItems, setIsHover] = useState({
    Usuarios: false,
    Clientes: false,
    Mascotas: false,
    Ventas: false,
    Servicios: false,
    Estadisticas: false,
  });

  const mouseEnterHandler = (data) => {
    setIsHover((prev) => ({ ...prev, [data]: true }));
    console.log(data);
  };

  const mouseLeaveHandler = (data) => {
    setIsHover((prev) => ({ ...prev, [data]: false }));
    console.log("leave mouse");
  };

  return (
    <div className={classes.container}>
      {routes.map((route, index) => {
        return (
          <div>
            <section
              className={classes.option}
              onMouseEnter={() => {
                mouseEnterHandler(route.name);
              }}
              onMouseLeave={() => {
                mouseLeaveHandler(route.name);
              }}
            >
              {isHoverItems[route.name] ? (
                <div className={classes.opcontainer}>
                  <NavLink
                    to={route.path1}
                    key={index}
                    className={classes.optionlink}
                  >
                    {route.op1}
                  </NavLink>
                  <NavLink
                    to={route.path2}
                    key={index}
                    className={classes.optionlink}
                  >
                    {route.op2}
                  </NavLink>
                  <NavLink
                    to={route.path3}
                    key={index}
                    className={classes.optionlink}
                  >
                    {route.op3}
                  </NavLink>
                </div>
              ) : (
                <Fragment>
                  {route.icon}
                  <p>{route.name}</p>
                </Fragment>
              )}
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default OptionContainer;
