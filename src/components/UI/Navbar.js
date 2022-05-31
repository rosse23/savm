import React from "react";
import classes from "./Navbar.module.css";
import { motion } from "framer-motion";
import { FaEye, FaUserEdit } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdAddPhotoAlternate } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { AuthRequests } from "../../lib/api";
import Modal from "../UI/Modal";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
const Navbar = (props) => {
  const routes = props.routes;
  return (
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
            <div className={classes.linktext}>{route.name}</div>
          </NavLink>
        );
      })}
    </section>
  );
};

export default Navbar;
