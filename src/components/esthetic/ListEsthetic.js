import { React, useState, useEffect } from 'react';
import { EstheticRequests } from '../../lib/api/';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineAddCircle } from 'react-icons/md';
import FiltersContainer from '../UI/FiltersContainer';
import Container from '../UI/Container';
import List from '../UI/List';
import ListModel from '../UI/ListModel';
import classes from '../user/ListUser.module.css';
const ListEsthetic = () => {
  const [esthetic, setEsthetic] = useState([]);
  const [infoadd, setInfoadd] = useState({
    link1: '/app/esthetic/viewesthetic?id=',
    link2: '/app/esthetic/editesthetic?id=',
    obj: 'pet',
  });
  const navigate = useNavigate();

  useEffect(async () => {
    const result = await EstheticRequests.getAll(
      localStorage.getItem('userToken')
    );
    console.log('prueba');
    console.log(result.data.data);
    setEsthetic(result.data.data);
    console.log('prueba');
    console.log(esthetic);
    if (result.status === 'fail') {
      console.log(result.message);
      return;
    }
  }, []);

  return (
    <section>
      <FiltersContainer></FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Resultados</h2>
              <NavLink
                exact
                to='/app/esthetic/newesthetic'
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
                      <div>Paciente</div>
                    </th>
                    <th>
                      <div>Tipo de servicio</div>
                    </th>
                    <th>
                      <div>Precio</div>
                    </th>
                    <th>
                      <div>Fecha de ingreso</div>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <ListModel info={esthetic} infoadd={infoadd} />
              </table>
            </div>
          </List>
        </div>
      </Container>
    </section>
  );
};

export default ListEsthetic;
