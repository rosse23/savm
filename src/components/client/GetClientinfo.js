import { React, useEffect, useState } from 'react';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import { ClientRequests } from '../../lib/api/';
import { BsJournalText, BsDoorOpenFill } from 'react-icons/bs';
import { RiDeleteBin5Fill, RiEdit2Fill } from 'react-icons/ri';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { FaBath, FaDog } from 'react-icons/fa';
import { AiFillShopping } from 'react-icons/ai';
import classes from './GetClientinfo.module.css';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { Form } from '../UI/Form';

const GetClientinfo = () => {
  const [client, setClient] = useState({});
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routes = [
    {
      path: `/app/client/viewclient?id=${id}`,
      name: 'Pacientes',
      icon: <FaDog />,
    },
    {
      path: `/app/client/viewclient/sale?id=${id}`,
      name: 'Compras',
      icon: <AiFillShopping />,
    },
    {
      path: `/app/client/viewclient/visit?id=${id}`,
      name: 'Visitas',
      icon: <BsDoorOpenFill />,
    },
    {
      path: `/app/client/viewclient/esthetic?id=${id}`,
      name: 'Estetica',
      icon: <FaBath />,
    },
  ];
  useEffect(() => {
    const auxgetclient = async () => {
      const result = await ClientRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      setClient(result.data.data);
      if (result.status === 'fail') {
        return;
      }
    };
    auxgetclient();
  }, []);

  const actionDelete = async (e) => {
    e.preventDefault();
    setShowModal(!showModal);
    const result = await ClientRequests.deleteOne(
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
    navigate({ pathname: '/app/client/' }, { replace: true });
  };
  const actionUpdate = async (e) => {
    e.preventDefault();
    navigate(
      { pathname: `/app/client/editclient?id=${client._id}` },
      { replace: true }
    );
  };
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  return (
    <div className={classes.GetClientinfo}>
      <h2 className={classes.title}>Datos de Cliente</h2>

      <Form>
        <div>
          <div className={classes.port}>
            <div className={classes.info}>
              <BsJournalText />
              <h3>{client.name}</h3>
            </div>
            <div className={classes.Navop}>
              <button
                className={classes.ico1}
                onClick={() => setShowModal(!showModal)}
              >
                <RiDeleteBin5Fill />
                <span className={classes.tooltiptext}>Eliminar</span>
              </button>
              <button className={classes.ico1} onClick={actionUpdate}>
                <RiEdit2Fill />
                <span className={classes.tooltiptext}>Editar</span>
              </button>
            </div>
            <Modal showModal={showModal}>
              <p>Esta seguro de eliminar este cliente?</p>
              <div className={classes.buttons}>
                <Button onClick={() => setShowModal(!showModal)}>
                  Cancelar
                </Button>
                <Button onClick={actionDelete}>Aceptar</Button>
              </div>
            </Modal>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Ci: </p>
              </div>
              <div className={classes.formresp}>
                <p>{client.ci}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Nro de Celular </p>
              </div>
              <div className={classes.formresp}>
                <p>{client.phoneNumber}</p>
              </div>
            </div>
          </div>
          <div className={classes.cols2}>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Dirección: </p>
              </div>
              <div className={classes.formresp}>
                <p>{client.address}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Fecha de registro </p>
              </div>
              <div className={classes.formresp}>
                <p>{formatDate(client.dateReg)}</p>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <div className={classes.navbar}>
        {routes.map((data) => (
          <NavLink className={classes.Navaccesos} to={data.path}>
            <p>{data.icon}</p>
            <p className={classes.opnavbar}>{data.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default GetClientinfo;
