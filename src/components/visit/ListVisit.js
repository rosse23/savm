import { React, useState, useEffect } from "react";
import { VisitRequests } from "../../lib/api/";
import { NavLink } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import FiltersContainer from "../UI/FiltersContainer";
import Container from "../UI/Container";
import List from "../UI/List";
import ListModel from "../UI/ListModel";
import classes from "../user/ListUser.module.css";
const ListVisit = () => {
  const [visit, setVisit] = useState([]);
  const [infoadd, setInfoadd] = useState({
    link1: "/app/visit/viewvisit?id=",
    link2: "/app/visit/editvisit?id=",
    obj: "pet",
  });

  useEffect(async () => {
    const result = await VisitRequests.getAll(
      localStorage.getItem("userToken")
    );
    console.log(result.data.data);
    if (result.status === "fail") {
      console.log(result.message);
      return;
    } else {
      setVisit(result.data.data);
    }
  }, []);

  return (
    <section>
      <FiltersContainer></FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Resultados</h2>
              <NavLink exact to="/app/visit/newvisit" className={classes.new}>
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
                {/* <ListModel info={visit} infoadd={infoadd} /> */}
              </table>
            </div>
          </List>
        </div>
      </Container>
    </section>
  );
};

export default ListVisit;
