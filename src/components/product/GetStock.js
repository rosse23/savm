import { React, useState, useEffect } from 'react';
import { StockRequests } from '../../lib/api/';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from '../client/GetClientinfo.module.css';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import Button from '../UI/Button';
import { Form } from '../UI/Form';
const GetStock = () => {
  const [stock, setStock] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let query = new URLSearchParams(search);
  let id = query.get('id');

  useEffect(() => {
    const getsale = async () => {
      const result = await StockRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      setStock(result.data.data);

      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getsale();
  }, []);
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  const actionCancel = async (e) => {
    e.preventDefault();
    navigate({ pathname: `/app/product/liststock` }, { replace: true });
  };
  return (
    <Container>
      <div className={classes.GetSaleinfo}>
        <h2 className={classes.title}>Datos del registro de Stock</h2>
        <Form>
          {/* <div className={classes.port}>
             <div className={classes.info}>
              <BsJournalText />
              <h3>{sale.client?.name}</h3>
            </div>
            <div className={classes.Navop}>
              <button
                className={classes.ico1}
                onClick={() => setShowModal(!showModal)}
              >
                <RiDeleteBin5Fill />
                <span className={classes.tooltiptext}>Eliminar</span>
              </button>
            </div>
            <Modal showModal={showModal}>
              <p>Esta seguro de cancelar esta venta?</p>
              <div className={classes.buttons}>
                <Button onClick={() => setShowModal(!showModal)}>
                  Cancelar
                </Button>
                <Button onClick={actionDelete}>Aceptar</Button>
              </div>
            </Modal>
          </div> */}
          <div className={classes.contenido}>
            <div className={classes.title2}>
              <h3>Datos del Producto</h3>
            </div>
            <div className={classes.cols2}>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Nombre: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{stock.product?.name}</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Categoria: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{stock.product?.category}</p>
                </div>
              </div>
            </div>
            <div className={classes.cols2}>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Precio unid: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{stock.product?.price} Bs.</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Cantidad vendida: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{stock.product?.unitsSold} unid.</p>
                </div>
              </div>
            </div>

            <div className={classes.title2}>
              <h3>Stock ingresado</h3>
            </div>
            <div className={classes.cols2}>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Cantidad de ingreso: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{stock.quantityEntered}</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Precio Total: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{stock.totalPrice} Bs. </p>
                </div>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de ingreso: </p>
              </div>
              <div className={classes.formresp}>
                <p>{formatDate(stock.enterDate)}</p>
              </div>
            </div>
          </div>
        </Form>
        <div className={classes.buttons}>
          <Button onClick={actionCancel}>Atrás</Button>
        </div>
      </div>
    </Container>
  );
};

export default GetStock;
