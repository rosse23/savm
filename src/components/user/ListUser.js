import { React, useEffect, useState } from 'react';
import classes from './ListUser.module.css';
import List from '../UI/List';
import { IoIosEye } from 'react-icons/io';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdOutlineAddCircle } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserRequests } from '../../lib/api/';
import Container from '../UI/Container';
import FiltersContainer from '../UI/FiltersContainer';
import Button from '../UI/Button';
const ListUser = () => {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  useEffect(async () => {
    const result = await UserRequests.getAll(localStorage.getItem('userToken'));

    if (result.status === 'fail') {
      console.log(result.message);
      return;
    } else {
      setUser(result.data.data);
      console.log(result.data.data);
    }
  }, []);
  const actionHandler = () => {
    navigate({ pathname: '/app/user/newuser' }, { replace: true });
  };

  return (
    <section>
      <FiltersContainer></FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Usuarios</h2>
              <NavLink exact to='/app/user/newuser' className={classes.new}>
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
                      <div>CI</div>
                    </th>
                    <th>
                      <div>Email</div>
                    </th>
                    <th>
                      <div>Rol</div>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <tbody className={classes.bodytable}>
                  {user.map((users) => (
                    <tr>
                      <td className={classes.filaFoto}>
                        <div>
                          <img
                            src={
                              'http://localhost:8000/img/users/' + users.photo
                            }
                            alt='user'
                          />
                        </div>
                        <div>{users.name}</div>
                      </td>
                      <td>
                        <div>{users.ci}</div>
                      </td>
                      <td>
                        <div>{users.email}</div>
                      </td>
                      <td>
                        <div>{users.role}</div>
                      </td>
                      <td>
                        <div className={classes.iconos}>
                          <NavLink
                            className={classes.ico1}
                            exact
                            to={`/app/user/viewuser?id=${users._id}`}
                          >
                            <IoIosEye />
                            <span className={classes.tooltiptext}>Ver</span>
                          </NavLink>
                          <NavLink
                            className={classes.ico2}
                            exact
                            to={`/app/user/edituser?id=${users._id}`}
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

export default ListUser;
