import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClientRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import Container from '../UI/Container';
import classes from '../user/NewUser.module.css';
import { useDispatch } from 'react-redux';
import Button from '../UI/Button';
import { Form } from '../UI/Form';

const UpdateClient = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    ci: '',
    phoneNumber: '',
    address: '',
    dateReg: '',
  });
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(() => {
    const getclient = async () => {
      const result = await ClientRequests.getOne(
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
    };
    getclient();
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
    console.log(credentials);
    console.log('kalesita');
    const result = await ClientRequests.updateOne(
      id,
      credentials,
      localStorage.getItem('userToken')
    );
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: `/app/client/` }, { replace: true });
  };
  const actionCancel = async (e) => {
    e.preventDefault();
    navigate({ pathname: `/app/client/` }, { replace: true });
  };

  return (
    <Container>
      <div className={classes.NewUser}>
        <h2>Editar información de Cliente</h2>
        <div className={classes.formusercontainer}>
          <Form>
            <div className={classes.cols2}>
              <p type='Nombre:'>
                <input
                  id='name'
                  name='name'
                  value={credentials.name}
                  onChange={changeInputHandler}
                ></input>
              </p>
              <p type='Ci:'>
                <input
                  id='ci'
                  name='ci'
                  value={credentials.ci}
                  onChange={changeInputHandler}
                ></input>
              </p>
            </div>
            <div className={classes.cols2}>
              <p type='Numero de Telefono o celular'>
                <input
                  id='phoneNumber'
                  name='phoneNumber'
                  value={credentials.phoneNumber}
                  onChange={changeInputHandler}
                ></input>
              </p>
              <p type='Dirección:'>
                <input
                  id='address'
                  name='address'
                  value={credentials.address}
                  onChange={changeInputHandler}
                ></input>
              </p>
            </div>
            <p type='Fecha de Registro:'>
              <input
                readOnly
                id='dateReg'
                name='dateReg'
                value={credentials.dateReg}
              ></input>
            </p>
          </Form>
          <div className={classes.buttons}>
            <Button onClick={actionCancel}>Cancelar</Button>
            <Button onClick={actionButton}>Guardar</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateClient;
