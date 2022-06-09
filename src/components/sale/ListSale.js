import { React, useState, useEffect } from 'react';
import { SaleRequests } from '../../lib/api/';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineAddCircle } from 'react-icons/md';
import FiltersContainer from '../UI/FiltersContainer';
import Container from '../UI/Container';
import List from '../UI/List';
import ListModel from '../UI/ListModel';
import classes from '../user/ListUser.module.css';
const ListSale = () => {
  const [sale, setSale] = useState([]);
  const [infoadd, setInfoadd] = useState({
    link1: '/app/sale/viewsale?id=',
    link2: '/app/sale/editsale?id=',
    obj: 'client',
  });
  const navigate = useNavigate();

  useEffect(async () => {
    const result = await SaleRequests.getAll(localStorage.getItem('userToken'));
    console.log(result.data.data);
    if (result.status === 'fail') {
      console.log(result.message);
      return;
    } else {
      setSale(result.data.data);
    }
  }, []);

  return (
    <section>
      <FiltersContainer></FiltersContainer>
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
                <ListModel info={sale} infoadd={infoadd} />
              </table>
            </div>
          </List>
        </div>
      </Container>
    </section>
  );
};
export default ListSale;
