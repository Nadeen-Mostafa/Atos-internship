import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../validators/validators';
import { useForm } from '../../shared/Hooks/form-hook';
import { AuthContext } from './auth-context';
import './Auth.css';
import axios from "axios";
// import {
//   Route,
//   Switch
// } from 'react-router-dom';
// import Users from '../../user/pages/Users';
// import UserQuestion from '../../questions/pages/UserQuestion';
// import NewQuestion from '../../questions/pages/NewQuestion';
// import UpdateQuestion from '../../questions/pages/UpdateQuestion';
// import GetAllQuestions from '../../questions/pages/GetAllQuestions';
import ErrorModel from '../../Model/ErorrModel';
//CHECK IF USER TYPE TEACHER THEN REDIECT TO QUESTIONS PAGES ELSE SIGN UP FIRST
const Login = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  // const authSubmitHandler = event => {
  //   event.preventDefault();
  //   console.log(formState.inputs);
  //   auth.login();
  // };

  const authSubmitHandler = async event => {
    event.preventDefault();
    // setIsLoading(true);

      try {
        const response = await axios.post("http://localhost:4000/api/users/login", {
          // method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formState.inputs.username.value,
            password: formState.inputs.password.value

          })
        });
        const resData = await response.data;
        
        let token = resData.token;
        localStorage.setItem('token', token);

        if (response.status!==201) {
          
          throw new Error(resData.message);
          
        }
        
        
        // setIsLoading(false);
        console.log(resData)
        auth.login(resData.userId,resData.userType);
        // auth.login(resData.userType)
        auth.userType=resData.userType;
        auth.userId=resData.userId 
        // console.log("test in login page");
        auth.isLoggedIn = true;
        console.log(auth)
      } catch (err) {
        setIsLoading(false);
        // console.log("error in catchhhhhhhh")
        setError( 'Something went wrong, please try again.');
      }
  };

  const errorHandler = () => {
    setError(null);
  };


  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler} />

      <Card className="authentication">
        {/* {isLoading && <LoadingSpinner asOverlay />} */}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="username"
            type="text"
            label="Username"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a valid username."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            LOGIN
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Login;
