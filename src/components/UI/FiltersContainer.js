import React from 'react';
import Container from './Container';
import CardForm from './CardForm';
import classes from './FiltersContainer.module.css';

const FiltersContainer = (props) => {
  return (
    <Container>
      <div className={classes.Filtercontainer}>{props.children}</div>
    </Container>
  );
};

export default FiltersContainer;
