import { React, useState } from 'react';
import Button from '../components/UI/Button';
import { IoWarning, IoCloseCircle } from 'react-icons/io5';
import { motion } from 'framer-motion';
import CardForm from '../components/UI/CardForm';
import classes from '../components/user/UpdatePassword.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthRequests } from '../lib/api';
import { errorActions } from '../store/error';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import Modal from '../components/UI/Modal';
import Container from '../components/UI/Container';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const ResetPassword = () => {
  const [errors, setErrors] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({
    password: '',
    passwordConfirm: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let token = query.get('toke');
  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const actionButtonupdate = async (e) => {
    e.preventDefault();
    const result = await AuthRequests.resetPassword(token, credentials);
    console.log(result);
    if (result.status === 'fail') {
      setErrors(result.message);
      return;
    } else setShowModal(!showModal);
  };
  const actionButton = async (e) => {
    setShowModal(!showModal);
    navigate({ pathname: '/' }, { replace: true });
  };

  return (
    <div className={classes.ResetPassword}>
      <Container>
        <div className={classes.updateform}>
          <CardForm>
            <h2>Reestablecer la contraseña</h2>

            <div>
              <p>Ingrese su nueva contraseña</p>
              <input
                type='password'
                id='password'
                name='password'
                value={credentials.password}
                onChange={changeInputHandler}
                placeholder='*******'
                required
              />
            </div>
            <div>
              <p>Repita su nueva contraseña</p>
              <input
                type='password'
                id='passwordConfirm'
                name='passwordConfirm'
                value={credentials.passwordConfirm}
                onChange={changeInputHandler}
                placeholder='*******'
                required
              />
            </div>
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
            <div className={classes.Butacept}>
              <Button onClick={actionButtonupdate}>Aceptar</Button>
            </div>
            <Modal showModal={showModal}>
              <p className={classes.rest}>
                Acaba de Reestablecer su contraseña, Ya puede iniciar sesión
              </p>
              <div className={classes.buttoncontainer}>
                <Button onClick={actionButton}>Aceptar</Button>
              </div>
            </Modal>
          </CardForm>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
