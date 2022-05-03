import React from "react";
import classes from "./Button.module.css";
import { motion } from "framer-motion";
const Button = (props) => {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.4,
        yoyo: Infinity,
      },
    },
  };
  return (
    <div className={classes.button}>
      <motion.button
        onClick={props.onClick}
        variants={buttonVariants}
        whileHover="hover"
      >
        {props.children}
      </motion.button>
    </div>
  );
};

export default Button;
