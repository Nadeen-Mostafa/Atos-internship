const uuid = require('uuid').v4;

const HttpError = require('../models/http-error');

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const bcrypt = require("bcryptjs"); //hashing password

const { validationResult } = require('express-validator');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Schwarz',
        password: 'testers',
        userType: 'student'
    }
];

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, "-password");
    }
    catch (err) {
        const error = new HttpError("there is error in output the whole data", 500);
        return next(error);
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) })
};



const signup = async (req, res, next) => {
    const {name, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("invalid inputs")
        )
    }
   

    let isexist;
    try {
        isexist = await User.findOne({ name: name });
    }
    catch (err) {
        const error = new HttpError("faild to sign up", 500);

        return next(error);
    }

    if (isexist) {
        const err = new HttpError("user exist so please log in or try again", 400);
        return next(err);
    }

 
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch (err) {
        const error = new HttpError("couldn't create user", 500);
        return next(error);
    }

    const createdUser = new User({
        
        name, // name: name
        password: hashedPassword,
        userType
    });

   


    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again.',
            400
        );
        console.error(err);
        return next(error);
    }

    // res.status(201).json({ user: createdUser.toObject({ getters: true }) });


    let token;

    try {
        token = jwt.sign({ userId: createdUser.id,name:createdUser.name, userType: createdUser.userType }, "supersecrets", { expiresIn: "1h" });
    }
    catch (err) {

        const error = new HttpError("faild to create user", 500);
        return next(error);

    };
    res.status(201).json({ userId:createdUser.id, message:"signup successfully" , userTyper:createdUser.userType,name:createdUser.name , token:token });

}
const login = async (req, res, next) => {
    const { name, password } = req.body;

    let existUser;
    try {
        existUser = await User.findOne({ name: name });
    }
    catch (err) {
        const error = new HttpError("faild to log in", 500);
        return next(error);
    }

    if (!existUser) {
        const error = new HttpError("invalid inputs please try again or sign up", 401);
        return next(error);
    }

    let isValid = false;
    try {
        isValid = await bcrypt.compare(password, existUser.password);

    }
    catch (err) {
        const error = new HttpError("colud not log in", 500);
        return next(error);
    }


    if (!isValid) {
        const error = new HttpError("invalid inputs please try again or sign up", 401);
        return next(error);
    }

    let token;

    try {
        token = jwt.sign({ userId: existUser.id, userType: existUser.userType, name: existUser.name }, "supersecrets", { expiresIn: "1h" });
    }
    catch (err) {

        const error = new HttpError("faild to login user", 500);
        return next(error);

    };
    res.status(201).json({ userId: existUser.id, message: "login successfully", userTyper: existUser.userType, name: existUser.name, token, token });



};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
