import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PetRequests } from '../../lib/api/';
import { VisitRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import CardForm from '../UI/CardForm';
import Button from '../UI/Button';
import classes from './NewVisit.module.css';
const NewParams = () => {
  const [credentials, setCredentials] = useState({
    pet: '',
    visitParams: {
      weight: '',
      temperature: '',
      heartbeat: '',
      heartRate: '',
      breathingFrequency: '',
      abdominalPalpation: '',
    },
  });
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date().toLocaleDateString();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(async () => {
    const result = await VisitRequests.getOne(
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
  }, []);
  const changeVisitParamsHandler = (e) => {
    console.log(e.target.name);
    setCredentials((prev) => {
      return {
        ...prev,
        visitParams: { ...prev.visitParams, [e.target.name]: e.target.value },
      };
    });
  };

  const actionUpdate = async (e) => {
    e.preventDefault();
    const result = await VisitRequests.updateOne(
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
    navigate(
      { pathname: `/app/visit/vaccinesvisit?id=${id}` },
      { replace: true }
    );
  };
  const actionOmitir = async (e) => {
    e.preventDefault();
    navigate(
      { pathname: `/app/visit/vaccinesvisit?id=${id}` },
      { replace: true }
    );
  };

  return (
    <Container>
      <div className={classes.NewVisit}>
        <h2>Parametros de Visita</h2>
        <div className={classes.formcontainer}>
          <CardForm>
            <div className={classes.petcontainer}>
              <div className={classes.pet}>
                <p>Paciente: </p>
                <div className={classes.inputpet}>
                  <p>{credentials.pet?.name}</p>
                </div>
              </div>
              <div className={classes.preciototal}>
                <p> Fecha: </p>
                <p>{date}</p>
              </div>
            </div>
          </CardForm>
          <CardForm>
            <div className={classes.contenido}>
              <div className={classes.cols3}>
                <div>
                  <p>Peso:</p>
                  <input
                    type='number'
                    min='0'
                    step='0.01'
                    value={credentials.visitParams.weight}
                    id='weight'
                    name='weight'
                    onChange={changeVisitParamsHandler}
                  ></input>
                </div>
                <div>
                  <p>Temperatura:</p>
                  <input
                    type='number'
                    min='0'
                    value={credentials.visitParams.temperature}
                    id='temperature'
                    name='temperature'
                    onChange={changeVisitParamsHandler}
                  ></input>
                </div>
                <div>
                  <p>Pulso:</p>
                  <input
                    type='number'
                    min='0'
                    value={credentials.visitParams.heartbeat}
                    id='heartbeat'
                    name='heartbeat'
                    onChange={changeVisitParamsHandler}
                  ></input>
                </div>
              </div>
              <div className={classes.cols3}>
                <div>
                  <p>Frecuencia cardiaca:</p>
                  <input
                    type='number'
                    min='0'
                    value={credentials.visitParams.heartRate}
                    id='heartRate'
                    name='heartRate'
                    onChange={changeVisitParamsHandler}
                  ></input>
                </div>
                <div>
                  <p>Frecuencia respiratoria:</p>
                  <input
                    type='number'
                    min='0'
                    value={credentials.visitParams.breathingFrequency}
                    id='breathingFrequency'
                    name='breathingFrequency'
                    onChange={changeVisitParamsHandler}
                  ></input>
                </div>
                <div>
                  <p>Palpación Abdominal:</p>
                  <input
                    value={credentials.visitParams.abdominalPalpation}
                    id='abdominalPalpation'
                    name='abdominalPalpation'
                    onChange={changeVisitParamsHandler}
                  ></input>
                </div>
              </div>
            </div>
          </CardForm>
          <div className={classes.buttons}>
            <Button onClick={actionOmitir}>Omitir</Button>
            <Button onClick={actionUpdate}>Guardar</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewParams;
