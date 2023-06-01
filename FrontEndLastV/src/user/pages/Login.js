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
//CHECK IF USER TYPE TEACHER THEN REDIECT TO QUESTIONS PAGES ELSE SIGN UP FIRST
const Login = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
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

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="authentication">
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
  );
};

export default Login;
