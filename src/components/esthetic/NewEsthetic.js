import { React, useState, useEffect } from 'react';
import classes from './NewEsthetic.module.css';
import Button from '../UI/Button';
import { motion } from 'framer-motion';
import CardForm from '../UI/CardForm';
import { EstheticRequests } from '../../lib/api/';
import { PetRequests } from '../../lib/api/';
import { useNavigate } from 'react-router-dom';
import Container from '../UI/Container';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const NewEsthetic = () => {
  const [opensearch, setOpensearch] = useState(false);
  const [petname, setPetname] = useState(null);
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [credentials, setCredentials] = useState({
    kind: 'otros',
    price: 0,
    detail: '',
    pet: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const actionButton = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const result = await EstheticRequests.createOne(
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
    navigate({ pathname: `/app/esthetic/` }, { replace: true });
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
          pet.name.toLowerCase().includes(search.toLowerCase())
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
  }, [search]);
  const onSearchHandler = async (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <div className={classes.NewEsthetic}>
        <h2>Nueva Visita de Estetica</h2>
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
                              setCredentials((prevstate) => ({
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
            <div className={classes.Sale}>
              <div>
                <p> Tipo de visita</p>
                <select id='kind' name='kind' onChange={changeInputHandler}>
                  <option value={'Otros'}>Otros</option>
                  <option value={'Baño'}>Baño</option>
                  <option value={'Corte'}>Corte</option>
                  <option value={'Baño y Corte'}>Baño y Corte</option>
                  <option value={'Baño Sanitario'}>Baño Sanitario</option>
                  <option value={'Corte Sanitario'}>Corte Sanitario</option>
                  <option value={'Limpieza Dental'}>Limpieza Dental</option>
                  <option value={'Baño Sanitario y Corte'}>
                    Baño Sanitario y Corte
                  </option>
                </select>
              </div>

              <div>
                <p>Detalle:</p>
                <textarea
                  value={credentials.detail}
                  id='detail'
                  name='detail'
                  onChange={changeInputHandler}
                ></textarea>
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

export default NewEsthetic;
