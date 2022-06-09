import React from 'react';
import { IoIosEye } from 'react-icons/io';
import { AiTwotoneEdit } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import classes from './ListModel.module.css';

const ListModel = (props) => {
  const info = props.info;
  const link1 = props.infoadd.link1;
  const link2 = props.infoadd.link2;
  const obj = props.infoadd.obj;
  return (
    <tbody className={classes.bodytable}>
      {info.map((data) => (
        <tr>
          {obj && (
            <td>
              {data[obj] == null ? (
                <div>Desconocido</div>
              ) : (
                <div>{data[obj].name}</div>
              )}
            </td>
          )}

          <td>
            <div>{Object.values(data)[1]}</div>
          </td>
          <td>
            <div>{Object.values(data)[2]}</div>
          </td>
          <td>
            <div>{Object.values(data)[3]}</div>
          </td>
          {obj == false && (
            <td>
              <div>{Object.values(data)[4]}</div>
            </td>
          )}

          <td>
            <div className={classes.iconos}>
              <NavLink
                className={classes.ico1}
                exact
                to={`${link1}${Object.values(data)[0]}`}
              >
                <IoIosEye />
                <span className={classes.tooltiptext}>Ver</span>
              </NavLink>
              <NavLink
                className={classes.ico2}
                exact
                to={`${link2}${Object.values(data)[0]}`}
              >
                <AiTwotoneEdit />
                <span className={classes.tooltiptext}>Editar</span>
              </NavLink>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ListModel;
