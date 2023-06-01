import React, { useState, useCallback } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './questions/pages/NewQuestion';
import MainNavigation from "./Navigation/MainNavigation";
import UserQuestion from './questions/pages/UserQuestion';
import NewQuestion from './questions/pages/NewQuestion';
import UpdateQuestion from './questions/pages/UpdateQuestion';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import { AuthContext } from './user/pages/auth-context';
import GetAllQuestions from './questions/pages/GetAllQuestions';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/:userId/questions" exact>
          <UserQuestion />
        </Route>
        <Route path="/questions/new" exact>
          <NewQuestion />
        </Route>
        <Route path="/questions/:questionId">
          <UpdateQuestion />
        </Route>
        <Route path="/allquestions" exact>
          <GetAllQuestions />
        </Route>
        {/* <Redirect to="/" /> */}
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/questions" exact>
          <UserQuestion />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        {/* <Redirect to="/signup" /> */}
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
export default App;
