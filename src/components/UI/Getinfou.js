import React from 'react';
import { Form } from './Form';
import classes from './Getinfou.module.css';
export const Getinfou = (props) => {
  const user = props.user;
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  return (
    <div className={classes.Getmeinfo}>
      <h2 className={classes.title}>Datos del Usuario</h2>
      <section>
        <Form>
          <div className={classes.cols2}>
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
                <p>Cedula de identidad:</p>
              </div>
              <div className={classes.formresp}>
                <p>{user.ci}</p>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
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
                <p>Rol:</p>
              </div>
              <div className={classes.formresp}>
                <p>{user.role}</p>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de registro:</p>
              </div>
              <div className={classes.formresp}>
                <p>{formatDate(user.createdAt)}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de modificaci??n:</p>
              </div>
              <div className={classes.formresp}>
                <p>{formatDate(user.updatedAt)}</p>
              </div>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Fecha de modificaci??n de la contrase??a:</p>
            </div>
            <div className={classes.formresp}>
              {user.passwordChangedAt && (
                <p> {formatDate(user.passwordChangedAt)}</p>
              )}
            </div>
          </div>
        </Form>
        <div className={classes.buttons}>{props.children}</div>
      </section>
    </div>
  );
};
