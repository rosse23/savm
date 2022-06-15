import { React, useState, useEffect } from 'react';
import { VisitRequests } from '../../lib/api/';
import { NavLink } from 'react-router-dom';
import { IoIosEye } from 'react-icons/io';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdOutlineAddCircle, MdOutlineSearch } from 'react-icons/md';
import FiltersContainer from '../UI/FiltersContainer';
import Container from '../UI/Container';
import List from '../UI/List';
import ListModel from '../UI/ListModel';
import classes from '../user/ListUser.module.css';
const ListVisit = () => {
  const [search, setSearch] = useState('');
  const [opensearch, setOpensearch] = useState(false);
  const [visit, setVisit] = useState([]);
  const [filter, setFilter] = useState({
    sort: '-createdAt',
  });
  const changeInputHandler = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const getvisit = async () => {
      const result = await VisitRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result.data.data);
      if (result.status === 'fail') {
        console.log(result.message);
        return;
      } else {
        setVisit(result.data.data);
      }
    };
    getvisit();
  }, [filter]);
  useEffect(() => {
    const getAllVisits = async () => {
      const result = await VisitRequests.getAll(
        localStorage.getItem('userToken'),
        filter
      );
      console.log(result);
      console.log(opensearch);
      setVisit(
        result.data.data.filter((visit) =>
          visit.reason.toLowerCase().includes(search.toLowerCase())
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
  return (
    <section>
      <FiltersContainer>
        <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Ordenar Por</label>
          </div>

          <select id='sort' name='sort' onChange={changeInputHandler}>
            <option value={'-fechaReg'}>Fecha</option>
            <option value={'reason'}>Motivo</option>
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
              <NavLink exact to='/app/visit/newvisit' className={classes.new}>
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
                      <div>Motivo</div>
                    </th>
                    <th>
                      <div>Diagnostico</div>
                    </th>
                    <th>
                      <div>Fecha</div>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <tbody className={classes.bodytable}>
                  {visit.map((data) => (
                    <tr>
                      <td>
                        <div>{data.pet?.name}</div>
                      </td>
                      <td>
                        <div>{data.reason}</div>
                      </td>
                      <td>
                        <div>{data.diagnosis}</div>
                      </td>
                      <td>
                        <div>{formatDate(data.fechaReg)}</div>
                      </td>

                      <td>
                        <div className={classes.iconos}>
                          <NavLink
                            className={classes.ico1}
                            exact
                            to={`/app/visit/viewvisit?id=${data._id}`}
                          >
                            <IoIosEye />
                            <span className={classes.tooltiptext}>Ver</span>
                          </NavLink>
                          <NavLink
                            className={classes.ico2}
                            exact
                            to={`/app/visit/editvisit?id=${data._id}`}
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
    </section>
  );
};

export default ListVisit;
