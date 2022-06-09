import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PetRequests } from '../../lib/api/';
import { ClientRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import { Form } from '../UI/Form';
import Button from '../UI/Button';
import classes from './AddinfoPet.module.css';
const AddinfoPet = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    owner: '',
    breed: '',
    weight: '',
    age: '',
    lastHeat: '',
    agresivity: '',
  });
  const [ownername, setOwnername] = useState(null);
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let query = new URLSearchParams(search);
  let id = query.get('id');

  useEffect(async () => {
    const result = await PetRequests.getOne(
      id,
      localStorage.getItem('userToken')
    );
    setCredentials(result.data.data);
    console.log(result.data.data);
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }

    const result2 = await ClientRequests.getOne(
      credentials.owner,
      localStorage.getItem('userToken')
    );
    setOwnername(result2.data.data.name);
    console.log(result2.data.data.name);
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
  }, []);

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const actionUpdate = async (e) => {
    e.preventDefault();
    const result = await PetRequests.updateOne(
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
    navigate({ pathname: `/app/pet/` }, { replace: true });
  };
  const actionOmitir = async (e) => {
    e.preventDefault();
    navigate({ pathname: `/app/pet/` }, { replace: true });
  };
  return (
    <Container>
      <div className={classes.AddinfoPet}>
        <h2>Informacion Adicional opcional</h2>
        <Form>
          <div className={classes.infoPet}>
            <p type='Paciente:'> </p>
            <input id='name' name='name' value={credentials.name}></input>
          </div>
          <div className={classes.infoPet}>
            <p type='Dueño:'> </p>
            <input id='name' name='name' value={ownername}></input>
          </div>
          <div className={classes.infop}>
            <div className={classes.cols2}>
              <p type='Raza:'>
                <input
                  value={credentials.breed}
                  id='breed'
                  name='breed'
                  onChange={changeInputHandler}
                ></input>
              </p>
              <p type='Agresividad:'>
                <input
                  placeholder='Ingrese un Nro del 1 a 5'
                  type='number'
                  min='1'
                  max='5'
                  value={credentials.agresivity}
                  id='agresivity'
                  name='agresivity'
                  onChange={changeInputHandler}
                ></input>
              </p>
            </div>
            <div className={classes.cols2}>
              <p type='Peso:'>
                <input
                  type='number'
                  min='0'
                  step='0.05'
                  value={credentials.weight}
                  id='weight'
                  name='weight'
                  onChange={changeInputHandler}
                ></input>
              </p>
              <p type='Edad:'>
                <input
                  type='number'
                  min='0.5'
                  max='25'
                  step='0.5'
                  value={credentials.age}
                  id='age'
                  name='age'
                  onChange={changeInputHandler}
                ></input>
              </p>
            </div>
            <p type='Ultimo Celo:'>
              <input
                type='date'
                value={credentials.lastHeat}
                id='lastHeat'
                name='lastHeat'
                onChange={changeInputHandler}
              ></input>
            </p>
          </div>
        </Form>
        <div className={classes.crearbut}>
          <Button onClick={actionOmitir}>Omitir</Button>
          <Button onClick={actionUpdate}>Guardar</Button>
        </div>
      </div>
    </Container>
  );
};

export default AddinfoPet;
