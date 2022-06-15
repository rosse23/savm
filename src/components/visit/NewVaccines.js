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
import { FiX } from 'react-icons/fi';
const infomed = [
  {
    id: '1',
    kind: 'Antiinflamatorio',
    brand: 'Biofarm',
    product: 'BIODEX',
  },
  {
    id: '2',
    kind: 'ANTIBIOTICO',
    brand: 'Weizur',
    product: 'BIOFLOR',
  },
  {
    id: '3',
    kind: 'ANTIPARASITARIO',
    brand: 'Galmedic',
    product: 'BIOMISOL',
  },
  {
    id: '4',
    kind: 'SUPLEMENTO VITAMINICO',
    brand: 'Proagro',
    product: 'CALCIFICANTE',
  },
];
const NewVaccines = () => {
  const [credentials, setCredentials] = useState({
    pet: '',
    medicines: [],
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

  const addMedicineHandler = (e) => {
    console.log(e.target.value);
    console.log('meyko');
    const newMedicine = JSON.parse(e.target.value);
    setCredentials((prev) => {
      return {
        ...prev,
        medicines: [...prev.medicines, newMedicine],
      };
    });
  };
  const deleteMedicineHandler = (idm) => {
    setCredentials((prev) => {
      return {
        ...prev,
        medicines: credentials.medicines.filter((item) => item.id !== idm),
      };
    });
    console.log(idm);
  };

  const actionUpdate = async (e) => {
    e.preventDefault();
    console.log('nobueoso');
    console.log(credentials);
    const result = await VisitRequests.updateOne(
      id,
      credentials,
      localStorage.getItem('userToken')
    );
    console.log(result);
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate(
      { pathname: `/app/visit/newvisitend?id=${id}` },
      { replace: true }
    );
  };
  const actionOmitir = async (e) => {
    e.preventDefault();
    navigate(
      { pathname: `/app/visit/newvisitend?id=${id}` },
      { replace: true }
    );
  };

  return (
    <Container>
      <div className={classes.NewVisit}>
        <h2>Medicamento</h2>
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
              <div className={classes.ejem}>
                <div>
                  <p>Medicamento:</p>
                  {credentials.medicines.map((medicine) => {
                    return (
                      <div
                        onClick={deleteMedicineHandler.bind(null, medicine.id)}
                        className={classes.opmedicine}
                      >
                        <strong>{medicine.kind}</strong>
                        <em>{medicine.product}</em>
                        <em>{medicine.brand}</em>
                        <FiX />
                        {/* <button onClick={deleteMedicineHandler(medicine.id)}>
                          Quitar
                        </button> */}
                      </div>
                    );
                  })}
                  <select name='vaccine' onChange={addMedicineHandler}>
                    {infomed.map((data, index) => {
                      return (
                        <option
                          key={index}
                          value={JSON.stringify({
                            id: `${data.id}`,
                            kind: `${data.kind}`,
                            brand: `${data.brand}`,
                            product: `${data.product}`,
                          })}
                        >
                          {data.product}
                        </option>
                      );
                    })}
                    {/* <option
                      value={JSON.stringify({
                        id: '1',
                        kind: 'Antiinflamatorio',
                        brand: 'Biofarm',
                        product: 'BIODEX',
                      })}
                    >
                      BIODEX
                    </option>
                    <option
                      value={JSON.stringify({
                        id: '2',
                        kind: 'ANTIBIOTICO',
                        brand: 'Weizur',
                        product: 'BIOFLOR',
                      })}
                    >
                      BIOFLOR
                    </option>
                    <option
                      value={JSON.stringify({
                        id: '3',
                        kind: 'ANTIPARASITARIO',
                        brand: 'Galmedic',
                        product: 'BIOMISOL',
                      })}
                    >
                      BIOMISOL
                    </option> */}
                  </select>
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

export default NewVaccines;
