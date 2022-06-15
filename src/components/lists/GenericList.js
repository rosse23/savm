import React from 'react';
import { FiX } from 'react-icons/fi';

import classes from './GenericList.module.css';

const GenericList = ({ data }) => {
  return (
    <>
      {data?.length === 0 ? (
        <p>Vacio</p>
      ) : (
        <ul className={classes.list}>
          {data.map((item) => {
            return (
              <li key={item.name}>
                <p>{item.quantity}</p>
                <h5>{item.name}</h5>
                {/* <FiX /> */}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default GenericList;
