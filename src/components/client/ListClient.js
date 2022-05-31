import { React, useEffect, useState } from "react";
import { ClientRequests } from "../../lib/api/";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import FiltersContainer from "../UI/FiltersContainer";
import Container from "../UI/Container";
import List from "../UI/List";
import ListModel from "../UI/ListModel";
import classes from "../user/ListUser.module.css";
const ListClient = () => {
  const [client, setClient] = useState([]);
  const [infoadd, setInfoadd] = useState({
    link1: "/app/client/viewclient?id=",
    link2: "/app/client/editclient?id=",
    obj: false,
  });
  const navigate = useNavigate();

  useEffect(async () => {
    const result = await ClientRequests.getAll(
      localStorage.getItem("userToken")
    );
    console.log(result.data.data);
    if (result.status === "fail") {
      console.log(result.message);
      return;
    } else {
      setClient(result.data.data);
      console.log(client);
    }
  }, []);

  return (
    <section>
      <FiltersContainer></FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Clientes</h2>
              <NavLink exact to="/app/client/newclient" className={classes.new}>
                <MdOutlineAddCircle />
                <span className={classes.tooltiptext}>Nuevo</span>
              </NavLink>
            </div>

            <div className={classes.tabla}>
              <table className={classes.cuerpotabla}>
                <thead className={classes.title}>
                  <tr>
                    <th>
                      <div>Nombre</div>
                    </th>
                    <th>
                      <div>Ci</div>
                    </th>
                    <th>
                      <div>Numero de Celular</div>
                    </th>
                    <th>
                      <div>Dirección</div>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <ListModel info={client} infoadd={infoadd} />
              </table>
            </div>
          </List>
        </div>
      </Container>
    </section>
  );
};

export default ListClient;
