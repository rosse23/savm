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

const Endvisit = () => {
  const [credentials, setCredentials] = useState({
    pet: '',
    reason: '',
    diagnosis: '',
    treatment: '',
    price: 0,
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
  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    navigate({ pathname: `/app/visit/` }, { replace: true });
  };

  return (
    <Container>
      <div className={classes.NewVisit}>
        <h2>Diagnóstico y tratamiento</h2>
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
                <p> Precio Total: </p>
                <input
                  type='number'
                  id='price'
                  name='price'
                  value={credentials.price}
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
          </CardForm>
          <CardForm>
            <div className={classes.contenido}>
              <div>
                <p>Diagnóstico:</p>
                <textarea
                  value={credentials.diagnosis}
                  id='diagnosis'
                  name='diagnosis'
                  onChange={changeInputHandler}
                ></textarea>
              </div>
              <div>
                <p>Tratamiento:</p>
                <input
                  value={credentials.treatment}
                  id='treatment'
                  name='treatment'
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
          </CardForm>
          <div className={classes.crearbut}>
            <Button onClick={actionUpdate}>Guardar</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Endvisit;
