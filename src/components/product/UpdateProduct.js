import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProductRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import Container from '../UI/Container';
import classes from '../esthetic/GetEsthetic.module.css';
import { useDispatch } from 'react-redux';
import Button from '../UI/Button';
import { Form } from '../UI/Form';

const UpdateProduct = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });
  const [filteredop, setFilteredop] = useState([]);
  const opciones = [
    'Medicamentos y suplementos',
    'Alimentación',
    'Accesorios',
    'Cuidados y limpieza',
  ];

  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(() => {
    const getproduct = async () => {
      const result = await ProductRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );

      setCredentials(result.data.data);
      console.log(result.data.data);

      var auxpos = opciones.indexOf(result.data.data.category);
      opciones.splice(auxpos, 1);
      opciones.splice(0, 0, result.data.data.category);
      setFilteredop(opciones);

      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getproduct();
  }, []);
  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e);
  };
  const actionButton = async (e) => {
    e.preventDefault();
    const result = await ProductRequests.updateOne(
      id,
      credentials,
      localStorage.getItem('userToken')
    );
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate(
      { pathname: `/app/product/viewproduct?id=${id}` },
      { replace: true }
    );
  };
  const actionCancel = async (e) => {
    e.preventDefault();
    navigate(
      { pathname: `/app/product/viewproduct?id=${id}` },
      { replace: true }
    );
  };

  return (
    <Container>
      <div className={classes.GetEsthetic}>
        <h2>Editar Informacion de Producto</h2>
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
                {filteredop?.map((data) => {
                  return <option value={data}>{data}</option>;
                })}
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
                readOnly
              ></input>
            </p>
          </Form>
          <div className={classes.buttons}>
            <Button onClick={actionCancel}>Cancelar</Button>
            <Button onClick={actionButton}>Guardar</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateProduct;
