import { React, useState } from 'react';
import classes from '../user/NewUser.module.css';
import { Form } from '../UI/Form';
import Button from '../UI/Button';
import { ClientRequests } from '../../lib/api/';
import { useNavigate } from 'react-router-dom';
import Container from '../UI/Container';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
const NewClient = () => {
  const [errors, setErrors] = useState(null);
  const [credentials, setCredentials] = useState({
    name: '',
    ci: '',
    phoneNumber: '',
    address: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const actionButton = async (e) => {
    e.preventDefault();

    const result = await ClientRequests.createOne(
      localStorage.getItem('userToken'),
      credentials
    );

    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      console.log(result.message);
      return;
    }
    navigate({ pathname: '/app/client/' }, { replace: true });
  };
  return (
    <Container>
      <div className={classes.NewUser}>
        <h2>Nuevo Cliente</h2>
        <div className={classes.formusercontainer}>
          <Form>
            <div className={classes.cols2}>
              <p type='Nombre:'>
                <input
                  placeholder='Ingrese nombre del cliente..'
                  id='name'
                  name='name'
                  value={credentials.name}
                  onChange={changeInputHandler}
                ></input>
              </p>
              <p type='Ci:'>
                <input
                  placeholder='Ingrese el ci del cliente..'
                  id='ci'
                  name='ci'
                  value={credentials.ci}
                  onChange={changeInputHandler}
                ></input>
              </p>
            </div>
            <p type='Numero de Telefono o celular'>
              <input
                placeholder='Ingrese el numero de telefono o celular del cliente.'
                id='phoneNumber'
                name='phoneNumber'
                value={credentials.phoneNumber}
                onChange={changeInputHandler}
              ></input>
            </p>
            <p type='Dirección:'>
              <input
                placeholder='Ingrese la direccion del cliente..'
                id='address'
                name='address'
                value={credentials.address}
                onChange={changeInputHandler}
              ></input>
            </p>
          </Form>
          <div className={classes.crearbut}>
            <Button onClick={actionButton}>Crear</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewClient;
