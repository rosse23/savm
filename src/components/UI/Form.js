import React from "react";
import classes from "./Form.module.css";
export const Form = (props) => {
  return <div className={classes.Form}>{props.children}</div>;
};
