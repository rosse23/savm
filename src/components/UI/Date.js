import React from 'react';

const Date = (props) => {
  const fecha = props.fecha;
  console.log(fecha);
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  return <div>{formatDate(fecha)}</div>;
};

export default Date;
