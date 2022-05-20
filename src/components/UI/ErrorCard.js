import React from "react";
import { useDispatch } from "react-redux";

import { errorActions } from "../../store/error";
import Button from "./Button";
import classes from "./ErrorCard.module.css";

const ErrorCard = (props) => {
  const dispatch = useDispatch();

  const dismiss = () => {
    dispatch(errorActions.removeError());
  };

  return (
    <div className={classes.card}>
      <p>{props.children}</p>
      <Button onClick={dismiss}>Aceptar</Button>
    </div>
  );
};

export default ErrorCard;
