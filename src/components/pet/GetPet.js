import { React } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classes from "./GetPet.module.css";
import EstheticPet from "./EstheticPet";
import GetPetinfo from "./GetPetinfo";
import NavPet from "./NavPet";
import UpdatePet from "./UpdatePet";
import VaccinesPet from "./VaccinesPet";
import VisitsPet from "./VisitsPet";

const GetPet = () => {
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let id = query.get("id");
  console.log(id);
  console.log("lohiciste");
  return (
    <div className={classes.GetPet}>
      <NavPet idPet={id} />
      <Routes>
        <Route path="/" element={<GetPetinfo />} />
        <Route path="editpet" element={<UpdatePet />} />
        <Route path="visits" element={<VisitsPet />} />
        <Route path="esthetic" element={<EstheticPet />} />
        <Route path="vaccines" element={<VaccinesPet />} />
      </Routes>
    </div>
  );
};

export default GetPet;
