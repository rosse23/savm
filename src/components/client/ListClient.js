import { React, useEffect, useState } from 'react';
import { ClientRequests } from '../../lib/api/';
import { MdOutlineAddCircle, MdOutlineSearch } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import FiltersContainer from '../UI/FiltersContainer';
import { MdOutlineNavigateNext, MdKeyboardArrowLeft } from 'react-icons/md';
import Container from '../UI/Container';
import List from '../UI/List';
import ListModel from '../UI/ListModel';
import classes from '../user/ListUser.module.css';
const ListClient = () => {
  const [search, setSearch] = useState('');
  const [opensearch, setOpensearch] = useState(false);
  const [client, setClient] = useState([]);
  const [todo, setTodo] = useState(0);
  const [infoadd, setInfoadd] = useState({
    link1: '/app/client/viewclient?id=',
    link2: '/app/client/editclient?id=',
    obj: false,
  });
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    sort: '-dateReg',
    page: 1,
    limit: 5,
  });
  const changeInputHandler = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const getnumber = async () => {
      const result = await ClientRequests.getAll(
        localStorage.getItem('userToken')
      );
      setTodo(parseInt((result.data.data.length + parseInt(4)) / parseInt(5)));
      console.log((result.data.data.length + parseInt(4)) / parseInt(5));
      console.log('nobue');
    };
    getnumber();
  }, []);

  useEffect(() => {
    const getclient = async () => {
      const result = await ClientRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result.data.data);
      if (result.status === 'fail') {
        console.log(result.message);
        return;
      } else {
        setClient(result.data.data);
        console.log(client);
      }
    };
    getclient();
  }, [filter]);
  useEffect(() => {
    const getAllClients = async () => {
      const result = await ClientRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result);
      console.log(opensearch);
      setClient(
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

  const handlenext = (e) => {
    setFilter((prevstate) => ({
      ...prevstate,
      page: filter.page + 1,
    }));
    console.log(filter.page);
  };
  const handleprev = (e) => {
    setFilter((prevstate) => ({
      ...prevstate,
      page: filter.page - 1,
    }));
    console.log(filter.page);
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
            <option value={'ci'}>Ci</option>
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
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Clientes</h2>
              <NavLink exact to='/app/client/newclient' className={classes.new}>
                <MdOutlineAddCircle />
                <span className={classes.tooltiptext}>Nuevo</span>
              </NavLink>
            </div>

            <div className={classes.tabla}>
              <table className={classes.cuerpotabla}>
                <thead className={classes.title}>
                  <tr>
                    <th>
                      <div>Nombre</div>
                    </th>
                    <th>
                      <div>Ci</div>
                    </th>
                    <th>
                      <div>Numero de Celular</div>
                    </th>
                    <th>
                      <div>Dirección</div>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <ListModel info={client} infoadd={infoadd} />
              </table>
            </div>
          </List>
        </div>
      </Container>
      <div className={classes.botones}>
        {filter.page > 1 && (
          <button onClick={handleprev}>
            <MdKeyboardArrowLeft />
          </button>
        )}
        {filter.page < todo && (
          <button onClick={handlenext}>
            <MdOutlineNavigateNext />
          </button>
        )}
      </div>
    </section>
  );
};

export default ListClient;
