import { React, useEffect, useState } from "react";
import classes from "./Head.module.css";
import Button from "../UI/Button";
import logo from "../../imgs/logo.png";
import { IoPawSharp, IoWarning } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { Form } from "../UI/Form";

import { AuthRequests } from "../../lib/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "200px",
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
    email: "",
    password: "",
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

    if (result.status === "fail") {
      setErrors(result.message);
      console.log(errors);
      return;
    }

    dispatch(
      authActions.setLogin({
        token: result.token,
        name: result.data.user.name,
      })
    );
    // setTimeout(() => {
    // }, 2000);
    navigate({ pathname: "/menu" }, { replace: true });
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
          Iniciar sesión
        </Button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className={classes.backdrop}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={classes.modal}
              variants={modal}
              onClick={handleModalContainerClick}
            >
              <motion.div
                variants={contentmodal}
                initial="hidden"
                animate="visible"
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
                <img src={logo} alt="logo1" />
                <h2 className={classes.subtitle}>Iniciar sesión</h2>
                <Form>
                  <p type="Email:">
                    <input
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={changeInputHandler}
                      placeholder="jhon@doe.com"
                      required
                    ></input>
                  </p>
                  <p type="Password:">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={changeInputHandler}
                      placeholder="***********"
                      required
                    ></input>
                  </p>
                  {errors ? (
                    <motion.div className={classes.alert} variants={backdrop}>
                      <IoWarning />
                      <div>
                        <b>{errors}</b>
                      </div>
                    </motion.div>
                  ) : (
                    <div></div>
                  )}
                  <Button onClick={actionButton}>Login</Button>
                </Form>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Head;
