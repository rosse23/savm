import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClientRequests } from '../../lib/api/';
import { PetRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import Container from '../UI/Container';
import classes from './GetPetinfo.module.css';
import { useDispatch } from 'react-redux';
import Button from '../UI/Button';
import { motion } from 'framer-motion';
import CardForm from '../UI/CardForm';
import { Form } from '../UI/Form';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const UpdatePet = () => {
  const [opensearch, setOpensearch] = useState(false);
  const [ownername, setOwnername] = useState(null);
  const [clients, setClients] = useState([]);
  const [searchs, setSearchs] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    name: '',
    kind: '',
    sex: '',
    breed: '',
    weight: '',
    age: '',
    lastHeat: '',
    agresivity: '',
    owner: '',
  });

  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  const [filteredop, setFilteredop] = useState([]);
  const opciones = [
    'Canino',
    'Felino',
    'Ave',
    'Bovino',
    'Caprino',
    'Porcino',
    'Ovino',
  ];
  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const getpet = async () => {
      const result = await PetRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      setCredentials(result.data.data);
      setOwnername(result.data.data.owner?.name);
      var auxpos = opciones.indexOf(result.data.data.kind);
      opciones.splice(auxpos, 1);
      opciones.splice(0, 0, result.data.data.kind);
      setFilteredop(opciones);
      console.log(result.data.data.owner?.namee);
      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getpet();
  }, []);
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  const actionButton = async (e) => {
    e.preventDefault();
    console.log(credentials);
    console.log('kalesita');
    const result = await PetRequests.updateOne(
      id,
      credentials,
      localStorage.getItem('userToken')
    );
    console.log(credentials);
    console.log(result);

    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: `/app/pet/viewpet?id=${id}` }, { replace: true });
  };
  useEffect(() => {
    const getAllClients = async () => {
      const result = await ClientRequests.getAll(
        localStorage.getItem('userToken')
      );
      console.log(result);
      console.log(opensearch);
      setClients(
        result.data.data.filter((client) =>
          client.name.toLowerCase().includes(searchs.toLowerCase())
        )
      );
    };
    const fetchClients = setTimeout(() => {
      console.log('fetching');
      getAllClients();
    }, 1000);

    return () => {
      clearTimeout(fetchClients);
    };
  }, [searchs]);
  const onSearchHandler = async (e) => {
    setSearchs(e.target.value);
  };

  return (
    <Container>
      <div className={classes.GetPetinfo}>
        <div className={classes.buttonsedit}>
          <h2>Editar Paciente</h2>
          <Button onClick={actionButton}>Guardar</Button>
        </div>

        <Form>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Especie: </p>
              </div>
              <div className={classes.formresp}>
                <select id='kind' name='kind' onChange={changeInputHandler}>
                  {filteredop?.map((data) => {
                    return <option value={data}>{data}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Raza: </p>
              </div>
              <div className={classes.formresp}>
                <input
                  id='breed'
                  name='breed'
                  value={credentials.breed}
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Sexo: </p>
              </div>
              <div className={classes.formresp}>
                {credentials.sex == 'Hembra' && (
                  <div>
                    <select id='sex' name='sex' onChange={changeInputHandler}>
                      <option value={credentials.role}>Hembra</option>
                      <option value={'Macho'}>Macho</option>}
                    </select>
                  </div>
                )}
                {credentials.sex == 'Macho' && (
                  <div>
                    <select id='sex' name='sex' onChange={changeInputHandler}>
                      <option value={credentials.role}>Macho</option>
                      <option value={'Hembra'}>Hembra</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Agresividad: </p>
              </div>
              <div className={classes.formresp}>
                <input
                  type='number'
                  min='0'
                  max='5'
                  id='agresivity'
                  name='agresivity'
                  value={credentials.agresivity}
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Peso: </p>
              </div>
              <div className={classes.formresp}>
                <input
                  type='number'
                  min='0'
                  step='0.05'
                  id='weight'
                  name='weight'
                  value={credentials.weight}
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Edad: </p>
              </div>
              <div className={classes.formresp}>
                <input
                  type='number'
                  id='age'
                  min='0'
                  max='25'
                  step='0.05'
                  name='age'
                  value={credentials.age}
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Cumpleaños: </p>
              </div>
              <div className={classes.formresp}>
                <input
                  type='date'
                  id='birthday'
                  name='birthday'
                  value={credentials.birthday}
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de ultimo celo: </p>
              </div>
              <div className={classes.formresp}>
                <input
                  type='date'
                  id='lastHeat'
                  name='lastHeat'
                  value={credentials.lastHeat}
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
          </div>

          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de registro: </p>
              </div>
              <div className={classes.formresp}>
                <p>{formatDate(credentials.dateReg)}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de ultima modificacion: </p>
              </div>
              <div className={classes.formresp}>
                <p>{formatDate(credentials.lastUpdated)}</p>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Dueño: </p>
              </div>
              <div className={classes.formresp}>
                <input
                  onClick={() => setOpensearch(!opensearch)}
                  type='text'
                  id='owner'
                  name='owner'
                  value={ownername}
                ></input>
                {opensearch ? (
                  <motion.div
                    className={classes['search-section']}
                    variants={backdrop}
                  >
                    <input
                      type='text'
                      placeholder='Por favor, ingrese una letra..'
                      id='owner'
                      name='owner'
                      onChange={onSearchHandler}
                    ></input>
                    <ul>
                      {clients.map((client) => (
                        <li
                          key={client._id}
                          onClick={() => {
                            setOwnername(client.name);
                            setCredentials((prevstate) => ({
                              ...prevstate,
                              owner: client._id,
                            }));
                            setOpensearch(!opensearch);
                          }}
                        >
                          <p>{client.name}</p>
                          <p>
                            CI: <em>{client.ci}</em>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Nombre: </p>
              </div>
              <div className={classes.formresp}>
                <input
                  id='name'
                  name='name'
                  value={credentials.name}
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default UpdatePet;
