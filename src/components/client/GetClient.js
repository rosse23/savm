import { React, useState, useEffect } from 'react';
import { ClientRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import GetClientinfo from './GetClientinfo';
import PetsClient from './PetsClient';
import Container from '../UI/Container';
import classes from './GetClientinfo.module.css';
import SalesClient from './SalesClient';
import VisitsClient from './VisitsClient';
import EstheticsClient from './EstheticsClient';

const GetClient = () => {
  const [client, setClient] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(() => {
    const getclient = async () => {
      const result = await ClientRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      console.log(result);
      setClient(result.data.data);
      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getclient();
  }, []);
  return (
    <Container>
      <div className={classes.GetClient}>
        <GetClientinfo />
        <Routes>
          <Route path='/' element={<PetsClient client={client} />} />
          <Route path='sale' element={<SalesClient client={client} />} />
          <Route path='visit' element={<VisitsClient client={client} />} />
          <Route
            path='esthetic'
            element={<EstheticsClient client={client} />}
          />
        </Routes>
      </div>
    </Container>
  );
};

export default GetClient;
