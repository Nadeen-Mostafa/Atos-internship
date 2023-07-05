import React, { useContext, useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/Button/Button';
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../validators/validators';
import { useForm } from '../../shared/Hooks/form-hook';
import './Auth.css';
import Login from './Login';
import { AuthContext } from './auth-context';

// import HttpError from '../../user';
import axios from "axios";
import ErrorModel from '../../Model/ErorrModel';
const SignUpAdmin = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const auth = useContext(AuthContext);
    const [error, setError] = useState();
    const [formState, inputHandler] = useForm(
        {
            username: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            usertype: {
                value: '',
                isValid: false
            }
        },
        false
    );

    let type = formState.inputs.usertype.value;
    
    const errorHandler = () => {
        setError(null);
    };

    const authSubmitHandler = async event => {
        event.preventDefault();

        const NewType = type.toLowerCase();

        const teacher = "teacher";
        const student = "student";
        const admin="admin";
        console.log(NewType===admin);
        if (NewType === admin || NewType === teacher || NewType === student) {
            try {

                console.log("test superadmin");
                const response = await axios.post("http://localhost:3000/api/users/signupadmin", {
                    // method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: formState.inputs.username.value,
                        password: formState.inputs.password.value,
                        userType: formState.inputs.usertype.value
                    })
                });
                const resData = await response.data;
                // console.log(resData.userId);
                auth.login(resData.userId);
                type = formState.inputs.usertype.value;
                auth.userType = formState.inputs.usertype.value;

                console.log(auth.userType);

                // console.log(auth.userType);
            }

            catch (err) {
                console.log(err);
            }

        }
        // else if(NewType===admin){


        // }
        else{
        setError('Please enter valid input, specify if your are teacher or student');
        console.log("test if condition");


        return (
            <React.Fragment>
                <ErrorModel error={error} />



            </React.Fragment>);
    }

    }
    // console.log(type);



    return (
        <Card className="authentication">
            <ErrorModel error={error} onClear={errorHandler} />
            <h2>Sign up Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                <Input
                    element="input"
                    id="username"
                    type="text"
                    label="Your Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
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

                <Input
                    element="input"
                    id="usertype"
                    type="text"
                    label="Student , teacher or admin"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Please enter a valid input"
                    onInput={inputHandler}
                // onChange={validateForm}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    Sign Up
                </Button>
            </form>
            {/* <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button> */}
        </Card>
    );
};
export default SignUpAdmin;

