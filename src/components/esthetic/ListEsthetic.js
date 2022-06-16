import { React, useState, useEffect } from 'react';
import { EstheticRequests } from '../../lib/api/';
import { IoIosEye } from 'react-icons/io';
import { AiTwotoneEdit } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineNavigateNext, MdKeyboardArrowLeft } from 'react-icons/md';
import { MdOutlineAddCircle, MdOutlineSearch } from 'react-icons/md';
import FiltersContainer from '../UI/FiltersContainer';
import Container from '../UI/Container';
import List from '../UI/List';
import ListModel from '../UI/ListModel';
import classes from '../user/ListUser.module.css';
const ListEsthetic = () => {
  const [search, setSearch] = useState('');
  const [todo, setTodo] = useState(0);
  const [opensearch, setOpensearch] = useState(false);
  const [esthetic, setEsthetic] = useState([]);
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
      const result = await EstheticRequests.getAll(
        localStorage.getItem('userToken')
      );
      setTodo(parseInt((result.data.data.length + parseInt(4)) / parseInt(5)));
      console.log((result.data.data.length + parseInt(4)) / parseInt(5));
      console.log('nobue');
    };
    getnumber();
  }, []);
  useEffect(() => {
    const getesthetic = async () => {
      const result = await EstheticRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      setEsthetic(result.data.data);
      if (result.status === 'fail') {
        console.log(result.message);
        return;
      }
    };
    getesthetic();
  }, [filter]);
  useEffect(() => {
    const getAllVisits = async () => {
      const result = await EstheticRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result);
      console.log(opensearch);
      setEsthetic(
        result.data.data.filter((visit) =>
          visit.kind.toLowerCase().includes(search.toLowerCase())
        )
      );
    };
    const fetchVisits = setTimeout(() => {
      console.log('fetching');
      getAllVisits();
    }, 1000);

    return () => {
      clearTimeout(fetchVisits);
    };
  }, [search]);

  const onSearchHandler = async (e) => {
    setSearch(e.target.value);
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
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
            <option value={'-dateReg'}>Fecha</option>
            <option value={'kind'}>Motivo</option>
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
              <h2>Resultados</h2>
              <NavLink
                exact
                to='/app/esthetic/newesthetic'
                className={classes.new}
              >
                <MdOutlineAddCircle />
                <span className={classes.tooltiptext}>Nuevo</span>
              </NavLink>
            </div>

            <div className={classes.tabla}>
              <table className={classes.cuerpotabla}>
                <thead className={classes.title}>
                  <tr>
                    <th>
                      <div>Paciente</div>
                    </th>
                    <th>
                      <div>Tipo de servicio</div>
                    </th>
                    <th>
                      <div>Precio</div>
                    </th>
                    <th>
                      <div>Fecha de ingreso</div>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <tbody className={classes.bodytable}>
                  {esthetic.map((data) => (
                    <tr>
                      <td>
                        <div>{data.pet?.name}</div>
                      </td>
                      <td>
                        <div>{data.kind}</div>
                      </td>
                      <td>
                        <div>{data.price}</div>
                      </td>
                      <td>
                        <div>{formatDate(data.dateReg)}</div>
                      </td>
                      <td>
                        <div className={classes.iconos}>
                          <NavLink
                            className={classes.ico1}
                            exact
                            to={`/app/esthetic/viewesthetic?id=${data._id}`}
                          >
                            <IoIosEye />
                            <span className={classes.tooltiptext}>Ver</span>
                          </NavLink>
                          <NavLink
                            className={classes.ico2}
                            exact
                            to={`/app/esthetic/editesthetic?id=${data._id}`}
                          >
                            <AiTwotoneEdit />
                            <span className={classes.tooltiptext}>Editar</span>
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
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

export default ListEsthetic;
