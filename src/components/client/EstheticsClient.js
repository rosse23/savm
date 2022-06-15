import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './PetsClient.module.css';
import { IoIosEye } from 'react-icons/io';
const EstheticsClient = (props) => {
  const client = props.client;
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  return (
    <div className={classes.clientnav}>
      {client.esthetics?.map((data) => (
        <div className={classes.sep}>
          <div className={classes.cols3}>
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
            <div className={classes.formsection1}>
              <div className={classes.formtitle1}>
                <p>Fecha</p>
              </div>
              <div className={classes.formresp1}>
                <p>{formatDate(data.dateReg)}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle1}>
                <p>Motivo de visita</p>
              </div>
              <div className={classes.formresp1}>
                <p>{data.kind}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EstheticsClient;
