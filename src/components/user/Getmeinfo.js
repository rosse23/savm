import { React, useState, useEffect } from 'react';
import { AuthRequests } from '../../lib/api';
import { Getinfou } from '../UI/Getinfou';
export const Getmeinfo = () => {
  const [user, setUser] = useState({});
  useEffect(async () => {
    const result = await AuthRequests.getMe(localStorage.getItem('userToken'));
    setUser(result.data.data);
    if (result.status === 'fail') {
      return;
    }
  }, []);
  return <Getinfou user={user} />;
};
export default Getmeinfo;
