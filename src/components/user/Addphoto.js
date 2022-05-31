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
const formData = new FormData();
const Addphoto = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

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

  const updatePhoto = async (e) => {
    const result = await UserRequests.updateOne(
      id,
      formData,
      localStorage.getItem("userToken")
    );
    console.log(result);
    if (result.status === "fail") {
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );

      console.log(result.message);
      return;
    }
    navigate("/app/user/");
  };
  //mostrar imagen previa
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    formData.append("photo", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
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
                {selectedFile ? <img src={preview} /> : <HiUser />}
              </div>
              <button>
                <label for="archivo">Añadir foto de perfil</label>
              </button>
              <input
                type="file"
                id="archivo"
                name="archivo"
                onChange={onSelectFile}
              />
            </div>
          </Form>
          <div className={classes.crearbut}>
            <Button onClick={actionbutton1}>Omitir</Button>
            <Button onClick={updatePhoto}>Guardar</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Addphoto;
