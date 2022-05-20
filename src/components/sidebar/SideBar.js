import { motion, AnimatePresence } from "framer-motion";

import { React, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaUser,
  FaDog,
  FaBath,
  FaHandHoldingMedical,
} from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import {
  MdAttachMoney,
  MdPets,
  MdLocalGroceryStore,
  MdInventory,
} from "react-icons/md";
import { VscMenu } from "react-icons/vsc";
import classes from "./SideBar.module.css";
import logo from "../../imgs/nombre.png";
import { NavLink } from "react-router-dom";
import ErrorCard from "../UI/ErrorCard";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/app",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/app/user",
    name: "Usuarios",
    icon: <FaUser />,
  },
  {
    path: "/app/client",
    name: "Clientes",
    icon: <HiUsers />,
  },
  {
    path: "/app/pet",
    name: "Pacientes",
    icon: <MdPets />,
  },
  {
    path: "/app/sale",
    name: "Ventas y Stock",
    icon: <MdLocalGroceryStore />,
    subRoutes: [
      {
        path: "/app/sale",
        name: "Ventas ",
        icon: <MdAttachMoney />,
      },
      {
        path: "/app/sale/stock",
        name: "Inventario",
        icon: <MdInventory />,
      },
    ],
  },
  {
    path: "/app/service",
    name: "Servicios",
    icon: <FaHandHoldingMedical />,
    subRoutes: [
      {
        path: "/app/service",
        name: "Visita ",
        icon: <FaDog />,
      },
      {
        path: "/app/service/esthetic",
        name: "Estetica y Baños",
        icon: <FaBath />,
      },
    ],
  },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const isError = useSelector((state) => state.error.isError);
  const errMessage = useSelector((state) => state.error.errorMessage);
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={classes["main-container"]}>
      {isError && <ErrorCard>{errMessage}</ErrorCard>}
      <motion.div
        animate={{
          width: isOpen ? "250px" : "45px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={classes.SideBar}
      >
        <div className={classes.section}>
          <AnimatePresence>
            {isOpen && (
              <motion.img
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                src={logo}
                alt="logo"
              />
            )}
          </AnimatePresence>
          <div className={classes.bars}>
            <VscMenu onClick={toggle} />
          </div>
        </div>
        <section className={classes.routes}>
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                />
              );
            }

            return (
              <NavLink
                to={route.path}
                key={index}
                className={classes.link}
                activeClassName={classes.active}
              >
                <div className={classes.icon}>{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className={classes.linktext}
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>
      </motion.div>
    </div>
  );
};
export default SideBar;
