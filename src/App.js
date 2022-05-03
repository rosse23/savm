import React from "react";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Menu from "./pages/Menu";
import Main from "./pages/Main";
import Layout from "./pages/Layout";
import NewUser from "./components/user/NewUser";
import Usercontainer from "./components/head/Usercontainer";
import SideBar from "./components/sidebar/SideBar";

function App() {
  const token = useSelector((state) => state.auth.token);
  if (token) {
    return (
      <div className="app">
        <Routes>
          <Route path="/sidebar" element={<SideBar />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/index" element={<Layout />} />
          <Route path="/newuser" element={<NewUser />} />
          {/*       
         />
        <Route path="/layout" element={<Layout />} />
        <Route path="/newuser" element={<NewUser />} />
  <Route path="/datauser" element={<Usercontainer />} />*/}
        </Routes>
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
export default App;
