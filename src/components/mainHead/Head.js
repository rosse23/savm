import { React, useState } from "react";
import classes from "./Head.module.css";
import CardForm from "../UI/CardForm";
import Button from "../UI/Button";
import logo from "../../imgs/logo.png";
import { IoPawSharp } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Form } from "../UI/Form";
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
  const [showModal, setShowModal] = useState(false);
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
                    <input placeholder="Ingrese su email.."></input>
                  </p>
                  <p type="Password:">
                    <input placeholder="Ingrese su contraseña.."></input>
                  </p>
                  <Button>Login</Button>
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
