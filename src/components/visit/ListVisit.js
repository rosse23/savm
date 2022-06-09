import { React, useState, useEffect } from 'react';
import { VisitRequests } from '../../lib/api/';
import { NavLink } from 'react-router-dom';
import { IoIosEye } from 'react-icons/io';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdOutlineAddCircle } from 'react-icons/md';
import FiltersContainer from '../UI/FiltersContainer';
import Container from '../UI/Container';
import List from '../UI/List';
import ListModel from '../UI/ListModel';
import classes from '../user/ListUser.module.css';
const ListVisit = () => {
  const [visit, setVisit] = useState([]);

  useEffect(async () => {
    const result = await VisitRequests.getAll(
      localStorage.getItem('userToken')
    );
    console.log(result.data.data);
    if (result.status === 'fail') {
      console.log(result.message);
      return;
    } else {
      setVisit(result.data.data);
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
              <NavLink exact to='/app/visit/newvisit' className={classes.new}>
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
                      <div>Motivo</div>
                    </th>
                    <th>
                      <div>Diagnostico</div>
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
                  {visit.map((data) => (
                    <tr>
                      <td>
                        <div>{data.pet?.name}</div>
                      </td>
                      <td>
                        <div>{data.reason}</div>
                      </td>
                      <td>
                        <div>{data.diagnosis}</div>
                      </td>
                      <td>
                        <div>{data.fechaReg}</div>
                      </td>

                      <td>
                        <div className={classes.iconos}>
                          <NavLink
                            className={classes.ico1}
                            exact
                            to={`/app/visit/viewvisit?id=${data._id}`}
                          >
                            <IoIosEye />
                            <span className={classes.tooltiptext}>Ver</span>
                          </NavLink>
                          <NavLink
                            className={classes.ico2}
                            exact
                            to={`/app/visit/editvisit?id=${data._id}`}
                          >
                            <AiTwotoneEdit />
                            <span className={classes.tooltiptext}>Editar</span>
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
    </section>
  );
};

export default ListVisit;
