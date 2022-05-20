import { React } from "react";
import classes from "./Layout.module.css";
import Header from "../components/head/Header";
import User from "./User";
import SideBar from "../components/sidebar/SideBar";
import { Route, Routes } from "react-router-dom";
import NewClient from "../components/client/NewClient";
import Getme from "../components/user/Getme";
import Dashboard from "./Dashboard";
import Client from "./Client";
import Pet from "./Pet";
import Sale from "./Sale";
import Service from "./Service";
const Layout = () => {
  return (
    <div className={classes.main}>
      <SideBar />

      <div className={classes["dashboard-container"]}>
        <Header />
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="user/*" element={<User />} />
          <Route path="user/getme/*" element={<Getme />} />
          <Route path="/client/*" element={<Client />} />
          <Route path="/pet/*" element={<Pet />} />
          <Route path="/sale/*" element={<Sale />} />
          <Route path="/service/*" element={<Service />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
