import { React, useState, useEffect } from "react";
import { ProductRequests } from "../../lib/api/";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import FiltersContainer from "../UI/FiltersContainer";
import Container from "../UI/Container";
import List from "../UI/List";
import ListModel from "../UI/ListModel";
import classes from "../user/ListUser.module.css";
const ListProduct = () => {
  const [product, setProduct] = useState([]);
  const [infoadd, setInfoadd] = useState({
    link1: "/app/product/viewproduct?id=",
    link2: "/app/product/editproduct?id=",
    obj: false,
  });
  const navigate = useNavigate();

  useEffect(async () => {
    const result = await ProductRequests.getAll(
      localStorage.getItem("userToken")
    );
    console.log(result.data.data);
    if (result.status === "fail") {
      console.log(result.message);
      return;
    } else {
      setProduct(result.data.data);
    }
  }, []);

  return (
    <section>
      <FiltersContainer></FiltersContainer>
      <Container>
        <div className={classes.ListUser}>
          <List>
            <div className={classes.cabecera}>
              <h2>Lista de Productos</h2>
              <NavLink
                exact
                to="/app/product/newproduct"
                className={classes.new}
              >
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
                      <div>Categoria</div>
                    </th>
                    <th>
                      <div>Precio</div>
                    </th>
                    <th>
                      <div>Cantidad</div>
                    </th>

                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <ListModel info={product} infoadd={infoadd} />
              </table>
            </div>
          </List>
        </div>
      </Container>
    </section>
  );
};

export default ListProduct;
