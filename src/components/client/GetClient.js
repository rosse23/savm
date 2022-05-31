import { React } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import GetClientinfo from "./GetClientinfo";
import PetsClient from "./PetsClient";
import Container from "../UI/Container";
import classes from "./GetClientinfo.module.css";

const GetClient = () => {
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let id = query.get("id");
  return (
    <Container>
      <div className={classes.GetClient}>
        <GetClientinfo />
        <Routes>
          <Route path="/" element={<PetsClient />} />
          <Route path="sale" element={<PetsClient />} />
          <Route path="visit" element={<PetsClient />} />
          <Route path="esthetic" element={<PetsClient />} />
        </Routes>
      </div>
    </Container>
  );
};

export default GetClient;
