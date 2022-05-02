import { React, useState } from "react";
import classes from "./Layout.module.css";
import Header from "../components/head/Header";
import User from "./User";
const Layout = () => {
  const [isOpenHamburger, SetIsOpenHamburger] = useState(false);
  function handleClick() {
    console.log("jkflsd");
    SetIsOpenHamburger(!isOpenHamburger);
  }
  return (
    <div className={classes.main}>
      <div
        className={` ${classes["dashboard-container"]} ${
          !isOpenHamburger ? classes["dashboard-container--open"] : ""
        }`}
      >
        <Header />
        <User isOpenHamburger={isOpenHamburger} />
      </div>
    </div>
  );
};

export default Layout;
