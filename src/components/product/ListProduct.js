import { React, useState, useEffect } from 'react';
import { ProductRequests } from '../../lib/api/';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineAddCircle, MdOutlineSearch } from 'react-icons/md';
import { MdOutlineNavigateNext, MdKeyboardArrowLeft } from 'react-icons/md';
import FiltersContainer from '../UI/FiltersContainer';
import Container from '../UI/Container';
import List from '../UI/List';
import ListModel from '../UI/ListModel';
import classes from '../user/ListUser.module.css';
const ListProduct = () => {
  const [search, setSearch] = useState('');
  const [todo, setTodo] = useState(0);
  const [opensearch, setOpensearch] = useState(false);
  const [product, setProduct] = useState([]);
  const [infoadd, setInfoadd] = useState({
    link1: '/app/product/viewproduct?id=',
    link2: '/app/product/editproduct?id=',
    obj: false,
  });
  const [filter, setFilter] = useState({
    sort: 'name',
    page: 1,
    limit: 5,
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
        <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Ordenar Por</label>
          </div>

          <select id='sort' name='sort' onChange={changeInputHandler}>
            <option value={'name'}>Nombre</option>
            <option value={'category'}>Categoria</option>
            <option value={'price'}>Precio</option>
            <option value={'stock'}>Stock</option>
          </select>
        </div>
        <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Buscar</label>
          </div>
          <span className={classes.icon}>
            <MdOutlineSearch />
          </span>
          <input placeholder='search.....' onChange={onSearchHandler}></input>
        </div>
      </FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Productos</h2>
              <NavLink
                exact
                to='/app/product/newproduct'
                className={classes.new}
              >
                <MdOutlineAddCircle />
                <span className={classes.tooltiptext}>Nuevo</span>
              </NavLink>
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
                <ListModel info={product} infoadd={infoadd} />
              </table>
            </div>
          </List>
        </div>
      </Container>
      <div className={classes.botones}>
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
      </div>
    </section>
  );
};

export default ListProduct;
