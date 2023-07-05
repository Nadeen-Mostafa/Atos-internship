import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import axios from 'axios';
import ErrorModel from '../../Model/ErorrModel';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res =await axios.get("http://localhost:3000/api/users");
        
        const resData = await res.data;
        
        if (res.status !== 200) {
          throw new Error(resData.message);
        }
        setLoadedUsers(resData.users);
        
        
        // console.log(res);
      }
      catch (err) {
       
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendReq();
  }, []);

  const errorHandler = () => {
    setError(null);
  }
  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler} />
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
