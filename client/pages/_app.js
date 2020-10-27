import React, { useCallback, useState } from 'react';
import axios from 'axios';
import buildClient from '../api/build-client';
import '../styles/globals.css';
import '../shared/components/FormElements/Button.css';
import '../shared/components/FormElements/Input.css';
import '../shared/components/FormElements/ImageUpload.css';


import '../shared/components/UIElements/Card.css';
import '../shared/components/UIElements/Avatar.css';
import '../shared/components/Navigation/MainHeader.css';
import '../shared/components/Navigation/MainNavigation.css';
import '../shared/components/Navigation/NavLinks.css';
import '../shared/components/Navigation/SideDrawer.css';
import '../shared/components/UIElements/Modal.css';
import '../shared/components/UIElements/Backdrop.css';
import '../shared/components/UIElements/LoadingSpinner.css';
import '../components/users/UserItem.css';
import '../components/users/UsersList.css';
import '../components/programs/ProgramList.css';
import '../components/programs/ProgramItem.css';
import '../pages/programs/newProgram.css';
import '../pages/programs/ProgramForm.css'
import { AuthContext } from '../shared/context/auth-context';
import MainNavigation from '../shared/components/Navigation/MainNavigation';

const MyApp = ({ Component, pageProps, currentUser }) => {
  console.log('cur from App', currentUser)
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  
  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      'userData',
      // JSON.stringify({ userId: uid, token: token })
      JSON.stringify({ userId: uid })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    currentUser = null;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        currentUser: currentUser,
        login: login,
        logout: logout,
      }}
    >
      <main>
        <MainNavigation currentUser={currentUser}/>
        <Component currentUser={currentUser} {...pageProps} />
      </main>
    </AuthContext.Provider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  if (appContext) {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
     console.log("Go App", data)
      let pageProps;
      if (appContext.Component.getInitialProps) {
         pageProps = await appContext.Component.getInitialProps(appContext.ctx,client, data.currentUser);
      }
      return {
        pageProps,
        ...data,
      };
  }
 
 
 
};
export default MyApp;
