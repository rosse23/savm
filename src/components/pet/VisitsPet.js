import { React, useState, useEffect } from 'react';
import { PetRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import { useLocation } from 'react-router-dom';
import classes from '../user/ListUser.module.css';
import { IoIosEye } from 'react-icons/io';
import List from '../UI/List';

const VisitsPet = () => {
  const [pet, setPet] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(() => {
    const getpet = async () => {
      const result = await PetRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      console.log(result);
      setPet(result.data.data);
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
  return (
    <Container>
      <div className={classes.ListUser}>
        <List>
          <div className={classes.cabecera}>
            <h2>Revisiones</h2>
          </div>
          <div className={classes.tabla}>
            <table className={classes.cuerpotabla}>
              <thead className={classes.title}>
                <tr>
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
                {pet.visits?.map((data) => (
                  <tr>
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
  );
};

export default VisitsPet;
