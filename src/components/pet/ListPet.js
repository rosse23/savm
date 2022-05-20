import { React, useEffect, useState } from "react";
import { PetRequests } from "../../lib/api/";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import FiltersContainer from "../UI/FiltersContainer";
import Container from "../UI/Container";
import List from "../UI/List";
import ListModel from "../UI/ListModel";
import classes from "./ListPet.module.css";
const ListPet = () => {
  const [pet, setPet] = useState([]);
  const [infoadd, setInfoadd] = useState({
    link1: "/app/pet/viewpet?id=",
    link2: "/app/pet/editpet?id=",
    obj: "owner",
  });
  const navigate = useNavigate();

  useEffect(async () => {
    const result = await PetRequests.getAll(localStorage.getItem("userToken"));
    console.log(result.data.data);
    if (result.status === "fail") {
      console.log(result.message);
      return;
    } else {
      setPet(result.data.data);
      console.log(pet);
    }
  }, []);
  const actionHandler = () => {
    navigate({ pathname: "/app/pet/newpet" }, { replace: true });
  };

  return (
    <section>
      <FiltersContainer></FiltersContainer>
      <Container>
        <div className={classes.ListPet}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Pacientes</h2>
              <NavLink exact to="/app/pet/newpet" className={classes.new}>
                <MdOutlineAddCircle />
                <span className={classes.tooltiptext}>Nuevo</span>
              </NavLink>
            </div>

            <div className={classes.tabla}>
              <table className={classes.cuerpotabla}>
                <thead className={classes.title}>
                  <tr>
                    <th>
                      <div>Dueño</div>
                    </th>
                    <th>
                      <div>Nombre</div>
                    </th>
                    <th>
                      <div>Especie</div>
                    </th>
                    <th>
                      <div>Sexo</div>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <ListModel info={pet} infoadd={infoadd} />
              </table>
            </div>
          </List>
        </div>
      </Container>
    </section>
  );
};

export default ListPet;
