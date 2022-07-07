import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Portada from '../components/UI/Portada';
import classes from './Product.module.css';
import { MdOutlineInventory } from 'react-icons/md';
import ListProduct from '../components/product/ListProduct';
import NewProduct from '../components/product/NewProduct';
import GetProduct from '../components/product/GetProduct';
import UpdateProduct from '../components/product/UpdateProduct';
import Foulproduct from '../components/product/Foulproduct';
import NewStock from '../components/product/NewStock';
import UpdateStock from '../components/product/UpdateStock';
import ListStock from '../components/product/ListStock';
import GetStock from '../components/product/GetStock';
const Product = () => {
  return (
    <div className={classes.Product}>
      <div className={classes.Portp}>
        <Portada>
          <MdOutlineInventory />
          <h1>Inventario</h1>
        </Portada>
      </div>
      <Routes>
        <Route path='/' element={<ListProduct />} />
        <Route path='newproduct' element={<NewProduct />} />
        <Route path='viewproduct' element={<GetProduct />} />
        <Route path='editproduct' element={<UpdateProduct />} />
        <Route path='foulproduct' element={<Foulproduct />} />
        <Route path='liststock' element={<ListStock />} />
        <Route path='newstock' element={<NewStock />} />
        <Route path='viewstock' element={<GetStock />} />
      </Routes>
    </div>
  );
};

export default Product;
