import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Menu from './pages/Menu';
import Main from './pages/Main';
import Layout from './pages/Layout';
import SideBar from './components/sidebar/SideBar';
const formatDate = (rawDate) => {
  const date = new Date(rawDate);
  const result = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return result;
};
function App() {
  const token = useSelector((state) => state.auth.token);
  if (token) {
    return (
      <div className='app'>
        <Routes>
          <Route path='/sidebar' element={<SideBar />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/app/*' element={<Layout />} />
        </Routes>
      </div>
    );
  }
  return (
    <Routes>
      <Route path='/' element={<Main />} />
    </Routes>
  );
}
export default App;
