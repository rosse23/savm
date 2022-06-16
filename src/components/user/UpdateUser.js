import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import { UserRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import Container from '../UI/Container';
import classes from './UpdateUser.module.css';
import { useDispatch } from 'react-redux';
import Button from '../UI/Button';
import { Form } from '../UI/Form';
const UpdateUser = () => {
  const [user, setUser] = useState({});
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    ci: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    passwordChangedAt: '',
  });
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let query = new URLSearchParams(search);
  let id = query.get('id');

  useEffect(() => {
    const getuser = async () => {
      const result = await UserRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      setCredentials(result.data.data);
      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
      if (result.data.data.role === 'admin') {
        setUser({ rol: 'Administrador' });
      } else {
        setUser({ rol: 'Usuario' });
      }
    };
    getuser();
  }, []);

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e);
  };

  const actionButton = async (e) => {
    e.preventDefault();
    const result = await UserRequests.updateOne(
      id,
      credentials,
      localStorage.getItem('userToken')
    );
    console.log(credentials);
    console.log(result);

    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: `/app/user/` }, { replace: true });
  };
  const actionCancel = async (e) => {
    e.preventDefault();
    navigate({ pathname: `/app/user/viewuser?id=${id}` }, { replace: true });
  };
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  return (
    <Container>
      <div className={classes.EditMe}>
        <section className={classes.edittitle}>
          <h2>Editar Informacion de Usuario</h2> <FaUserEdit />
        </section>

        <section>
          <Form>
            <div className={classes.cols2}>
              <p type='Nombre:'>
                <input
                  value={credentials.name}
                  id='name'
                  name='name'
                  onChange={changeInputHandler}
                ></input>
              </p>
              <p type='Ci:'>
                <input
                  value={credentials.ci}
                  id='ci'
                  name='ci'
                  onChange={changeInputHandler}
                ></input>
              </p>
            </div>
            <p type='Email:'>
              <input
                value={credentials.email}
                id='email'
                name='email'
                onChange={changeInputHandler}
              ></input>
            </p>

            <p type='Rol:'>
              {credentials.role == 'user' && (
                <div>
                  <select id='role' name='role' onChange={changeInputHandler}>
                    <option value={credentials.role}>Usuario</option>
                    <option value={'admin'}>Administrador</option>}
                  </select>
                </div>
              )}
              {credentials.role == 'admin' && (
                <div>
                  <select id='role' name='role' onChange={changeInputHandler}>
                    <option value={credentials.role}>Administrador</option>
                    <option value={'user'}>Usuario</option>
                  </select>
                </div>
              )}
            </p>
            <p type='Fecha de registro:'>
              {' '}
              {formatDate(credentials.createdAt)}
            </p>
            <p type='Fecha de modificación:'>
              {' '}
              {formatDate(credentials.updatedAt)}
            </p>
            <p type='Fecha de modificación de contraseña:'>
              {credentials.passwordChangedAt &&
                formatDate(credentials.passwordChangedAt)}
            </p>
          </Form>
          <div className={classes.Butacept}>
            <Button onClick={actionCancel}>Cancelar</Button>
            <Button onClick={actionButton}>Aceptar</Button>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default UpdateUser;
