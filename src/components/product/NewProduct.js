import { React, useState, useEffect } from 'react';
import classes from '../pet/NewPet.module.css';
import { Form } from '../UI/Form';
import Button from '../UI/Button';
import { ProductRequests } from '../../lib/api/';
import { useNavigate } from 'react-router-dom';
import Container from '../UI/Container';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
const NewProduct = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    category: 'Medicamentos y suplementos',
    price: '',
    stock: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const actionButton = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const result = await ProductRequests.createOne(
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
    navigate({ pathname: `/app/product/` }, { replace: true });
  };
  return (
    <Container>
      <div className={classes.NewPet}>
        <h2>Nuevo Producto</h2>
        <div className={classes.formusercontainer}>
          <Form>
            <p type='Nombre:'>
              <input
                placeholder='Ingrese nombre del producto..'
                id='name'
                name='name'
                value={credentials.name}
                onChange={changeInputHandler}
              ></input>
            </p>
            <p type='Categoria:'>
              <select
                id='category'
                name='category'
                onChange={changeInputHandler}
              >
                <option value={'Medicamentos y suplementos'}>
                  Medicamentos y suplementos
                </option>
                <option value={'Alimentación'}>Alimentación</option>
                <option value={'Accesorios'}>Accesorios</option>
                <option value={'Cuidados y limpieza'}>
                  Cuidados y limpieza
                </option>
              </select>
            </p>
            <p type='price'>
              <input
                type='number'
                min='1'
                step='0.5'
                placeholder='Ingrese precio del producto..'
                id='price'
                name='price'
                value={credentials.price}
                onChange={changeInputHandler}
              ></input>
            </p>
            <p type='Cantidad'>
              <input
                type='number'
                min='0'
                placeholder='Ingrese la cantidad de producto de este tipo..'
                id='stock'
                name='stock'
                value={credentials.stock}
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

export default NewProduct;
