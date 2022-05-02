import React from "react";
import classes from "./CardForm.module.css";

const CardForm = (props) => {
  return <div className={classes.create}>{props.children}</div>;
};

export default CardForm;
