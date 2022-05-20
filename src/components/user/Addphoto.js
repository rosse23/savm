import { React, useState, useEffect } from "react";
import classes from "./Addphoto.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserRequests } from "../../lib/api/";
import { errorActions } from "../../store/error";
import { useDispatch } from "react-redux";
import { HiUser } from "react-icons/hi";
import Button from "../UI/Button";
import Container from "../UI/Container";
import { Form } from "../UI/Form";
const Addphoto = () => {
  const [user, setUser] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let query = new URLSearchParams(search);
  let id = query.get("id");
  console.log(id);
  useEffect(async () => {
    const result = await UserRequests.getOne(
      id,
      localStorage.getItem("userToken")
    );
    setUser(result.data.data);
    console.log(user);
    if (result.status === "fail") {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
  }, []);

  const actionbutton1 = async (e) => {
    e.preventDefault();
    navigate({ pathname: `/app/user/` }, { replace: true });
  };
  return (
    <Container>
      <div className={classes.NewUser}>
        <h2>Añadir Foto de Perfil</h2>
        <div className={classes.usercontainer}>
          <Form>
            <div className={classes.infoUser}>
              <p type="Nombre:"> </p>
              <input id="name" name="name" value={user.name}></input>
            </div>
            <div className={classes.infoUser}>
              <p type="Ci:"> </p>
              <input id="ci" name="ci" value={user.ci}></input>
            </div>

            <div className={classes.photocontainer}>
              <div className={classes.photou}>
                <HiUser />
              </div>
              <button>
                <input type="file" id="archivo" />
                <label for="archivo" className={classes.inputfile}></label>
              </button>
            </div>
          </Form>
          <div className={classes.crearbut}>
            <Button onClick={actionbutton1}>Omitir</Button>
            <Button onClick={actionbutton1}>Guardar</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Addphoto;
