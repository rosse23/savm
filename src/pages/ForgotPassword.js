import { React, useState, useEffect } from 'react';
import { IoWarning, IoCloseCircle } from 'react-icons/io5';
import classes from './ForgotPassword.module.css';
import Button from '../components/UI/Button';
import { FaQuestionCircle } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import CardForm from '../components/UI/CardForm';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthRequests } from '../lib/api';
import { errorActions } from '../store/error';
import { useDispatch } from 'react-redux';
import Modal from '../components/UI/Modal';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const ForgotPassword = () => {
  const [errors, setErrors] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
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
    const result = await AuthRequests.forgotPassword(credentials);
    console.log(result);
    if (result.status === 'fail') {
      setErrors(result.message);
      console.log(result.message);

      return;
    } else setShowModal(!showModal);
    // navigate({ pathname: '/app/visit/' }, { replace: true });
  };
  const actionCancel = async (e) => {
    e.preventDefault();
    navigate({ pathname: '/' }, { replace: true });
  };
  const actionButtonok = async (e) => {
    setShowModal(!showModal);
    navigate({ pathname: '/' }, { replace: true });
  };
  return (
    <div className={classes.ForgotPassword}>
      <div className={classes.contenido}>
        <div className={classes.mensaje}>
          <div className={classes.title}>
            <FaQuestionCircle />

            <h3>
              <em>¿Has olvidado tu contraseña?</em>
            </h3>
          </div>
          <p>
            Para recibir tu codigo de acceso por correo electrónico introduce la
            direccion de correo electrónico que proporcionó durante el proceso
            de registro y siga las intrucciones para continuar con la
            recuperacion de la contraseña
          </p>
        </div>
        <CardForm>
          <div className={classes.correo}>
            <MdOutlineMail />
            <p>Correo electrónico</p>
          </div>
          <input
            id='email'
            name='email'
            value={credentials.email}
            onChange={changeInputHandler}
            placeholder='jhon@doe.com'
            required
          ></input>
        </CardForm>
        {errors ? (
          <motion.div
            className={classes.alert}
            variants={backdrop}
            onClick={() => setErrors(null)}
          >
            <IoWarning />
            <div>
              <b>{errors}</b>
            </div>
            <IoCloseCircle />
          </motion.div>
        ) : (
          <div></div>
        )}
        <div className={classes.buttons}>
          <Button onClick={actionCancel}>Volver</Button>
          <Button onClick={actionButton}>Enviar</Button>
        </div>

        <Modal showModal={showModal}>
          <BsFillCheckCircleFill />
          <p className={classes.mensajes}>
            Se envio un correo a su email proporcionado, Ingresa y siga las
            instrucciones.
          </p>
          <div className={classes.buttoncontainer}>
            <Button onClick={actionButtonok}>Aceptar</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ForgotPassword;
