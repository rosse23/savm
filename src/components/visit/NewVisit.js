import { React, useState, useEffect } from 'react';
import classes from './NewVisit.module.css';
import Button from '../UI/Button';
import { motion } from 'framer-motion';
import CardForm from '../UI/CardForm';
import { VisitRequests } from '../../lib/api/';
import { ClientRequests } from '../../lib/api/';
import { useNavigate } from 'react-router-dom';
import Container from '../UI/Container';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const NewVisit = () => {
  const [opensearch, setOpensearch] = useState(false);
  const [pets, setPets] = useState([]);
  const [clientname, setClientname] = useState(null);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [credentials, setCredentials] = useState({
    pet: '',
    client: '',
    reason: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new Date().toLocaleDateString();
  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.value);
  };
  const actionButton = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const result = await VisitRequests.createOne(
      localStorage.getItem('userToken'),
      credentials
    );
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      console.log(result.message);
      return;
    }
    console.log(result.data.data._id);
    navigate(
      { pathname: `/app/visit/paramsvisit?id=${result.data.data._id}` },
      { replace: true }
    );
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
          client.name.toLowerCase().includes(search.toLowerCase())
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
  }, [search]);
  const onSearchHandler = async (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const getpetsClients = async () => {
      const result = await ClientRequests.getOne(
        credentials.client,
        localStorage.getItem('userToken')
      );
      console.log(result.data.data.pets);

      setPets(result.data.data.pets);

      if (result.data.data.pets?.length > 0) {
        setCredentials((prevstate) => ({
          ...prevstate,
          pet: result.data.data.pets[0]._id,
        }));
        console.log(result.data.data.pets[0]._id);
        console.log('nobue');
      }

      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        console.log(result.message);
        return;
      }
    };
    getpetsClients();
  }, [credentials.client]);
  return (
    <Container>
      <div className={classes.NewVisit}>
        <h2>Nueva Visita</h2>
        <div className={classes.formcontainer}>
          <CardForm>
            <div className={classes.petcontainer}>
              <div>
                <div className={classes.pet}>
                  <p>Cliente: </p>
                  <div className={classes.inputpet}>
                    <input
                      onClick={() => setOpensearch(!opensearch)}
                      type='text'
                      placeholder='Ingrese el cliente'
                      id='client'
                      name='client'
                      value={clientname}
                    ></input>
                    {opensearch && (
                      <motion.div
                        className={classes['search-section']}
                        variants={backdrop}
                      >
                        <input
                          type='text'
                          placeholder='Por favor, ingrese una letra..'
                          id='client'
                          name='client'
                          onChange={onSearchHandler}
                        ></input>
                        <ul>
                          {clients.map((data) => (
                            <li
                              key={data._id}
                              onClick={() => {
                                setClientname(data.name);
                                setCredentials((prevstate) => ({
                                  ...prevstate,
                                  client: data._id,
                                }));
                                setOpensearch(!opensearch);
                              }}
                            >
                              <p>{data.name} </p>
                              <p>Ci: {data.ci}</p>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
                {credentials.client && (
                  <div className={classes.pet}>
                    <p>Paciente: </p>
                    <select id='pet' name='pet' onChange={changeInputHandler}>
                      {pets?.map((data) => {
                        return <option value={data.id}>{data.name}</option>;
                      })}
                    </select>
                  </div>
                )}
              </div>
              <div className={classes.preciototal}>
                <p> Fecha: </p>
                <p>{date}</p>
              </div>
            </div>
          </CardForm>
          <CardForm>
            <div className={classes.contenido}>
              <div>
                <p>Motivo:</p>
                <input
                  value={credentials.reason}
                  id='reason'
                  name='reason'
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
          </CardForm>
          <div className={classes.crearbut}>
            <Button onClick={actionButton}>Crear</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewVisit;
