import React from "react";
import Container from "./Container";
import CardForm from "./CardForm";
import classes from "./FiltersContainer.module.css";

const FiltersContainer = (props) => {
  return (
    <Container>
      <CardForm>
        <div className={classes.Filtercontainer}>
          <div className={classes.Filter}>
            <label>Ordenar Por</label>
            <select id="sort" name="sort">
              <option value={"name"}>nombre</option>
              <option value={"email"}>Email</option>
              <option value={"name"}>CI</option>
            </select>
          </div>

          <div className={classes.Filter}>
            <label>Tipo</label>
            <select id="sort" name="sort">
              <option value={"name"}>Ascendente</option>
              <option value={"email"}>Descendente</option>
            </select>
          </div>
          <div className={classes.Filter}>
            <label>Fecha de registro</label>
            <input></input>
          </div>
        </div>

        <div className={classes.busqueda}>{props.children}</div>
      </CardForm>
    </Container>
  );
};

export default FiltersContainer;
