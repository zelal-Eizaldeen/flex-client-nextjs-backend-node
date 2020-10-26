import React from 'react';
import axios from 'axios';

import UsersList from '../../components/users/UsersList';

const Users = ({users}) => {

  return  <UsersList items={users} />;
 
};

Users.getInitialProps = async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/users');
  return response.data;
};

export default Users;
