import React from 'react';
import axios from 'axios';

import UsersList from '../../components/users/UsersList';

const Users = ({users}) => {

  return  <UsersList items={users} />;
 
};

Users.getInitialProps = async () => {
  const response = await axios.get('http://localhost:5000/api/users');
  return response.data;
};

export default Users;
