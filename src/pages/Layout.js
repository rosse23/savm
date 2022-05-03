import { React, useState } from "react";
import classes from "./Layout.module.css";
import Header from "../components/head/Header";
import User from "./User";
import SideBar from "../components/sidebar/SideBar";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const [isOpenHamburger, SetIsOpenHamburger] = useState(false);
  function handleClick() {
    console.log("jkflsd");
    SetIsOpenHamburger(!isOpenHamburger);
  }
  return (
    <div className={classes.main}>
      <SideBar />
      <div className={classes["dashboard-container"]}>
        <User />
      </div>
    </div>
  );
};

export default Layout;
