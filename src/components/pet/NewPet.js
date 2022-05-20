import { React, useState, useEffect } from "react";
import classes from "./NewPet.module.css";
import { Form } from "../UI/Form";
import Button from "../UI/Button";
import { motion } from "framer-motion";
import { PetRequests } from "../../lib/api/";
import { ClientRequests } from "../../lib/api/";
import { useNavigate } from "react-router-dom";
import Container from "../UI/Container";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const NewPet = () => {
  const [opensearch, setOpensearch] = useState(false);
  const [ownername, setOwnername] = useState(null);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    kind: "Canino",
    sex: "Macho",
    owner: "",
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
    console.log(credentials);
    const result = await PetRequests.createOne(
      localStorage.getItem("userToken"),
      credentials
    );
    console.log(credentials);
    if (result.status === "fail") {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      console.log(result.message);
      return;
    }
    console.log(result.data.data._id);
    navigate(
      { pathname: `/app/pet/newpetadd?id=${result.data.data._id}` },
      { replace: true }
    );
  };
  useEffect(() => {
    const getAllClients = async () => {
      const result = await ClientRequests.getAll(null);
      console.log(result);
      console.log(opensearch);
      setClients(
        result.data.data.filter((client) =>
          client.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    };
    const fetchClients = setTimeout(() => {
      console.log("fetching");
      getAllClients();
    }, 1000);

    return () => {
      clearTimeout(fetchClients);
    };
  }, [search]);
  const onSearchHandler = async (e) => {
    setSearch(e.target.value);
  };
  return (
    <Container>
      <div className={classes.NewPet}>
        <h2>Nuevo Paciente</h2>
        <div className={classes.formusercontainer}>
          <Form>
            <p type="Nombre:">
              <input
                placeholder="Ingrese nombre del paciente.."
                id="name"
                name="name"
                value={credentials.name}
                onChange={changeInputHandler}
              ></input>
            </p>
            <p type="Especie:">
              <select id="kind" name="kind" onChange={changeInputHandler}>
                <option value={"Canino"}>Canino</option>
                <option value={"Felino"}>Felino</option>
                <option value={"Ave"}>Ave</option>
                <option value={"Bovino"}>Bovino</option>
                <option value={"Caprino"}>Caprino</option>
                <option value={"Porcino"}>Porcino</option>
                <option value={"Ovino"}>Ovino</option>
              </select>
            </p>
            <p type="Sexo">
              {/* input type="checkbox" name="sex" value="Macho" onChange={changeInputHandler}>
                Macho
              </input>

              <input type="checkbox" name="sex" value="Hembra" onChange={changeInputHandler}>
                Hembra
  </input>*/}

              <select id="sex" name="sex" onChange={changeInputHandler}>
                <option value={"macho"}>Macho</option>
                <option value={"Hembra"}>Hembra</option>
              </select>
            </p>
            <div>
              <p type="Dueño:">
                <input
                  onClick={() => setOpensearch(!opensearch)}
                  type="text"
                  placeholder="Ingrese el dueño del paciente"
                  id="owner"
                  name="owner"
                  value={ownername}
                ></input>
                {opensearch ? (
                  <motion.div
                    className={classes["search-section"]}
                    variants={backdrop}
                  >
                    <input
                      type="text"
                      placeholder="Por favor, ingrese una letra.."
                      id="owner"
                      name="owner"
                      onChange={onSearchHandler}
                    ></input>
                    <ul>
                      {clients.map((client) => (
                        <li
                          key={client._id}
                          onClick={() => {
                            setOwnername(client.name);
                            setCredentials((prevstate) => ({
                              ...prevstate,
                              owner: client._id,
                            }));
                            setOpensearch(!opensearch);
                          }}
                        >
                          <p>{client.name}</p>
                          <p>
                            CI: <em>{client.ci}</em>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <div></div>
                )}
              </p>
            </div>
          </Form>
          <div className={classes.crearbut}>
            <Button onClick={actionButton}>Crear</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewPet;
