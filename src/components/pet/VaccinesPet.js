import { React, useState, useEffect } from 'react';
import { VisitRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import { useLocation } from 'react-router-dom';
import classes from '../user/ListUser.module.css';
import { IoIosEye } from 'react-icons/io';
import List from '../UI/List';

const VaccinesPet = () => {
  const [medicine, setMedicine] = useState([]);
  let { search } = useLocation();
  const dispatch = useDispatch();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(() => {
    const getmedicineperpet = async () => {
      const result = await VisitRequests.showMedicinesByPet(
        id,
        localStorage.getItem('userToken')
      );
      console.log(result.data[0]?.medicines);
      setMedicine(result.data[0]?.medicines);
      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getmedicineperpet();
  }, []);
  return (
    <Container>
      <div className={classes.ListUser}>
        <List>
          <div className={classes.cabecera}>
            <h2>Medicamentos</h2>
          </div>
          <div className={classes.tabla}>
            <table className={classes.cuerpotabla}>
              <thead className={classes.title}>
                <tr>
                  <th>
                    <div>Producto</div>
                  </th>
                  <th>
                    <div>Uso</div>
                  </th>
                  <th>
                    <div>Laboratorio</div>
                  </th>
                  {/* <th>
                    <div></div>
                  </th> */}
                </tr>
              </thead>
              <tbody className={classes.bodytable}>
                {medicine.map((data) => (
                  <tr>
                    <td>
                      <div>{data.product}</div>
                    </td>
                    <td>
                      <div>{data.kind}</div>
                    </td>
                    <td>
                      <div>{data.brand}</div>
                    </td>

                    {/* <td>
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
                    </td> */}
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

export default VaccinesPet;
