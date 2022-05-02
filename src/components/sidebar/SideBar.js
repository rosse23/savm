import { motion, AnimatePresence } from "framer-motion";

import { React, useState } from "react";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { VscMenu } from "react-icons/vsc";
import classes from "./SideBar.module.css";
import SidebarMenu from "./SidebarMenu";
import logo from "../../imgs/nombre.png";
import { NavLink } from "react-router-dom";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/",
    name: "Dashboard",
    icon: <FaUser />,
  },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
