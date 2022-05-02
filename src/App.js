import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Menu from "./pages/Menu";
import Main from "./pages/Main";
import User from "./pages/Layout";
import Layout from "./pages/Layout";
import NewUser from "./components/user/NewUser";
import Usercontainer from "./components/head/Usercontainer";
import SideBar from "./components/sidebar/SideBar";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/menu" element={<Menu />} />
        {/*       
        <Route path="/user" element={<User />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/newuser" element={<NewUser />} />
  <Route path="/datauser" element={<Usercontainer />} />*/}
      </Routes>
    </div>
  );
}

export default App;
