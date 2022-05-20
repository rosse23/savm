import { React, useState, useEffect } from "react";
import classes from "./Header.module.css";
import Button from "../UI/Button";
import { MdOutlineLocalGroceryStore, MdArrowDropDown } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { IoPaw } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Usercontainer from "./Usercontainer";
import { AuthRequests } from "../../lib/api";
import { AnimatePresence, motion } from "framer-motion";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
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
    width: 340,
    transition: {
      duration: 0.5,
    },
  },
};
const Header = (props) => {
  const [isOpenCU, setIsOpenCU] = useState(false);
  const [user, setUser] = useState({});
  const handleModalContainerClick = (e) => e.stopPropagation();
  useEffect(async () => {
    const result = await AuthRequests.getMe(localStorage.getItem("userToken"));
    setUser(result.data.data);
    if (result.status === "fail") {
      return;
    }
  }, []);
  return (
    <div className={classes.header}>
      <div className={classes.header__inner}>
        <div className={classes.accesos}>
          <NavLink className={classes.Navaccesos} to="/main">
            <p>Accesos</p>
            <MdArrowDropDown />
          </NavLink>
        </div>
        <nav className={classes.actions}>
          <NavLink to="/main" className={classes.Navicon}>
            <MdOutlineLocalGroceryStore />
            <span className={classes.tooltiptext}>+ venta</span>
          </NavLink>
          <NavLink to="/app/user/newuser" className={classes.Navicon}>
            <RiUser3Line />
            <span className={classes.tooltiptext}>+ usuario</span>
          </NavLink>
          <NavLink to="/app/pet/newpet" className={classes.Navicon}>
            <IoPaw />
            <span className={classes.tooltiptext}>+ paciente</span>
          </NavLink>
        </nav>
        <div className={classes.avatar}>
          <button
            className={classes.Navavatar}
            onClick={() => setIsOpenCU(!isOpenCU)}
          >
            <p>Hola {user.name}</p>
            <img src={"http://localhost:8000/img/users/" + user.photo} alt="" />
          </button>
        </div>
        {isOpenCU && (
          <motion.div
            className={classes.backdrop}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpenCU(false)}
          >
            <AnimatePresence exitBeforeEnter>
              <motion.div
                className={classes.modal}
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                onClick={handleModalContainerClick}
              >
                <motion.div>
                  <div className={classes.but}>
                    <div
                      className={classes.butx}
                      onClick={() => setIsOpenCU(false)}
                    >
                      <Button>X</Button>
                    </div>
                  </div>
                  <Usercontainer isOpenCU={isOpenCU} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Header;
