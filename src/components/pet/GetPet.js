import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const GetPet = () => {
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  let id = query.get("id");
  console.log(id);
  console.log("lohiciste");
  return <div>GetPet</div>;
};

export default GetPet;
