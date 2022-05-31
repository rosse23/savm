import { React, useEffect, useState } from "react";
import Navbar from "../UI/Navbar";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
import { PetRequests } from "../../lib/api/";
import { BsJournalText } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFileArchive, FaBath, FaSyringe } from "react-icons/fa";
import classes from "./NavPet.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

const NavPet = (props) => {
  const idPet = props.idPet;
  const [pet, setPet] = useState({});
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let id = query.get("id");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routes = [
    {
      path: `/app/pet/viewpet?id=${id}`,
      name: "Datos del Paciente",
      icon: <BsJournalText />,
    },
    {
      path: `/app/pet/viewpet/visits?id=${id}`,
      name: "Historial Clinico",
      icon: <FaFileArchive />,
    },
    {
      path: `/app/pet/viewpet/esthetic?id=${id}`,
      name: "Estetica y baños",
      icon: <FaBath />,
    },
    {
      path: `/app/pet/viewpet/vaccines?id=${id}`,
      name: "Vacunas",
      icon: <FaSyringe />,
    },
  ];
  useEffect(() => {
    const auxgetpet = async () => {
      const result = await PetRequests.getOne(
        idPet,
        localStorage.getItem("userToken")
      );
      setPet(result.data.data);
      if (result.status === "fail") {
        return;
      }
    };
    auxgetpet();
  }, []);

  const actionDelete = async (e) => {
    e.preventDefault();
    setShowModal(!showModal);
    const result = await PetRequests.deleteOne(
      id,
      localStorage.getItem("userToken")
    );

    if (result.status === "fail") {
      console.log(result.message);
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: "/app/pet/" }, { replace: true });
  };
  const actionUpdate = async (e) => {
    e.preventDefault();
    navigate(
      { pathname: `/app/pet/viewpet/editpet?id=${pet._id}` },
      { replace: true }
    );
  };

  return (
    <div className={classes.NavPet}>
      <div className={classes.Navinfo}>
        <div className={classes.contentop}>
          <MdOutlinePets />
          <div>
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
              <p>Esta seguro de eliminar este producto?</p>
              <div className={classes.buttons}>
                <Button onClick={() => setShowModal(!showModal)}>
                  Cancelar
                </Button>
                <Button onClick={actionDelete}>Aceptar</Button>
              </div>
            </Modal>
          </div>
        </div>
        <div className={classes.text}>
          <h2>{pet.name}</h2>
          <p>{pet.owner?.name}</p>
          <p>{pet.owner?.phoneNumber}</p>
        </div>
      </div>
      <Navbar routes={routes} />
    </div>
  );
};

export default NavPet;
