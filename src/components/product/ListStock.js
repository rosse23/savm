import { React, useState, useEffect } from 'react';
import { StockRequests } from '../../lib/api/';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineAddCircle, MdOutlineSearch } from 'react-icons/md';
import { MdOutlineNavigateNext, MdKeyboardArrowLeft } from 'react-icons/md';
import FiltersContainer from '../UI/FiltersContainer';
import { IoIosEye } from 'react-icons/io';
import Container from '../UI/Container';
import List from '../UI/List';
import classes from '../user/ListUser.module.css';
const ListStock = () => {
  const [search, setSearch] = useState('');
  const [todo, setTodo] = useState(0);
  const [opensearch, setOpensearch] = useState(false);
  const [stock, setStock] = useState([]);

  const [filter, setFilter] = useState({
    'enterDate[gte]': '2022-01-01T19:42:51.955Z',
    'enterDate[lte]': '2023-01-01T19:42:51.955Z',
    sort: '-enterDate',
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
      const result = await StockRequests.getAll(
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
      const result = await StockRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result.data.data);
      if (result.status === 'fail') {
        console.log(result.message);
        return;
      } else {
        setStock(result.data.data);
      }
    };
    getproduct();
  }, [filter]);
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
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
            <label>desde:</label>
          </div>
          <input
            type='datetime-local'
            id='enterDate[gte]'
            name='enterDate[gte]'
            onChange={changeInputHandler}
          ></input>
        </div>
        <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Hasta:</label>
          </div>
          <input
            type='datetime-local'
            id='enterDate[lte]'
            name='enterDate[lte]'
            onChange={changeInputHandler}
          ></input>
        </div>
      </FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Registro de entradas de productos</h2>
              <NavLink exact to='/app/product/newstock' className={classes.new}>
                <MdOutlineAddCircle />
                <span className={classes.tooltiptext}>Nuevo stock</span>
              </NavLink>
            </div>

            <div className={classes.tabla}>
              <table className={classes.cuerpotabla}>
                <thead className={classes.title}>
                  <tr>
                    <th>
                      <div>Producto</div>
                    </th>
                    <th>
                      <div>Cantidad</div>
                    </th>
                    <th>
                      <div>Precio Total</div>
                    </th>
                    <th>
                      <div>Fecha De ingreso</div>
                    </th>

                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <tbody className={classes.bodytable}>
                  {stock.map((stock) => (
                    <tr>
                      <td>
                        <div>{stock.product?.name}</div>
                      </td>
                      <td>
                        <div>{stock.quantityEntered}</div>
                      </td>
                      <td>
                        <div>{stock.totalPrice} Bs.</div>
                      </td>
                      <td>
                        <div>{formatDate(stock.enterDate)}</div>
                      </td>

                      <td>
                        <div className={classes.iconos}>
                          <NavLink
                            className={classes.ico1}
                            exact
                            to={`/app/product/viewstock?id=${stock._id}`}
                          >
                            <IoIosEye />
                            <span className={classes.tooltiptext}>Ver</span>
                          </NavLink>
                          {/* <NavLink
                                className={classes.ico2}
                                exact
                                to={`/app/product/editproduct?id=${products._id}`}
                              >
                                <AiTwotoneEdit />
                                <span className={classes.tooltiptext}>
                                  Editar
                                </span>
                              </NavLink> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
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

export default ListStock;
