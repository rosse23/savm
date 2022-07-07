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
import { BsCheckLg } from 'react-icons/bs';

const infomed = [
  {
    id: '1',
    kind: 'ANTIINFLAMATORIO',
    brand: 'Biofarm',
    product: 'BIODEX',
    dosis: '',
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
const NewVaccines = () => {
  const [credentials, setCredentials] = useState({
    pet: '',
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
    for (var i = 0; i < credentials.medicines.length; i++) {
      // console.log(credentials.medicines[i]);
      // console.log(newMedicine);
      if (credentials.medicines[i].id == newMedicine.id) {
        findmedicine = true;

        break;
      }
    }
    if (findmedicine == false) {
      setCredentials((prev) => {
        return {
          ...prev,
          medicines: [...prev.medicines, newMedicine],
        };
      });
      console.log(credentials.medicines);
    }
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
                  {credentials.medicines.map((medicine) => {
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
                          min={0}
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
