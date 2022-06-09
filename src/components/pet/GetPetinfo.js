import { React, useState, useEffect } from 'react';
import { PetRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './GetPetinfo.module.css';
import { Form } from '../UI/Form';

const GetPetinfo = () => {
  const [pet, setPet] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(() => {
    const getpet = async () => {
      const result = await PetRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      console.log(result);
      setPet(result.data.data);
      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getpet();
  }, []);

  return (
    <Container>
      <div className={classes.GetPetinfo}>
        <h2>Datos del Paciente</h2>
        <Form>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Especie: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.kind}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Raza: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.breed}</p>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Sexo: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.sex}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Agresividad: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.agresivity}</p>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Peso: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.weight} kilos</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Edad: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.age} años</p>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Cumpleaños: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.birthday} </p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de ultimo celo: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.lastHeat}</p>
              </div>
            </div>
          </div>

          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de registro: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.dateReg}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de ultima modificacion: </p>
              </div>
              <div className={classes.formresp}>
                <p>{pet.lastUpdate}</p>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default GetPetinfo;
