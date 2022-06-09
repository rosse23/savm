import { React, useState, useEffect } from 'react';
import { ClientRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import { useLocation } from 'react-router-dom';
import classes from './GetClientinfo.module.css';
import { IoIosEye } from 'react-icons/io';
import List from '../UI/List';
const SalesClient = () => {
  const [client, setClient] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(() => {
    const getclient = async () => {
      const result = await ClientRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      console.log(result);
      setClient(result.data.data);
      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getclient();
  }, []);

  return (
    <div className={classes.clientnav}>
      {client.sales?.map((data) => (
        <div className={classes.sep}>
          <div className={classes.cols4}>
            <div className={classes.iconos}>
              <NavLink
                className={classes.ico1}
                exact
                to={`/app/product/viewproduct?id=${data._id}`}
              >
                <IoIosEye />
                <span className={classes.tooltiptext}>Ver</span>
              </NavLink>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle1}>
                <p>Fecha de compra</p>
              </div>
              <div className={classes.formresp1}>
                <p>{data.saleDate}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle1}>
                <p>Precio de venta</p>
              </div>
              <div className={classes.formresp1}>
                <p>{data.price} Bs</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SalesClient;
