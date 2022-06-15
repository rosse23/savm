import { React, useEffect, useState } from 'react';
import classes from './ListUser.module.css';
import List from '../UI/List';
import { IoIosEye } from 'react-icons/io';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdOutlineAddCircle } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { ActivityRequests } from '../../lib/api/';
import Container from '../UI/Container';
import FiltersContainer from '../UI/FiltersContainer';
import Button from '../UI/Button';
const Activites = () => {
  const [activity, setActivity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getactivites = async () => {
      const result = await ActivityRequests.getAll(
        localStorage.getItem('userToken')
      );
      console.log(result.data.data);
      console.log('meyki');
      if (result.status === 'fail') {
        console.log(result.message);
        return;
      } else {
        setActivity(result.data.data);
        console.log(result.data.data);
      }
    };
    getactivites();
  }, []);
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  return (
    <section>
      <FiltersContainer></FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Actividades de Usuarios</h2>
            </div>
            <div className={classes.tabla}>
              <table className={classes.cuerpotabla}>
                <thead className={classes.title}>
                  <tr>
                    <th>
                      <div>Usuario</div>
                    </th>
                    <th>
                      <div>Operación</div>
                    </th>
                    <th>
                      <div>Modelo</div>
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
                  {activity.map((activites) => (
                    <tr>
                      <td>
                        <div>{activites.user}</div>
                      </td>
                      <td>
                        <div>{activites.operation}</div>
                      </td>
                      <td>
                        <div>{activites.model}</div>
                      </td>
                      <td>
                        <div>{formatDate(activites.activityDate)}</div>
                      </td>
                      <td>
                        <div className={classes.iconos}>
                          <NavLink
                            className={classes.ico1}
                            exact
                            to={`/app/user/viewuser?id=${activites.user}`}
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
    </section>
  );
};

export default Activites;
