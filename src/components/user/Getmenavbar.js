import { useState, useEffect, React } from 'react';
import classes from './Getmenavbar.module.css';
import { motion } from 'framer-motion';
import { FaEye, FaUserEdit } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { AuthRequests } from '../../lib/api';
import Modal from '../UI/Modal';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import Navbar from '../UI/Navbar';
const routes = [
  {
    path: '/app/user/getme/',
    name: 'Vista general del perfil',
    icon: <FaEye />,
  },
  {
    path: '/app/user/getme/editme',
    name: 'Editar perfil',
    icon: <FaUserEdit />,
  },
  {
    path: '/app/user/getme/password',
    name: 'Cambiar contraseña',
    icon: <RiLockPasswordFill />,
  },
];

const Getmenavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [credentials, setCredentials] = useState({
    photo: '',
  });

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  };

  const changeInputHandler = async (e) => {
    const formData = new FormData();
    formData.append('photo', e.target.files[0]);
    console.log(formData.entries());
    const result = await AuthRequests.updateMe(
      localStorage.getItem('userToken'),
      formData
    );
    console.log(credentials);
    // setCredentials({});
    console.log('meyko');
    console.log(result);
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );

      console.log(result.message);
      return;
    }
    navigate(0);
  };

  const actionButton = async (e) => {
    e.preventDefault();
    setShowModal(!showModal);
    const result = await AuthRequests.deleteMe(
      localStorage.getItem('userToken')
    );
    if (result.status === 'fail') {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }

    dispatch(authActions.setLogout());
    navigate({ pathname: '/' }, { replace: true });
  };

  useEffect(() => {
    const auxgetme = async () => {
      const result = await AuthRequests.getMe(
        localStorage.getItem('userToken')
      );
      setUser(result.data.data);
      if (result.status === 'fail') {
        return;
      }
    };
    auxgetme();
  }, [credentials.photo]);

  return (
    <div className={classes.Getmenavbar}>
      <section className={classes.section}>
        <motion.img
          variants={showAnimation}
          initial='hidden'
          animate='show'
          exit='hidden'
          src={'http://localhost:8000/img/users/' + user.photo}
          alt='logo'
        />
        <section className={classes.section2}>
          <label for='photo'>
            <MdAddPhotoAlternate />
          </label>
          <input
            id='photo'
            type='file'
            name='photo'
            onChange={changeInputHandler}
          />
        </section>

        <div className={classes.bars}>
          <p>{localStorage.getItem('userName')}</p>
        </div>
      </section>
      <Navbar routes={routes} />
      {/* <div className={classes.buteliminar}>
        <div>
          <Button onClick={() => setShowModal(!showModal)}>
            Eliminar Usuario
          </Button>
        </div>
        <Modal showModal={showModal}>
          <p>Esta seguro de eliminar su usuario?</p>
          <div className={classes.buttoncontainer}>
            <Button onClick={() => setShowModal(!showModal)}>Cancelar</Button>
            <Button onClick={actionButton}>Aceptar</Button>
          </div>
        </Modal>
      </div> */}
    </div>
  );
};

export default Getmenavbar;
