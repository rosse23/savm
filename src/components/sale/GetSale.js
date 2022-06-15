import { React, useState, useEffect } from 'react';
import { SaleRequests, ProductRequests } from '../../lib/api/';
import { RiDeleteBin5Fill, RiEdit2Fill } from 'react-icons/ri';
import { BsJournalText } from 'react-icons/bs';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from '../client/GetClientinfo.module.css';
import { Form } from '../UI/Form';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
const GetSale = () => {
  const [sale, setSale] = useState({});
  const [product, setProduct] = useState([]);
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(() => {
    const getsale = async () => {
      const result = await SaleRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      setSale(result.data.data);

      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getsale();
  }, []);
  useEffect(() => {
    const getproduct = async () => {
      setProduct([]);
      {
        sale.product &&
          sale.product.map(async (data) => {
            const res = await ProductRequests.getOne(
              data.productId,
              localStorage.getItem('userToken')
            );
            console.log(res.data.data);
            console.log('nobue');
            console.log(res);
            setProduct((product) => [...product, res.data.data]);
          });
        console.log(product);
      }
    };
    getproduct();
  }, [sale]);

  const actionDelete = async (e) => {
    e.preventDefault();
    setShowModal(!showModal);
    const result = await SaleRequests.deleteOne(
      id,
      localStorage.getItem('userToken')
    );
    if (result.status === 'fail') {
      console.log(result.message);
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: '/app/sale/' }, { replace: true });
  };
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  return (
    <Container>
      <div className={classes.GetSaleinfo}>
        <h2 className={classes.title}>Datos de la Venta</h2>
        <Form>
          <div className={classes.port}>
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
          </div>
          <div className={classes.contenido}>
            <div className={classes.cols2}>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Cliente: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{sale.client?.name}</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Fecha: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{formatDate(sale.saleDate)}</p>
                </div>
              </div>
            </div>
            <div className={classes.cols2}>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Cantidad de productos: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{sale.quantityItems}</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Precio total: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{sale.totalPrice} Bs.</p>
                </div>
              </div>
            </div>

            <div className={classes.title2}>
              <h3>Productos</h3>
            </div>
            {product?.map((data) => (
              <div className={classes.cols3}>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Producto: </p>
                  </div>
                  <div className={classes.formresp}>
                    <p>{data.name}</p>
                  </div>
                </div>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Precio:</p>
                  </div>
                  <div className={classes.formresp}>
                    <p>{data.price}</p>
                  </div>
                </div>
                <div className={classes.formsection1}>
                  <div className={classes.formtitle}>
                    <p>Categoria:</p>
                  </div>
                  <div className={classes.formresp}>
                    <p>{data.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default GetSale;
