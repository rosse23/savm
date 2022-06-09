import React from 'react';
import Container from './Container';
import CardForm from './CardForm';
import classes from './FiltersContainer.module.css';
import { MdOutlineSearch } from 'react-icons/md';
const FiltersContainer = (props) => {
  return (
    <Container>
      <div className={classes.Filtercontainer}>
        <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Ordenar Por</label>
          </div>

          <select id='sort' name='sort'>
            <option value={'name'}>nombre</option>
            <option value={'email'}>Email</option>
            <option value={'name'}>CI</option>
          </select>
        </div>
        <div className={classes.Filter}>
          <div className={classes.title}>
            <label>Buscar</label>
          </div>
          <span className={classes.icon}>
            <MdOutlineSearch />
          </span>
          <input></input>
        </div>
      </div>
    </Container>
  );
};

export default FiltersContainer;
