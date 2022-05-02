import React from "react";
import Header from "../components/head/Header";
import OptionContainer from "../components/menu/OptionContainer";
import classes from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.container2}>
        <OptionContainer />
      </div>
    </div>
  );
};

export default Menu;
