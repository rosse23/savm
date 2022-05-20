import React from "react";
import { Form } from "./Form";
import classes from "./Getinfou.module.css";
export const Getinfou = (props) => {
  const user = props.user;
  return (
    <div className={classes.Getmeinfo}>
      <h2 className={classes.title}>Datos del Usuario</h2>
      <section>
        <Form>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Nombre:</p>
            </div>
            <div className={classes.formresp}>
              <p>{user.name} </p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Email:</p>
            </div>
            <div className={classes.formresp}>
              <p>{user.email}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Cedula de identidad:</p>
            </div>
            <div className={classes.formresp}>
              <p>{user.ci}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Rol:</p>
            </div>
            <div className={classes.formresp}>
              <p>{user.role}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Fecha de registro:</p>
            </div>
            <div className={classes.formresp}>
              <p>{user.createdAt}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Fecha de modificación:</p>
            </div>
            <div className={classes.formresp}>
              <p>{user.updatedAt}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Fecha de modificación de la contraseña:</p>
            </div>
            <div className={classes.formresp}>
              <p> {user.passwordChangedAt}</p>
            </div>
          </div>
        </Form>
        <div className={classes.buttons}>{props.children}</div>
      </section>
    </div>
  );
};
