import { React, useState, useEffect } from 'react';
import { SaleRequests } from '../../lib/api/';
import { IoIosEye } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineAddCircle } from 'react-icons/md';
import FiltersContainer from '../UI/FiltersContainer';
import { MdOutlineNavigateNext, MdKeyboardArrowLeft } from 'react-icons/md';
import Container from '../UI/Container';
import List from '../UI/List';
import classes from '../user/ListUser.module.css';
const ListSale = () => {
  const [sale, setSale] = useState([]);
  const [todo, setTodo] = useState(0);
  const [filter, setFilter] = useState({
    'saleDate[gte]': '2022-01-01T19:42:51.955Z',
    'saleDate[lte]': '2023-01-01T19:42:51.955Z',
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
      const result = await SaleRequests.getAll(
        localStorage.getItem('userToken')
      );
      setTodo(parseInt((result.data.data.length + parseInt(4)) / parseInt(5)));
      console.log((result.data.data.length + parseInt(4)) / parseInt(5));
      console.log('nobue');
    };
    getnumber();
  }, []);
  useEffect(() => {
    const getAllSales = async () => {
      const result = await SaleRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result.data.data);
      if (result.status === 'fail') {
        console.log(result.message);
        return;
      } else {
        setSale(result.data.data);
      }
    };
    getAllSales();
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
            id='saleDate[gte]'
            name='saleDate[gte]'
            onChange={changeInputHandler}
          ></input>
        </div>
        <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Hasta:</label>
          </div>
          <input
            type='datetime-local'
            id='saleDate[lte]'
            name='saleDate[lte]'
            onChange={changeInputHandler}
          ></input>
        </div>
      </FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Ventas Realizadas</h2>
              <NavLink exact to='/app/sale/newsale' className={classes.new}>
                <MdOutlineAddCircle />
                <span className={classes.tooltiptext}>Nuevo</span>
              </NavLink>
            </div>

            <div className={classes.tabla}>
              <table className={classes.cuerpotabla}>
                <thead className={classes.title}>
                  <tr>
                    <th>
                      <div>Cliente</div>
                    </th>
                    <th>
                      <div>Cantidad de productos</div>
                    </th>
                    <th>
                      <div>Precio Total en Bs</div>
                    </th>
                    <th>
                      <div>Fecha</div>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <tbody className={classes.bodytable}>
                  {sale.map((data) => (
                    <tr>
                      <td>
                        <div>{data.client?.name}</div>
                      </td>
                      <td>
                        <div>{data?.product?.length}</div>
                      </td>
                      <td>
                        <div>{data.totalPrice}</div>
                      </td>
                      <td>
                        <div>{formatDate(data.saleDate)}</div>
                      </td>
                      <td>
                        <div className={classes.iconos}>
                          <NavLink
                            className={classes.ico1}
                            exact
                            to={`/app/sale/viewsale?id=${data._id}`}
                          >
                            <IoIosEye />
                            <span className={classes.tooltiptext}>Ver</span>
                          </NavLink>
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
export default ListSale;
