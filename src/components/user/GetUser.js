import { React, useState, useEffect } from "react";
import { UserRequests } from "../../lib/api/";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
import { Getinfou } from "../UI/Getinfou";
import Container from "../UI/Container";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./GetUser.module.css";
const GetUser = () => {
  const [user, setUser] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  let query = new URLSearchParams(search);
  let id = query.get("id");

  useEffect(async () => {
    const result = await UserRequests.getOne(
      id,
      localStorage.getItem("userToken")
    );
    setUser(result.data.data);
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
    const result = await UserRequests.deleteOne(
      id,
      localStorage.getItem("userToken")
    );
    console.log(result);
    if (result.status === "fail") {
      console.log(result.message);
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: "/app/user/" }, { replace: true });
  };
  const actionUpdate = async (e) => {
    e.preventDefault();
    navigate(
      { pathname: `/app/user/edituser?id=${user._id}` },
      { replace: true }
    );
  };
  return (
    <Container>
      <Getinfou user={user}>
        <Button onClick={() => setShowModal(!showModal)}>Eliminar</Button>{" "}
        <Button onClick={actionUpdate}>Editar</Button>
        <Modal showModal={showModal}>
          <p>Esta seguro de eliminar este usuario?</p>
          <div className={classes.buttoncontainer}>
            <Button onClick={() => setShowModal(!showModal)}>Cancelar</Button>
            <Button onClick={actionDelete}>Aceptar</Button>
          </div>
        </Modal>
      </Getinfou>
    </Container>
  );
};

export default GetUser;
