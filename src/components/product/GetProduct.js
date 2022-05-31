import { React, useState, useEffect } from "react";
import { ProductRequests } from "../../lib/api/";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
import Container from "../UI/Container";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "../esthetic/GetEsthetic.module.css";
import { Form } from "../UI/Form";

const GetProduct = () => {
  const [product, setProduct] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  let query = new URLSearchParams(search);
  let id = query.get("id");

  useEffect(async () => {
    const result = await ProductRequests.getOne(
      id,
      localStorage.getItem("userToken")
    );
    setProduct(result.data.data);
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
    const result = await ProductRequests.deleteOne(
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
    navigate({ pathname: "/app/product/" }, { replace: true });
  };
  const actionUpdate = async (e) => {
    e.preventDefault();
    navigate(
      { pathname: `/app/product/editproduct?id=${product._id}` },
      { replace: true }
    );
  };

  return (
    <Container>
      <div className={classes.GetEsthetic}>
        <h2>Detalles de Producto</h2>
        <Form>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Nombre: </p>
            </div>
            <div className={classes.formresp}>
              <p>{product.name}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Categoria: </p>
            </div>
            <div className={classes.formresp}>
              <p>{product.category}</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Cantidad existente: </p>
            </div>
            <div className={classes.formresp}>
              <p>{product.stock} unidades</p>
            </div>
          </div>
          <div className={classes.formsection}>
            <div className={classes.formtitle}>
              <p>Precio de venta: </p>
            </div>
            <div className={classes.formresp}>
              <p>{product.price} Bs</p>
            </div>
          </div>
        </Form>

        <div className={classes.buttons}>
          <Button onClick={() => setShowModal(!showModal)}>Eliminar</Button>{" "}
          <Button onClick={actionUpdate}>Editar</Button>
          <Modal showModal={showModal}>
            <p>Esta seguro de eliminar este producto?</p>
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

export default GetProduct;
