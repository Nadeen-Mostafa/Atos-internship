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


const Welcome = () => {

    return(
        <>
        <p></p>
        </>
    )
}