import { React, useEffect, useState } from 'react';
import { PetRequests } from '../../lib/api/';
import { MdOutlineAddCircle, MdOutlineSearch } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import FiltersContainer from '../UI/FiltersContainer';
import Container from '../UI/Container';
import List from '../UI/List';
import ListModel from '../UI/ListModel';
import classes from './ListPet.module.css';
const ListPet = () => {
  const [search, setSearch] = useState('');
  const [opensearch, setOpensearch] = useState(false);
  const [pet, setPet] = useState([]);
  const [infoadd, setInfoadd] = useState({
    link1: '/app/pet/viewpet?id=',
    link2: '/app/pet/viewpet/editpet?id=',
    obj: 'owner',
  });
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    sort: '-dateReg',
  });
  const changeInputHandler = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const getpet = async () => {
      const result = await PetRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result.data.data);
      if (result.status === 'fail') {
        console.log(result.message);
        return;
      } else {
        setPet(result.data.data);
        console.log(pet);
      }
    };
    getpet();
  }, [filter]);
  useEffect(() => {
    const getAllPets = async () => {
      const result = await PetRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result);
      console.log(opensearch);
      setPet(
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
  }, [search, filter]);
  const onSearchHandler = async (e) => {
    setSearch(e.target.value);
  };
  return (
    <section>
      <FiltersContainer>
        <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Ordenar Por</label>
          </div>

          <select id='sort' name='sort' onChange={changeInputHandler}>
            <option value={'-dateReg'}>fecha</option>
            <option value={'name'}>nombre</option>
            <option value={'kind'}>Especie</option>
          </select>
        </div>
        <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Buscar</label>
          </div>
          <span className={classes.icon}>
            <MdOutlineSearch />
          </span>
          <input placeholder='search.....' onChange={onSearchHandler}></input>
        </div>
      </FiltersContainer>
      <Container>
        <div className={classes.ListPet}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Pacientes</h2>
              <NavLink exact to='/app/pet/newpet' className={classes.new}>
                <MdOutlineAddCircle />
                <span className={classes.tooltiptext}>Nuevo</span>
              </NavLink>
            </div>

            <div className={classes.tabla}>
              <table className={classes.cuerpotabla}>
                <thead className={classes.title}>
                  <tr>
                    <th>
                      <div>Dueño</div>
                    </th>
                    <th>
                      <div>Nombre</div>
                    </th>
                    <th>
                      <div>Especie</div>
                    </th>
                    <th>
                      <div>Sexo</div>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <ListModel info={pet} infoadd={infoadd} />
              </table>
            </div>
          </List>
        </div>
      </Container>
    </section>
  );
};

export default ListPet;
