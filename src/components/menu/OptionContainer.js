import React, { Fragment, useState, useEffect } from 'react';
import classes from './OptionContainer.module.css';
import { HiUsers, HiUserGroup } from 'react-icons/hi';
import { MdPets, MdLocalGroceryStore, MdAllInbox } from 'react-icons/md';
import { FaHandHoldingMedical } from 'react-icons/fa';
import { FcStatistics } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';

const routes = [
  {
    path1: '/app/user/newuser',
    path2: '/app/user/',
    path3: '/app/user/activites',
    name: 'Usuarios',
    icon: <HiUsers />,
    op1: 'Crear nuevo',
    op2: 'Lista / Búsqueda',
    op3: 'Actividad de usuarios',
  },
  {
    path1: '/app/client/newclient',
    path2: '/app/client',
    path3: '/app/client',
    name: 'Clientes',
    icon: <HiUserGroup />,
    op1: 'Crear nuevo',
    op2: 'Lista / Búsqueda',
  },
  {
    path1: '/app/pet/newpet',
    path2: '/app/pet',
    path3: '/app/pet',
    name: 'Mascotas',
    icon: <MdPets />,
    op1: 'Crear nuevo',
    op2: 'Lista / Búsqueda',
  },
  {
    path1: '/app/sale/newsale',
    path2: '/app/sale/',
    path3: '/app/product',
    path4: 'product/newstock',
    name: 'Ventas',
    icon: <MdLocalGroceryStore />,
    op1: 'Crear nuevo',
    op2: 'Lista / Búsqueda',
    op3: 'Inventario',
    op4: 'Nuevo stock',
  },
  {
    path1: '/app/esthetic/',
    path2: '/app/visit/',
    path3: '/app/visit/newvisit',
    name: 'Servicios',
    icon: <FaHandHoldingMedical />,
    op1: 'Visitas a Esthetica',
    op2: 'Visitas',
    op3: 'Nueva visita',
  },
  {
    path1: '/app/',
    path2: '/app/visit/',
    path3: '/app/esthetic/new esthetica',
    name: 'Estadisticas',
    icon: <FcStatistics />,
    op1: 'Estadisticas',
    // op2: 'Visitas',
    // op3: 'Nueva visita',
  },
];
const routes1 = [
  {
    path1: '/app/product/newproduct',
    path2: '/app/product/',
    path3: '/app/product/newstock',
    name: 'Productos',
    icon: <MdAllInbox />,
    op1: 'Registrar producto',
    op2: 'Inventario',
    op3: 'Añadir stock',
  },
  {
    path1: '/app/client/newclient',
    path2: '/app/client',
    path3: '/app/client',
    name: 'Clientes',
    icon: <HiUserGroup />,
    op1: 'Crear nuevo',
    op2: 'Lista / Búsqueda',
  },
  {
    path1: '/app/pet/newpet',
    path2: '/app/pet',
    path3: '/app/pet',
    name: 'Mascotas',
    icon: <MdPets />,
    op1: 'Crear nuevo',
    op2: 'Lista / Búsqueda',
  },
  {
    path1: '/app/sale/newsale',
    path2: '/app/sale/',
    path3: '/app/product/foulproduct',
    name: 'Ventas',
    icon: <MdLocalGroceryStore />,
    op1: 'Crear nuevo',
    op2: 'Lista / Búsqueda',
    op3: 'Productos Escasos',
  },
  {
    path1: '/app/esthetic/',
    path2: '/app/visit/',
    path3: '/app/visit/newvisit',
    name: 'Servicios',
    icon: <FaHandHoldingMedical />,
    op1: 'Visitas a Esthetica',
    op2: 'Visitas',
    op3: 'Nueva visita',
  },
  {
    path1: '/app/',
    path2: '/app/visit/',
    path3: '/app/esthetic/new esthetica',
    name: 'Estadisticas',
    icon: <FcStatistics />,
    op1: 'Estadisticas',
    // op2: 'Visitas',
    // op3: 'Nueva visita',
  },
];

const OptionContainer = () => {
  const [data, setData] = useState([]);
  const [isHoverItems, setIsHover] = useState({
    Usuarios: false,
    Clientes: false,
    Mascotas: false,
    Ventas: false,
    Servicios: false,
    Estadisticas: false,
  });

  const mouseEnterHandler = (data) => {
    setIsHover((prev) => ({ ...prev, [data]: true }));
    console.log(data);
  };

  const mouseLeaveHandler = (data) => {
    setIsHover((prev) => ({ ...prev, [data]: false }));
    console.log('leave mouse');
  };

  useEffect(() => {
    if (localStorage.getItem('userRole') == 'admin') {
      setData(routes);
    } else {
      setData(routes1);
    }
  }, []);

  return (
    <div className={classes.container}>
      {data.map((route, index) => {
        return (
          <div>
            <section
              className={classes.option}
              onMouseEnter={() => {
                mouseEnterHandler(route.name);
              }}
              onMouseLeave={() => {
                mouseLeaveHandler(route.name);
              }}
            >
              {isHoverItems[route.name] ? (
                <div className={classes.opcontainer}>
                  <NavLink
                    to={route.path1}
                    key={index}
                    className={classes.optionlink}
                  >
                    {route.op1}
                  </NavLink>
                  {route.op2 && (
                    <NavLink
                      to={route.path2}
                      key={index}
                      className={classes.optionlink}
                    >
                      {route.op2}
                    </NavLink>
                  )}
                  {route.op3 && (
                    <NavLink
                      to={route.path3}
                      key={index}
                      className={classes.optionlink}
                    >
                      {route.op3}
                    </NavLink>
                  )}
                  {route.op4 && (
                    <NavLink
                      to={route.path4}
                      key={index}
                      className={classes.optionlink}
                    >
                      {route.op4}
                    </NavLink>
                  )}
                </div>
              ) : (
                <Fragment>
                  {route.icon}
                  <p>{route.name}</p>
                </Fragment>
              )}
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default OptionContainer;
