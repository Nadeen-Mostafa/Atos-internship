import React ,{useState} from 'react';
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
// import HttpError from '../../user';
import axios from "axios";
const Signup = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

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



    
  
    const authSubmitHandler = event => {
        event.preventDefault();
        // console.log(formState.inputs);
    };


    const baseURL="http://localhost:3000"
    const SavedData =async(username, password, usertype) =>{
        // event.preventDefault();
        let res;
        try{
            const URL= baseURL+ "/signup";
            res=await axios.post(URL ,{username,password,usertype});
            console.log(res);
            // return res.data;
        }
        catch(error){
           throw Error(error.response.data.error.message);
        }
    }
    return (
        <Card className="authentication">
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
                    label="Student Or teacher"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Please enter a valid input"
                    onInput={inputHandler}
                />
                <button type="submit" disabled={!formState.isValid} onClick={SavedData}>
                    {isLoginMode ? 'SIGN UP' : <Login/> }
                </button>
            </form>
            {/* <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button> */}
        </Card>
    );
};
export default Signup;

