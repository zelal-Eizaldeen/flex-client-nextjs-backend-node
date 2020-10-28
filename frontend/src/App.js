import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

// import Users from './user/pages/Users';
import Home from './home/pages/Home';

import NewProgram from './programs/pages/NewProgram';
import UserPrograms from './programs/pages/UserPrograms';
import UpdateProgram from './programs/pages/UpdateProgram';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          {/* <Users /> */}
          <Home />
        </Route>
        <Route path="/:userId/programs" exact>
          <UserPrograms />
        </Route>
        <Route path="/programs/new" exact>
          <NewProgram />
        </Route>
        <Route path="/programs/:programId">
          <UpdateProgram />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          {/* <Users/> */}
          <Home />
        </Route>
        <Route path="/auth" >
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
