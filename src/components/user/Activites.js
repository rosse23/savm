import { React, useEffect, useState } from 'react';
import classes from './ListUser.module.css';
import List from '../UI/List';
import { IoIosEye } from 'react-icons/io';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdOutlineNavigateNext, MdKeyboardArrowLeft } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { ActivityRequests } from '../../lib/api/';
import Container from '../UI/Container';
import FiltersContainer from '../UI/FiltersContainer';
import Button from '../UI/Button';
const Activites = () => {
  const [activity, setActivity] = useState([]);
  const [filter, setFilter] = useState({
    sort: '-activityDate',
    page: 1,
    limit: 5,
  });
  const [todo, setTodo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getnumber = async () => {
      const result = await ActivityRequests.getAll(
        localStorage.getItem('userToken')
      );
      setTodo((result.data.data.length + parseInt(4)) / parseInt(5));
      console.log((result.data.data.length + parseInt(4)) / parseInt(5));
      console.log('nobue');
    };
    getnumber();
  }, []);
  useEffect(() => {
    const getactivites = async () => {
      const result = await ActivityRequests.getAll(
        localStorage.getItem('userToken'),
        filter
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
      <Container>
        <div className={classes.ListUser1}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Actividades de Usuarios</h2>
            </div>
            <div className={classes.tabla1}>
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
      <div className={classes.botones}>
        {filter.page > 1 && (
          <button onClick={handleprev}>
            <MdKeyboardArrowLeft />
          </button>
        )}
        {filter.page <= todo + 2 && (
          <button onClick={handlenext}>
            <MdOutlineNavigateNext />
          </button>
        )}
      </div>
    </section>
  );
};

export default Activites;
