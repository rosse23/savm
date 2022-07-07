import { React, useEffect, useState } from 'react';
import { ActivityRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../UI/Button';
import classes from './GetActivite.module.css';
const GetActivite = () => {
  const [activity, setActivity] = useState({});
  const [op, setOp] = useState('');
  const [model, setModel] = useState('');
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(async () => {
    const result = await ActivityRequests.getOne(
      id,
      localStorage.getItem('userToken')
    );
    setActivity(result.data.data);
    console.log(result.data.data);
    if (result.data.data.operation == 'CREATE') {
      setOp('Creación');
    }
    if (result.data.data.operation == 'DELETE') {
      setOp('Eliminación');
    }
    if (result.data.data.operation == 'UPDATE') {
      setOp('Modificación');
    }
    if (result.data.data.model == 'User') {
      setModel(' un Usuario');
    }
    if (result.data.data.model == 'Pet') {
      setModel(' un  Paciente');
    }
    if (result.data.data.model == 'Product') {
      setModel(' un Producto');
    }
    if (result.data.data.model == 'Esthetic') {
      setModel(' una visita estética');
    }
    if (result.data.data.model == 'Sale') {
      setModel(' una Venta');
    }
    if (result.data.data.model == 'Visit') {
      setModel(' una Visita');
    }
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
  }, []);
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  const action = async (e) => {
    e.preventDefault();
    navigate({ pathname: `/app/user/activites/` }, { replace: true });
  };
  return (
    <Container>
      <div className={classes.GetActivity}>
        <h2>Detales de actividad</h2>
        <div className={classes.cols}>
          <p>El Usuario: </p>
          <h3>{activity.user?.name}</h3>
        </div>
        <div className={classes.cols}>
          <p>Con ci:</p>
          <h4>{activity.user?.ci}</h4>
        </div>
        <div className={classes.cols}>
          <p>En fecha:</p>
          <h3>{formatDate(activity.activityDate)}</h3>
        </div>

        <div className={classes.cols}>
          <p>Realizo una</p>
          <h3>{op}</h3>
          <p>de</p>
          <h3>{model}</h3>
        </div>
        <div className={classes.but}>
          <Button onClick={action}>Atrás</Button>
        </div>
      </div>
    </Container>
  );
};

export default GetActivite;
