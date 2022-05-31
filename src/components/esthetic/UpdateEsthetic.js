import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { EstheticRequests } from "../../lib/api/";
import { PetRequests } from "../../lib/api/";
import { errorActions } from "../../store/error";
import Container from "../UI/Container";
import classes from "./NewEsthetic.module.css";
import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import { motion } from "framer-motion";
import CardForm from "../UI/CardForm";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const UpdateEsthetic = () => {
  const [opensearch, setOpensearch] = useState(false);
  const [petname, setPetname] = useState(null);
  const [pets, setPets] = useState([]);
  const [searchs, setSearchs] = useState("");
  const [credentials, setCredentials] = useState({
    kind: "",
    price: 0,
    detail: "",
    pet: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let id = query.get("id");
  const changeInputHandler = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const getesthetic = async () => {
      const result = await EstheticRequests.getOne(
        id,
        localStorage.getItem("userToken")
      );
      setCredentials(result.data.data);
      setPetname(result.data.data.pet?.name);
      if (result.status === "fail") {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getesthetic();
  }, []);
  const actionButton = async (e) => {
    e.preventDefault();
    console.log(credentials);
    console.log("kalesita");
    /* const result = await EstheticRequests.updateOne(
      id,
      credentials,
      localStorage.getItem("userToken")
    );
    console.log(credentials);
    console.log(result);

    if (result.status === "fail") {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: `/app/esthetic/` }, { replace: true });*/
  };
  const actionCancel = async (e) => {
    e.preventDefault();
    navigate({ pathname: `/app/esthetic/` }, { replace: true });
  };

  useEffect(() => {
    const getAllPets = async () => {
      const result = await PetRequests.getAll(null);
      console.log(result);
      console.log(opensearch);
      setPets(
        result.data.data.filter((pet) =>
          pet.name.toLowerCase().includes(searchs.toLowerCase())
        )
      );
    };
    const fetchPets = setTimeout(() => {
      console.log("fetching");
      getAllPets();
    }, 1000);

    return () => {
      clearTimeout(fetchPets);
    };
  }, [searchs]);
  const onSearchHandler = async (e) => {
    setSearchs(e.target.value);
  };

  return (
    <Container>
      <div className={classes.NewEsthetic}>
        <h2>Nueva Visita de Estetica</h2>
        <div className={classes.formcontainer}>
          <CardForm>
            <div className={classes.petcontainer}>
              <div className={classes.pet}>
                <p>Paciente: </p>
                <div className={classes.inputpet}>
                  <input
                    onClick={() => setOpensearch(!opensearch)}
                    type="text"
                    placeholder="Ingrese el paciente"
                    id="pet"
                    name="pet"
                    value={petname}
                  ></input>
                  {opensearch && (
                    <motion.div
                      className={classes["search-section"]}
                      variants={backdrop}
                    >
                      <input
                        type="text"
                        placeholder="Por favor, ingrese una letra.."
                        id="pet"
                        name="pet"
                        onChange={onSearchHandler}
                      ></input>
                      <ul>
                        {pets.map((data) => (
                          <li
                            key={data._id}
                            onClick={() => {
                              setPetname(data.name);
                              setCredentials((prevstate) => ({
                                ...prevstate,
                                pet: data._id,
                              }));
                              setOpensearch(!opensearch);
                            }}
                          >
                            <p>{data.name} </p>
                            <p>Dueño: {data.owner.name}</p>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
              <div className={classes.preciototal}>
                <p> Precio Total: </p>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={credentials.price}
                  onChange={changeInputHandler}
                ></input>
              </div>
            </div>
          </CardForm>
          <CardForm>
            <div className={classes.Sale}>
              <div>
                <p> Tipo de visita</p>
                <select id="kind" name="kind" onChange={changeInputHandler}>
                  <option value={"Otros"}>Otros</option>
                  <option value={"Baño"}>Baño</option>
                  <option value={"Corte"}>Corte</option>
                  <option value={"Baño y Corte"}>Baño y Corte</option>
                  <option value={"Baño Sanitario"}>Baño Sanitario</option>
                  <option value={"Corte Sanitario"}>Corte Sanitario</option>
                  <option value={"Limpieza Dental"}>Limpieza Dental</option>
                  <option value={"Baño Sanitario y Corte"}>
                    Baño Sanitario y Corte
                  </option>
                </select>
              </div>

              <div>
                <p>Detalle:</p>
                <textarea
                  value={credentials.detail}
                  id="detail"
                  name="detail"
                  onChange={changeInputHandler}
                ></textarea>
              </div>
            </div>
          </CardForm>
          <div className={classes.buttons}>
            <Button onClick={actionCancel}>Cancelar</Button>
            <Button onClick={actionButton}>Guardar</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateEsthetic;
