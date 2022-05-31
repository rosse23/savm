import React from "react";
import { Route, Routes } from "react-router-dom";
import Portada from "../components/UI/Portada";
import { MdPointOfSale } from "react-icons/md";
import classes from "./Sale.module.css";
import ListSale from "../components/sale/ListSale";
import NewSale from "../components/sale/NewSale";
const Sale = () => {
  return (
    <div className={classes.Sale}>
      <div className={classes.Ports}>
        <Portada>
          <MdPointOfSale />
          <h1>Ventas</h1>
        </Portada>
      </div>
      <Routes>
        <Route path="/" element={<ListSale />} />
        <Route path="newsale" element={<NewSale />} />
        <Route path="viewsale" element={<ListSale />} />
        <Route path="editsale" element={<ListSale />} />
      </Routes>
    </div>
  );
};

export default Sale;
