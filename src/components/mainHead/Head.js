import { React, useState } from 'react';
import classes from './Head.module.css';
import Button from '../UI/Button';
import logo from '../../imgs/logo.png';
import { IoPawSharp, IoWarning, IoCloseCircle } from 'react-icons/io5';
import { BiLogIn } from 'react-icons/bi';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthRequests } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { authActions } from '../../store/auth';
import CardForm from '../UI/CardForm';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: {
    y: '105px',
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
const contentmodal = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.5 },
  },
};

const Head = (props) => {
  const [errors, setErrors] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const actionButton = async (e) => {
    e.preventDefault();
    const result = await AuthRequests.logIn(credentials);
    console.log(result);
    if (result.status === 'fail') {
      setErrors(result.message);
      console.log(errors);
      return;
    }

    dispatch(
      authActions.setLogin({
        token: result.token,
        name: result.data.user.name,
        role: result.data.user.role,
      })
    );
    // setTimeout(() => {
    // }, 2000);
    navigate({ pathname: '/menu' }, { replace: true });
  };
  const handleModalContainerClick = (e) => e.stopPropagation();
  console.log(showModal);
  return (
    <header className={classes.header}>
      <div className={classes.icon}>
        <IoPawSharp />
        <h1 className={classes.title}>La Madriguera</h1>
      </div>
      <div onClick={() => setShowModal(true)}>
        <Button>
          <BiLogIn />
          Iniciar sesi??n
        </Button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className={classes.backdrop}
            variants={backdrop}
            initial='hidden'
            animate='visible'
            exit='hidden'
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={classes.modal}
              variants={modal}
              onClick={handleModalContainerClick}
            >
              <motion.div
                variants={contentmodal}
                initial='hidden'
                animate='visible'
                className={classes.content}
              >
                <div className={classes.but}>
                  <div
                    className={classes.butx}
                    onClick={() => setShowModal(false)}
                  >
                    <Button>X</Button>
                  </div>
                </div>
                <img src={logo} alt='logo1' />
                <h2 className={classes.subtitle}>Iniciar sesi??n</h2>
                <CardForm>
                  <p>Email</p>
                  <input
                    id='email'
                    name='email'
                    value={credentials.email}
                    onChange={changeInputHandler}
                    placeholder='jhon@doe.com'
                    required
                  ></input>
                  <p> Password:</p>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={credentials.password}
                    onChange={changeInputHandler}
                    placeholder='***********'
                    required
                  ></input>

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
                  <div className={classes.buttonlogin}>
                    <Button onClick={actionButton}>Login</Button>
                  </div>
                  <div className={classes.resetpassword}>
                    <NavLink className={classes.Navreset} to='/forgotpassword'>
                      <p>??Olvidaste tu contrase??a?</p>
                    </NavLink>
                  </div>
                </CardForm>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Head;
