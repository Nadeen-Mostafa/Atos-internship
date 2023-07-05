import React, { useState, useCallback } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import MainNavigation from "./Navigation/MainNavigation";
import UserQuestion from './questions/pages/UserQuestion';
import NewQuestion from './questions/pages/NewQuestion';
import UpdateQuestion from './questions/pages/UpdateQuestion';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import { AuthContext } from './user/pages/auth-context';
import GetAllQuestions from './questions/pages/GetAllQuestions';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import SignUpAdmin from './user/pages/SignUpAdmin';
import CreateExamDef from './exam/CreateExamDef';

import GetAllExamDef from './exam/GetAllExamDef';
import AssinExam from './exam/AssinExam';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setuserId] = useState(false);
  const [userType, setuserType] = useState();

  const login = useCallback((uid, type) => {
    setIsLoggedIn(true);
    setuserId(uid);
    setuserType(type);
    // console.log(uid)
    // console.log(type);
  }, []);

  // console.log(userId)
    // console.log(userType)



  // console.log(userId)
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setuserId(null);
    // setuserType(null);
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
        
        <Route path="/examdef">
        <CreateExamDef />
      </Route>
      <Route path="/showexamdef">
      <GetAllExamDef/>
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
        <Route path="/signupadmin">
          <SignUpAdmin />
        </Route>
        <Route path="/assign">
          <AssinExam />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          {/* <Users /> */}
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
        <Route path="/signupadmin">
          <SignUpAdmin />
        </Route>
        {/* <Redirect to="/signup" /> */}
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, userType: userType, login: login, logout: logout }}
    >

      {/* {console.log("hello from app file")} */}
      {/* {console.log(userId)}
      {console.log(userType)} */}
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
export default App;
