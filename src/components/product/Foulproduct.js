import { React, useState, useEffect } from 'react';
import { ProductRequests } from '../../lib/api/';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineAddCircle, MdOutlineSearch } from 'react-icons/md';
import { HiPlusCircle } from 'react-icons/hi';

import { IoIosEye } from 'react-icons/io';
import { AiTwotoneEdit } from 'react-icons/ai';
import FiltersContainer from '../UI/FiltersContainer';
import Container from '../UI/Container';
import List from '../UI/List';
import ListModel from '../UI/ListModel';
import classes from '../user/ListUser.module.css';
const Foulproduct = () => {
  const [search, setSearch] = useState('');
  const [todo, setTodo] = useState(0);
  const [opensearch, setOpensearch] = useState(false);
  const [product, setProduct] = useState([]);

  const [filter, setFilter] = useState({
    sort: 'stock',
    // page: 1,
    // limit: 10,
  });
  const changeInputHandler = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const getnumber = async () => {
      const result = await ProductRequests.getAll(
        localStorage.getItem('userToken')
      );
      setTodo(parseInt((result.data.data.length + parseInt(4)) / parseInt(5)));
      console.log((result.data.data.length + parseInt(4)) / parseInt(5));
      console.log('nobue');
    };
    getnumber();
  }, []);
  useEffect(() => {
    const getproduct = async () => {
      const result = await ProductRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result.data.data);
      if (result.status === 'fail') {
        console.log(result.message);
        return;
      } else {
        setProduct(result.data.data);
      }
    };
    getproduct();
  }, [filter]);
  useEffect(() => {
    const getAllProducts = async () => {
      const result = await ProductRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      setProduct(
        result.data.data.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    };
    const fetchProducts = setTimeout(() => {
      console.log('fetching');
      getAllProducts();
    }, 1000);

    return () => {
      clearTimeout(fetchProducts);
    };
  }, [search]);

  const onSearchHandler = async (e) => {
    setSearch(e.target.value);
  };
  const handlenext = (e) => {
    setFilter((prevstate) => ({
      ...prevstate,
      page: filter.page + 1,
    }));
    console.log(filter.page);
  };
  const handleprev = (e) => {
    setFilter((prevstate) => ({
      ...prevstate,
      page: filter.page - 1,
    }));
    console.log(filter.page);
  };
  return (
    <section>
      <FiltersContainer>
        {/* <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Ordenar Por</label>
          </div>

          <select id='sort' name='sort' onChange={changeInputHandler}>
            <option value={'name'}>Nombre</option>
            <option value={'category'}>Categoria</option>
            <option value={'price'}>Precio</option>
            <option value={'stock'}>Stock</option>
          </select>
        </div> */}
        <div className={classes.Filter}>
          <div className={classes.title2}>
            <label>Buscar por nombre</label>
          </div>
          <span className={classes.icon2}>
            <MdOutlineSearch />
          </span>
          <input placeholder='search.....' onChange={onSearchHandler}></input>
        </div>
      </FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Productos Escasos</h2>
              {/* <NavLink
                exact
                to='/app/product/newproduct'
                className={classes.new}
              >
                <MdOutlineAddCircle />
                <span className={classes.tooltiptext}>Nuevo</span>
              </NavLink> */}
            </div>

            <div className={classes.tabla}>
              <table className={classes.cuerpotabla}>
                <thead className={classes.title}>
                  <tr>
                    <th>
                      <div>Nombre</div>
                    </th>
                    <th>
                      <div>Categoria</div>
                    </th>
                    <th>
                      <div>Precio</div>
                    </th>
                    <th>
                      <div>Cantidad</div>
                    </th>

                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <tbody className={classes.bodytable}>
                  {product.map(
                    (products) =>
                      products.stock <= 10 && (
                        <tr>
                          <td>
                            <div>{products.name}</div>
                          </td>
                          <td>
                            <div>{products.category}</div>
                          </td>
                          <td>
                            <div>{products.price} Bs.</div>
                          </td>
                          <td>
                            <div>{products.stock}</div>
                          </td>

                          <td>
                            <div className={classes.iconos}>
                              <NavLink
                                className={classes.ico1}
                                exact
                                to={`/app/product/viewproduct?id=${products._id}`}
                              >
                                <IoIosEye />
                                <span className={classes.tooltiptext}>Ver</span>
                              </NavLink>
                              <NavLink
                                className={classes.ico2}
                                exact
                                to={`/app/product/newstock?id=${products._id}`}
                              >
                                <HiPlusCircle />
                                <span className={classes.tooltiptext}>
                                  Nuevo Stock
                                </span>
                              </NavLink>
                            </div>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </List>
        </div>
      </Container>
      {/* <div className={classes.botones}>
        {filter.page > 1 && (
          <button onClick={handleprev}>
            <MdKeyboardArrowLeft />
          </button>
        )}
        {filter.page < todo && (
          <button onClick={handlenext}>
            <MdOutlineNavigateNext />
          </button>
        )}
      </div> */}
    </section>
  );
};

export default Foulproduct;
