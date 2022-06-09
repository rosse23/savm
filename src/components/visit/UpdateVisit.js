import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { VisitRequests } from '../../lib/api/';
import { PetRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import Container from '../UI/Container';
import classes from './UpdateVisit.module.css';
import { useDispatch } from 'react-redux';
import Button from '../UI/Button';
import { motion } from 'framer-motion';
import CardForm from '../UI/CardForm';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const UpdateVisit = () => {
  const [opensearch, setOpensearch] = useState(false);
  const [petname, setPetname] = useState(null);
  const [pets, setPets] = useState([]);
  const [searchs, setSearchs] = useState('');
  const [visit, setVisit] = useState({
    pet: '',
    reason: '',
    diagnosis: '',
    treatment: '',
    price: 0,
    fechaReg: '',
    visitParams: {
      weight: '',
      temperature: '',
      heartbeat: '',
      heartRate: '',
      breathingFrequency: '',
      abdominalPalpation: '',
    },
    medicines: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  const changeInputHandler = (e) => {
    setVisit((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const changeVisitParamsHandler = (e) => {
    console.log(e.target.name);
    setVisit((prev) => {
      return {
        ...prev,
        visitParams: { ...prev.visitParams, [e.target.name]: e.target.value },
      };
    });
  };
  const addMedicineHandler = (e) => {
    console.log(e.target.value);
    console.log('meyko');
    const newMedicine = JSON.parse(e.target.value);
    setVisit((prev) => {
      return {
        ...prev,
        medicines: [...prev.medicines, newMedicine],
      };
    });
  };
  const deleteMedicineHandler = (idm) => {
    setVisit((prev) => {
      return {
        ...prev,
        medicines: visit.medicines.filter((item) => item.id !== idm),
      };
    });
    console.log(idm);
  };
  useEffect(() => {
    const getvisit = async () => {
      const result = await VisitRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      setVisit(result.data.data);
      setPetname(result.data.data.pet?.name);
      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getvisit();
  }, []);
  const actionButton = async (e) => {
    e.preventDefault();
    console.log(visit);
    console.log('kalesita');
    const result = await VisitRequests.updateOne(
      id,
      visit,
      localStorage.getItem('userToken')
    );
    console.log(visit);
    console.log(result);

    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: `/app/visit/viewvisit?id=${id}` }, { replace: true });
  };
  const actionCancel = async (e) => {
    e.preventDefault();
    navigate({ pathname: `/app/visit/viewvisit?id=${id}` }, { replace: true });
  };

  useEffect(() => {
    const getAllPets = async () => {
      const result = await PetRequests.getAll(
        localStorage.getItem('userToken')
      );
      console.log(result);
      console.log(opensearch);
      setPets(
        result.data.data.filter((pet) =>
          pet.name.toLowerCase().includes(searchs.toLowerCase())
        )
      );
    };
    const fetchPets = setTimeout(() => {
      console.log('fetching');
      getAllPets();
    }, 1000);

    return () => {
      clearTimeout(fetchPets);
    };
  }, [searchs]);
  const onSearchHandler = async (e) => {
    setSearchs(e.target.value);
  };

  return (
    <Container>
      <div className={classes.NewVisit}>
        <div className={classes.buttonsedit}>
          <h2>Editar Visita</h2>
          <Button onClick={actionButton}>Guardar</Button>
        </div>
        <div className={classes.formcontainer}>
          <CardForm>
            <div className={classes.petcontainer}>
              <div className={classes.pet}>
                <p>Paciente: </p>
                <div className={classes.inputpet}>
                  <input
                    onClick={() => setOpensearch(!opensearch)}
                    type='text'
                    placeholder='Ingrese el paciente'
                    id='pet'
                    name='pet'
                    value={petname}
                  ></input>
                  {opensearch && (
                    <motion.div
                      className={classes['search-section']}
                      variants={backdrop}
                    >
                      <input
                        type='text'
                        placeholder='Por favor, ingrese una letra..'
                        id='pet'
                        name='pet'
                        onChange={onSearchHandler}
                      ></input>
                      <ul>
                        {pets.map((data) => (
                          <li
                            key={data._id}
                            onClick={() => {
                              setPetname(data.name);
                              setVisit((prevstate) => ({
                                ...prevstate,
                                pet: data._id,
                              }));
                              setOpensearch(!opensearch);
                            }}
                          >
                            <p>{data.name} </p>
                            <p>Dueño: {data.owner.name}</p>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
              <div>
                <p> Fecha de registro: </p>
                <p>{visit.fechaReg}</p>
              </div>
            </div>
          </CardForm>
          <CardForm>
            <div className={classes.contenido}>
              <div className={classes.cols2}>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Motivo: </p>
                  </div>
                  <div className={classes.formresp}>
                    <input
                      value={visit.reason}
                      id='reason'
                      name='reason'
                      onChange={changeInputHandler}
                    ></input>
                  </div>
                </div>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Precio: </p>
                  </div>
                  <div className={classes.formresp}>
                    <input
                      type='number'
                      id='price'
                      name='price'
                      value={visit.price}
                      onChange={changeInputHandler}
                    ></input>
                  </div>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Diagnóstico: </p>
                </div>
                <div className={classes.formresp}>
                  <textarea
                    value={visit.diagnosis}
                    id='diagnosis'
                    name='diagnosis'
                    onChange={changeInputHandler}
                  ></textarea>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Tratamiento: </p>
                </div>
                <div className={classes.formresp}>
                  <input
                    value={visit.treatment}
                    id='treatment'
                    name='treatment'
                    onChange={changeInputHandler}
                  ></input>
                </div>
              </div>
              <div className={classes.title2}>
                <h3>Parametros de Visita</h3>
              </div>

              <div className={classes.cols3}>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Peso: </p>
                  </div>
                  <div className={classes.formresp}>
                    <input
                      type='number'
                      min='0'
                      step='0.01'
                      value={visit.visitParams.weight}
                      id='weight'
                      name='weight'
                      onChange={changeVisitParamsHandler}
                    ></input>
                  </div>
                </div>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Temperatura:</p>
                  </div>
                  <div className={classes.formresp}>
                    <input
                      type='number'
                      min='0'
                      value={visit.visitParams.temperature}
                      id='temperature'
                      name='temperature'
                      onChange={changeVisitParamsHandler}
                    ></input>
                  </div>
                </div>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Pulso: </p>
                  </div>
                  <div className={classes.formresp}>
                    <input
                      type='number'
                      min='0'
                      value={visit.visitParams.heartbeat}
                      id='heartbeat'
                      name='heartbeat'
                      onChange={changeVisitParamsHandler}
                    ></input>
                  </div>
                </div>
              </div>
              <div className={classes.cols3}>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Frecuencia cardiaca: </p>
                  </div>
                  <div className={classes.formresp}>
                    <input
                      type='number'
                      min='0'
                      value={visit.visitParams.heartRate}
                      id='heartRate'
                      name='heartRate'
                      onChange={changeVisitParamsHandler}
                    ></input>
                  </div>
                </div>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Frecuencia respiratoria:</p>
                  </div>
                  <div className={classes.formresp}>
                    <input
                      type='number'
                      min='0'
                      value={visit.visitParams.breathingFrequency}
                      id='breathingFrequency'
                      name='breathingFrequency'
                      onChange={changeVisitParamsHandler}
                    ></input>
                  </div>
                </div>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Palpación Abdominal: </p>
                  </div>
                  <div className={classes.formresp}>
                    <input
                      value={visit.visitParams.abdominalPalpation}
                      id='abdominalPalpation'
                      name='abdominalPalpation'
                      onChange={changeVisitParamsHandler}
                    ></input>
                  </div>
                </div>
              </div>
              <div className={classes.title2}>
                <h3>Vacunas proporcionadas en la visita</h3>
              </div>
              {visit.medicines.map((medicine) => {
                return (
                  <div onClick={deleteMedicineHandler.bind(null, medicine.id)}>
                    <strong>{medicine.kind}</strong>
                    <em>{medicine.product}</em>
                    <em>{medicine.brand}</em>
                    {/* <button onClick={deleteMedicineHandler(medicine.id)}>
                          Quitar
                        </button> */}
                  </div>
                );
              })}
              <select name='vaccine' onChange={addMedicineHandler}>
                {/* {infomed.map((data, index) => {
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
                      </option>;
                    })} */}
                <option
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
                </option>
              </select>
            </div>
          </CardForm>
        </div>
      </div>
    </Container>
  );
};

export default UpdateVisit;
