import { React, useState, useEffect } from "react";
import classes from "./NewSale.module.css";
import { Form } from "../UI/Form";
import Button from "../UI/Button";
import { motion } from "framer-motion";
import { SaleRequests } from "../../lib/api/";
import { ProductRequests } from "../../lib/api/";
import { ClientRequests } from "../../lib/api/";
import { useNavigate } from "react-router-dom";
import Container from "../UI/Container";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
import CardForm from "../UI/CardForm";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const NewSale = () => {
  const [opensearchC, setOpensearchC] = useState(false);
  const [opensearchP, setOpensearchP] = useState(false);
  const [clientname, setClientname] = useState(null);
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchC, setSearchC] = useState("");
  const [searchP, setSearchP] = useState("");
  const [credentials, setCredentials] = useState({
    quantity: 1,
    totalPrice: 0,
    product: "",
    client: "",
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
    const result = await SaleRequests.createOne(
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
    navigate({ pathname: `/app/sale/` }, { replace: true });
  };

  useEffect(() => {
    const getAllClients = async () => {
      const result = await ClientRequests.getAll(null);
      setClients(
        result.data.data.filter((client) =>
          client.name.toLowerCase().includes(searchC.toLowerCase())
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
  }, [searchC]);

  useEffect(() => {
    const getAllProducts = async () => {
      const result = await ProductRequests.getAll(null);
      setProducts(
        result.data.data.filter((product) =>
          product.name.toLowerCase().includes(searchP.toLowerCase())
        )
      );
    };
    const fetchProducts = setTimeout(() => {
      console.log("fetching");
      getAllProducts();
    }, 1000);

    return () => {
      clearTimeout(fetchProducts);
    };
  }, [searchP]);

  useEffect(() => {
    const getProduct = async () => {
      const result = await ProductRequests.getOne(
        credentials.product,
        localStorage.getItem("userToken")
      );
      setProduct(result.data.data);
      if (result.status === "fail") {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        console.log(result.message);
        return;
      }
    };
    getProduct();
  }, [credentials.product]);

  useEffect(() => {
    const precioT = async () => {
      setCredentials((prevstate) => ({
        ...prevstate,
        totalPrice: credentials.quantity * product.price,
      }));
    };
    precioT();
  }, [credentials]);
  const onSearchHandlerC = async (e) => {
    setSearchC(e.target.value);
  };
  const onSearchHandlerP = async (e) => {
    setSearchP(e.target.value);
  };

  return (
    <Container>
      <div className={classes.NewSale}>
        <h2>Nueva Venta</h2>
        <div className={classes.formcontainer}>
          <CardForm>
            <div className={classes.clientcontainer}>
              <div className={classes.client}>
                <p>Cliente (Opcional): </p>
                <div className={classes.inputclient}>
                  <input
                    onClick={() => setOpensearchC(!opensearchC)}
                    type="text"
                    placeholder="Ingrese el cliente"
                    id="client"
                    name="client"
                    value={clientname}
                  ></input>
                  {opensearchC && (
                    <motion.div
                      className={classes["search-section"]}
                      variants={backdrop}
                    >
                      <input
                        type="text"
                        placeholder="Por favor, ingrese una letra.."
                        id="client"
                        name="client"
                        onChange={onSearchHandlerC}
                      ></input>
                      <ul>
                        {clients.map((client) => (
                          <li
                            key={client._id}
                            onClick={() => {
                              setClientname(client.name);
                              setCredentials((prevstate) => ({
                                ...prevstate,
                                client: client._id,
                              }));
                              setOpensearchC(!opensearchC);
                            }}
                          >
                            <p>{client.name} </p>
                            <p>CI: {client.ci}</p>
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
                  id="totalPrice"
                  name="totalPrice"
                  value={credentials.totalPrice}
                ></input>
              </div>
            </div>
          </CardForm>
          <CardForm>
            <div className={classes.Sale}>
              <div>
                <p>Producto:</p>
                <div className={classes.inputclient}>
                  <input
                    onClick={() => {
                      setOpensearchP(!opensearchP);
                    }}
                    type="text"
                    placeholder="Ingrese el nombre del producto"
                    id="product"
                    name="product"
                    value={product.name}
                  ></input>
                  {opensearchP && (
                    <motion.div
                      className={classes["search-section"]}
                      variants={backdrop}
                    >
                      <input
                        type="text"
                        placeholder="Por favor, ingrese una letra.."
                        id="product"
                        name="product"
                        onChange={onSearchHandlerP}
                      ></input>
                      <ul>
                        {products.map((product) => (
                          <li
                            key={product._id}
                            onClick={() => {
                              /*setClientname(client.name);*/
                              setCredentials((prevstate) => ({
                                ...prevstate,
                                product: product._id,
                              }));
                              setOpensearchP(!opensearchP);
                            }}
                          >
                            <p>{product.name} </p>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
              <div>
                <p>Cantidad:</p>
                <input
                  type="number"
                  value={credentials.quantity}
                  id="quantity"
                  name="quantity"
                  onChange={changeInputHandler}
                ></input>
              </div>
              <div>
                <p>Precio Unidad:</p>
                <input
                  type="number"
                  min="0"
                  id="precio"
                  name="precio"
                  value={product.price}
                ></input>
              </div>
            </div>
          </CardForm>
          <div className={classes.crearbut}>
            <Button onClick={actionButton}>Crear</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewSale;
