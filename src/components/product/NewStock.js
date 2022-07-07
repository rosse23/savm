import { React, useState, useEffect } from 'react';
import classes from '../pet/NewPet.module.css';
import { Form } from '../UI/Form';
import Button from '../UI/Button';
import { ProductRequests, StockRequests } from '../../lib/api/';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '../UI/Container';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import Search from '../serch/Search';
const NewStock = () => {
  const [showProductSearcher, setShowProductSearcher] = useState(false);
  const [auxProduct, setAuxProduct] = useState();
  const [credentials, setCredentials] = useState({
    product: '',
    quantityEntered: '',
    totalPrice: '',
  });
  const navigate = useNavigate();
  let { search } = useLocation();
  const dispatch = useDispatch();
  let query = new URLSearchParams(search);
  let id = query.get('id');

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const getproduct = async () => {
      if (id != null) {
        const result = await ProductRequests.getOne(
          id,
          localStorage.getItem('userToken')
        );
        console.log(id);
        setCredentials((prev) => ({ ...prev, product: id }));
        setAuxProduct(result.data.data);
      }
    };
    getproduct();
  }, []);
  const selectProductHandler = (item) => {
    setCredentials((prev) => ({ ...prev, product: item._id }));
    setAuxProduct(item);
    setShowProductSearcher(false);
  };
  const cancelProductHandler = () => {
    setShowProductSearcher(false);
  };
  const showProductSearcherHandler = () => {
    setShowProductSearcher(true);
  };
  const actionButton = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const result = await StockRequests.createOne(
      localStorage.getItem('userToken'),
      credentials
    );
    console.log(credentials);
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      console.log(result.message);
      return;
    }
    navigate({ pathname: `/app/product/liststock` }, { replace: true });
  };
  return (
    <Container>
      <div className={classes.NewPet}>
        <h2>Registro de nuevo stock</h2>
        <div className={classes.formusercontainer}>
          <Form>
            <div className={classes.enterproduct}>
              {showProductSearcher ? (
                <Search
                  TargetRequests={ProductRequests}
                  onAccept={selectProductHandler}
                  onCancel={cancelProductHandler}
                  fieldToShow={'name'}
                />
              ) : (
                !auxProduct && (
                  <>
                    <em>No se seleccionó ningun producto</em>
                    <br />
                    <button type='button' onClick={showProductSearcherHandler}>
                      Seleccionar Producto
                    </button>
                  </>
                )
              )}
              {auxProduct && (
                <>
                  <div className={classes['item-client']}>
                    <h4>{auxProduct?.name}</h4>
                    <p>Categoria: {auxProduct?.category}</p>
                    <p>Precio: {auxProduct?.price}</p>
                    <p>Cantidad Actual: {auxProduct?.stock}</p>
                  </div>
                  <button
                    type='button'
                    onClick={() => {
                      setAuxProduct(null);
                    }}
                  >
                    Borrar
                  </button>
                </>
              )}
            </div>
            <p type='Cantidad'>
              <input
                type='number'
                min='0'
                placeholder='Ingrese la cantidad de producto de este tipo..'
                id='quantityEntered'
                name='quantityEntered'
                value={credentials.quantityEntered}
                onChange={changeInputHandler}
              ></input>
            </p>
            <p type='Precio Total'>
              <input
                type='number'
                min='1'
                step='0.5'
                placeholder='Ingrese el precio total'
                id='totalPrice'
                name='totalPrice'
                value={credentials.totalPrice}
                onChange={changeInputHandler}
              ></input>
            </p>
          </Form>
          <div className={classes.crearbut}>
            <Button onClick={actionButton}>Crear</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default NewStock;
