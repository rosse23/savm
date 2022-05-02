import React from "react";
import classes from "./Portada.module.css";
const Portada = (props) => {
  return <div className={classes.Portada}>{props.children}</div>;
};

export default Portada;
