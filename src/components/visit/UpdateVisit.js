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
import { FiX } from 'react-icons/fi';
import { BsCheckLg } from 'react-icons/bs';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const infomed = [
  {
    id: '1',
    kind: 'ANTIINFLAMATORIO',
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
  {
    id: '5',
    kind: 'ANTIBIOTICO',
    brand: 'Biomont',
    product: 'BIOMIZONA',
  },
  {
    id: '6',
    kind: 'ANTIBIOTICO',
    brand: 'BIOFARM',
    product: 'BIOSULFAN',
  },
  {
    id: '7',
    kind: 'SUERO RECONSTITUYENTE',
    brand: 'ValleSA',
    product: 'BIOXAN',
  },
  {
    id: '8',
    kind: 'MINERALIZANTE',
    brand: 'Galmedic',
    product: 'BOROGLUCONATO',
  },
  {
    id: '9',
    kind: 'ANTISEPTICO PULMONAR',
    brand: 'Von Franken',
    product: 'BRONCOPUL',
  },
  {
    id: '10',
    kind: 'ANALGESICO-ANTIINFLAMATORIO',
    brand: 'Proagro',
    product: 'CALMIGEL',
  },
];
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
  const [dosis, setDosis] = useState({
    num: '',
    unidad: 'ml',
    tiempo: 'cada 4 horas',
  });
  const [auxmedicine, setAuxmedicine] = useState({
    kind: 'ANTIINFLAMATORIO',
    brand: 'Biofarm',
    product: 'BIODEX',
    dose: '',
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
    // console.log(JSON.parse(e.target.value));
    console.log(dosis);
    var findmedicine = false;
    var caddosis = dosis.num + ' ' + dosis.unidad + ' ' + dosis.tiempo;
    console.log(caddosis);
    const newMedicine = auxmedicine;
    if (caddosis) {
      newMedicine.dose = caddosis;

      console.log(newMedicine);
    }
    console.log(auxmedicine);
    for (var i = 0; i < visit.medicines.length; i++) {
      // console.log(credentials.medicines[i]);
      // console.log(newMedicine);
      if (visit.medicines[i].id == newMedicine.id) {
        findmedicine = true;

        break;
      }
    }
    if (findmedicine == false) {
      setVisit((prev) => {
        return {
          ...prev,
          medicines: [...prev.medicines, newMedicine],
        };
      });
      console.log(visit.medicines);
    }
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

  const changeInputDosis = (e) => {
    setDosis((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const changeInputMedicine = (e) => {
    setAuxmedicine(JSON.parse(e.target.value));
    // const caddosis = dosis.num + ' ' + dosis.unidad + ' ' + dosis.tiempo;
    // setAuxmedicine((prev) => ({
    //   ...prev,
    //   dosis: caddosis,
    // }));
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
                  <div
                    onClick={deleteMedicineHandler.bind(null, medicine.id)}
                    className={classes.opmedicine}
                  >
                    <strong>{medicine.kind}</strong>
                    <em>{medicine.product}</em>
                    <em>{medicine.brand}</em>
                    <em>{medicine.dose}</em>
                    <FiX />
                    {/* <button onClick={deleteMedicineHandler(medicine.id)}>
                          Quitar
                        </button> */}
                  </div>
                );
              })}
              <div className={classes.medicine}>
                <div className={classes.medicinecol}>
                  <p>Medicamento:</p>
                  <select name='medicines' onChange={changeInputMedicine}>
                    {infomed.map((data, index) => {
                      return (
                        <option
                          key={index}
                          value={JSON.stringify({
                            id: `${data.id}`,
                            kind: `${data.kind}`,
                            brand: `${data.brand}`,
                            product: `${data.product}`,
                            dose: '',
                          })}
                        >
                          {data.product} {data.kind}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={classes.medi}>
                  <p>Dosis</p>
                  <div className={classes.medicinecols}>
                    <input
                      type='number'
                      min='0'
                      id='num'
                      name='num'
                      onChange={changeInputDosis}
                    ></input>

                    <select name='unidad' onChange={changeInputDosis}>
                      <option value='ml'>ml</option>
                      <option value='mg'>mg</option>
                      <option value='unid'>unid</option>
                    </select>
                    <select name='tiempo' onChange={changeInputDosis}>
                      <option value='cada 4 horas'>cada 4 horas</option>
                      <option value='cada 6 horas'>cada 6 horas</option>
                      <option value='cada 8 horas'>cada 8 horas</option>
                      <option value='cada 12 horas'>cada 12 horas</option>
                      <option value='cada 24 horas'>cada 24 horas</option>
                      <option value='cada 48 horas'>cada 48 horas</option>
                    </select>
                    <Button onClick={addMedicineHandler}>
                      <BsCheckLg />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardForm>
        </div>
      </div>
    </Container>
  );
};

export default UpdateVisit;
