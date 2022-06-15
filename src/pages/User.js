import React from 'react';
import Portada from '../components/UI/Portada';
import ListUser from '../components/user/ListUser';
import NewUser from '../components/user/NewUser';
import { BsPersonFill } from 'react-icons/bs';
import classes from './User.module.css';
import { Route, Routes } from 'react-router-dom';
import UpdateUser from '../components/user/UpdateUser';
import GetUser from '../components/user/GetUser';
import Addphoto from '../components/user/Addphoto';
import Activites from '../components/user/Activites';
const User = (props) => {
  return (
    <div className={classes.User}>
      <div className={classes.Port}>
        <Portada>
          <BsPersonFill />
          <h1>Usuarios</h1>
        </Portada>
      </div>
      <Routes>
        <Route path='/' element={<ListUser />} />
        <Route path='newuser' element={<NewUser />} />
        <Route path='newuserphoto' element={<Addphoto />} />
        <Route path='viewuser' element={<GetUser />} />
        <Route path='edituser' element={<UpdateUser />} />
        <Route path='activites' element={<Activites />} />
      </Routes>
      {/*   <FiltersContainer>
        <label>Nombre</label>
        <input></input>
        <label>CI</label>
        <input></input>
        <label>email</label>
        <input></input>
     </FiltersContainer>
      <ListUser />*/}
    </div>
  );
};

export default User;
