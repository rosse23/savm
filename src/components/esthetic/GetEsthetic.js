import { React, useState, useEffect } from "react";
import { EstheticRequests } from "../../lib/api/";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
import Container from "../UI/Container";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./GetEsthetic.module.css";
import { Form } from "../UI/Form";

const GetEsthetic = () => {
  const [esthetic, setEsthetic] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  let query = new URLSearchParams(search);
  let id = query.get("id");

  useEffect(async () => {
    const result = await EstheticRequests.getOne(
      id,
      localStorage.getItem("userToken")
    );
    setEsthetic(result.data.data);
    if (result.status === "fail") {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
  }, []);

  const actionDelete = async (e) => {
    e.preventDefault();
    setShowModal(!showModal);
    const result = await EstheticRequests.deleteOne(
      id,
      localStorage.getItem("userToken")
    );

    if (result.status === "fail") {
      console.log(result.message);
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: "/app/esthetic/" }, { replace: true });
  };
  const actionUpdate = async (e) => {
    e.preventDefault();
    navigate(
      { pathname: `/app/esthetic/editesthetic?id=${esthetic._id}` },
      { replace: true }
    );
  };
  return (
    <Container>
      <div className={classes.GetEsthetic}>
        <h2>Detalles de Visita a Estética</h2>
        <Form>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Paciente: </p>
            </div>
            <div className={classes.formresp}>
              <p>{esthetic.pet?.name}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Motivo: </p>
            </div>
            <div className={classes.formresp}>
              <p>{esthetic.kind}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Detalles: </p>
            </div>
            <div className={classes.formresp}>
              <p>{esthetic.detail}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Fecha de visita: </p>
            </div>
            <div className={classes.formresp}>
              <p>{esthetic.dateReg}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Precio de visita: </p>
            </div>
            <div className={classes.formresp}>
              <p>{esthetic.price} Bs</p>
            </div>
          </div>
        </Form>

        <div className={classes.buttons}>
          <Button onClick={() => setShowModal(!showModal)}>Eliminar</Button>{" "}
          <Button onClick={actionUpdate}>Editar</Button>
          <Modal showModal={showModal}>
            <p>Esta seguro de eliminar esta visita de estética?</p>
            <div className={classes.buttons}>
              <Button onClick={() => setShowModal(!showModal)}>Cancelar</Button>
              <Button onClick={actionDelete}>Aceptar</Button>
            </div>
          </Modal>
        </div>
      </div>
    </Container>
  );
};

export default GetEsthetic;
