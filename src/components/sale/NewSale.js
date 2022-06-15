import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './NewSale.module.css';
import { ClientRequests, ProductRequests, SaleRequests } from '../../lib/api';
import Search from '../serch/Search';
import GenericList from '../lists/GenericList';
import Container from '../UI/Container';
import CardForm from '../UI/CardForm';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
const NewSale = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newSale, setNewSale] = useState({
    quantityItems: 0,
    totalPrice: 0,
    product: [],
    client: null,
  });
  const [auxClient, setAuxClient] = useState(null);
  const [showClientSearcher, setShowClientSearcher] = useState(false);

  const [auxProducts, setAuxProducts] = useState([]);
  const [showProductSearcher, setShowProductSearcher] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);

  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();

    const cantItems = products.reduce((acc, item) => {
      return acc + +item.quantity;
    }, 0);

    const realSale = {
      quantityItems: cantItems,
      totalPrice: newSale.totalPrice,
      product: products,
      client: newSale.client,
    };

    const response = await SaleRequests.createOne(
      localStorage.getItem('userToken'),
      realSale
    );
    if (response.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(response.message)))
      );
      console.log(response.message);
      return;
    }
    navigate({ pathname: `/app/sale/` }, { replace: true });
  };

  const selectClientHandler = (item) => {
    setNewSale((prev) => ({ ...prev, client: item._id }));
    setAuxClient(item);
    setShowClientSearcher(false);
  };

  const cancelClientHandler = () => {
    setShowClientSearcher(false);
  };

  const cancelProductHandler = () => {
    setShowProductSearcher(false);
  };

  const addProductHandler = () => {
    // const existProduct = products.find((prItem) => {
    //   return prItem.productId === tempProduct._id;
    // });

    // if (existProduct) {
    // } else {

    // }
    console.log(quantity);
    setProducts((prev) => [
      ...prev,
      {
        productId: tempProduct._id,
        quantity,
      },
    ]);

    setAuxProducts((prev) => [
      ...prev,
      {
        name: tempProduct.name,
        quantity,
      },
    ]);

    setNewSale((prev) => {
      return {
        ...prev,
        totalPrice: prev.totalPrice + +tempProduct.price * +quantity,
      };
    });
    setTempProduct(null);
    setShowProductSearcher(false);
    setAdding(false);
    setQuantity(0);
  };

  const selectProductHandler = (item) => {
    setTempProduct(item);
  };

  const showClientSearcherHandler = () => {
    setShowClientSearcher(true);
  };

  const showProductSearcherHandler = () => {
    setShowProductSearcher(true);
    setAdding(true);
  };

  // function deleteproduct(data) {
  //   auxProducts.splice(
  //     auxProducts.findIndex((element) => element.name == data.name),
  //     1
  //   );
  // }

  return (
    <Container>
      <div className={classes.NewSale}>
        <h2 className={classes.title}>Nueva Venta</h2>
        <div className={classes.formcontainer}>
          {/* <CardForm> */}
          <form onSubmit={submitHandler} className={classes['sale-form']}>
            <div>
              <label className={classes.subtitle}>Elegir un cliente</label>
              <br />
              {showClientSearcher ? (
                <Search
                  TargetRequests={ClientRequests}
                  onAccept={selectClientHandler}
                  onCancel={cancelClientHandler}
                  fieldToShow={'name'}
                />
              ) : (
                !auxClient && (
                  <>
                    <em>No se seleccionó ningun cliente</em>
                    <br />
                    <button type='button' onClick={showClientSearcherHandler}>
                      Seleccionar Cliente
                    </button>
                  </>
                )
              )}
              {auxClient && (
                <>
                  <div className={classes['item-client']}>
                    <h4>{auxClient?.name}</h4>
                    <p>CI: {auxClient?.ci}</p>
                    <p>Dirección: {auxClient?.address}</p>
                  </div>
                  <button
                    type='button'
                    onClick={() => {
                      setAuxClient(null);
                    }}
                  >
                    Borrar
                  </button>
                </>
              )}
            </div>
            <div>
              <label className={classes.subtitle}>Productos</label>
              <GenericList data={auxProducts} />
              <br />
              {showProductSearcher ? (
                <>
                  {!tempProduct && (
                    <Search
                      TargetRequests={ProductRequests}
                      onAccept={selectProductHandler}
                      onCancel={cancelProductHandler}
                      fieldToShow={'name'}
                    />
                  )}

                  {tempProduct && (
                    <>
                      <h5>{tempProduct.name}</h5>
                      <p>{tempProduct.price}</p>
                    </>
                  )}
                  <br />
                  <label>Elegir la cantidad</label>
                  <input
                    type='number'
                    min='1'
                    max={tempProduct?.stock}
                    value={quantity}
                    disabled={!tempProduct}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </>
              ) : (
                products.length === 0 && (
                  <p>
                    <em>No se seleccionó ningun producto</em>
                  </p>
                )
              )}
              {!adding ? (
                <button type='button' onClick={showProductSearcherHandler}>
                  Agregar producto
                </button>
              ) : (
                <div className={classes.actions}>
                  <button
                    type='button'
                    onClick={addProductHandler}
                    disabled={quantity === 0 || !tempProduct}
                  >
                    Confirmar
                  </button>
                  <button type='button'>Cancelar</button>
                </div>
              )}
            </div>

            <label className={classes.subtitle}>
              El importe total es de: {newSale.totalPrice}
            </label>
            <button type='submit' className={classes.button}>
              Crear Venta
            </button>
          </form>
          {/* </CardForm> */}
        </div>
      </div>
    </Container>
  );
};

export default NewSale;
