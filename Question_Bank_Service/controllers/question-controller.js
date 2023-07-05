const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const uuid = require('uuid').v4;
const bodyParser = require("body-parser");
const Question = require("../models/question");
const User = require("../../User_Service/models/user");
const { default: mongoose } = require('mongoose');
const question = require('../models/question');
const {ObjectId} = require("mongodb")


const getQuestionsById = async (req, res, next) => {
    const questionId = req.params.qid; // { pid: 'p1' }
    let question;
    try {
        question = await Question.findById(questionId);
    }
    catch (err) {
        const error = new HttpError('Could not find a question.', 404);
        return next(error);
    }

    if (!question) {
        const error = new HttpError('Could not find a question for the provided id.', 404);
        return next(error);
    }

    res.json({ question: question.toObject({ getters: true }) }); // => { place } => { place: place }
};

const getQuestions = async (req, res, next) => {
    // const questionId = req.params.qid; // { pid: 'p1' }
    let question;
    try {
        question = await Question.find();
    }
    catch (err) {
        const error = new HttpError('Could not find a question.', 404);
        return next(error);
    }

    if (!question) {
        const error = new HttpError('Could not find a question for the provided id.', 404);
        return next(error);
    }

    res.json({ questions: question.map(question => question.toObject({ getters: true })) });


    // res.json({ question: question.toObject({ getters: true }) }); // => { place } => { place: place }
};

const getQuestionsByUserId = async (req, res, next) => {
  
    const userId = req.params.uid;
 
    // let questions;
    let userWithQuestions;
    try {
        userWithQuestions = await Question.find({createdBy:userId});
        
    } catch (err) {
        console.log("error in catch in back");
        const error = new HttpError(

            'Fetching questions failed, please try again later.',
            500
        );
        return next(error);
    }


    if (!userWithQuestions) {
        return next(
            new HttpError('Could not find questions for the provided user id.', 404)
        );
    }

    res.json({ questions: userWithQuestions.map(question => question.toObject({ getters: true })) });



    // try {
    //     questions = await Question.find({ createdBy: userId })
    // }
    // catch (err) {
    //     const error = new HttpError('Fetching Failed, please try again later.', 500);
    //     return next(error);
    // }



    // if (!questions || questions.length === 0) {
    //     return next(
    //         new HttpError('Could not find a question for the provided user id.', 404)
    //     );
    // }

    // res.json({ questions: questions.map(question => question.toObject({ getters: true })) });
};


const createdQuestion = async (req, res, next) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     throw new HttpError('Invalid inputs passed, please check your data.', 422);
    // }
    let body = JSON.parse(req.body.body)
    const { name, category, subCategory, mark, expextedTime, correctAnswers, createdBy, createdAt, answers } = body;
    console.log(body)
    // const title = req.body.title;

    const createdQuestion = new Question({
        // id: uuid(),
        name,
        category,
        subCategory,
        mark,
        expextedTime,
        correctAnswers,
        createdBy,
        createdAt: new Date(),
        answers
    });

    console.log(createdQuestion);
    // let user;
    // try {
    //     user = await User.findById(createdBy);
    //     // if (createdBy.match(/^[0-9a-fA-F]{24}$/)) {
    //     //     // Yes, it's a valid ObjectId, proceed with `findById` call.
    //     // }
    // }
    // catch (err) {
    //     const error = new HttpError("creating question failed", 500);
    //     return next(error);
    // }

    // if (!user) {
    //     const error = new HttpError("could not find user for the provided id", 404);
    //     return next(error);
    // }
    // console.log(user);
    // try {
    //     const sess=await mongoose.startSession();
    //     sess.startTransaction();
    //     await createdQuestion.save({session:sess});
    //     user.creatorID.push(createdQuestion);
    //     await user.save({session:sess});
    //     await sess.commitTransaction();
    // } catch (err) {
    //     const error = new HttpError(
    //         'Creating question failed, please try again.',
    //         500
    //     );
    //     return next(error);
    // }

    try {
        await createdQuestion.save();
    } catch (err) {
        const error = new HttpError(
            'creating failed, please try again.',
            400
        );
        console.error(err);
        return next(error);
    }



    console.log(createdQuestion);
    res.status(201).json({ question: createdQuestion });
};


const updateQuestion = async (req, res, next) => {
    console.log("test update in bank")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }


    let body = JSON.parse(req.body.body)

    let { name, category, subCategory, mark, expextedTime, correctAnswers, createdBy, createdAt, answers } = body;
    const questionId = req.params.qid;
    console.log(body);
    let question;
    try {
        createdAt = new Date();

        question = await Question.findById(questionId);


    }
    catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update question.',
            500
        );
        return next(error);

    }
    if (name !== undefined) {
        question.name = name;
    }
    if (createdAt !== undefined) {
        question.createdAt = createdAt;
    }
    if (category !== undefined) {
        question.category = category;
    }
    if (subCategory !== undefined) {
        question.subCategory = subCategory;
    }
    if (mark !== undefined) {
        question.mark = mark;
    }
    if (expextedTime !== undefined) {
        question.expextedTime = expextedTime;
    }
    if (correctAnswers !== undefined) {
        question.correctAnswers = correctAnswers;
    }
    if (createdBy !== undefined) {
        question.createdBy = createdBy;
    }
    if (answers !== undefined) {
        question.answers = answers;
    }

    try {
        await question.save();
    }
    catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update question.',
            500
        );
        return next(error);
    }
    res.status(200).json({ question: question.toObject({ getters: true }) });


};


const deleteQuestion = async (req, res, next) => {
    const questionId = req.params.qid;
    let question;
    try {
        question = await Question.findById(questionId);
    }
    catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find question.',
            500
        );
        return next(error);

    }

    try {
        await question.deleteOne();
    }
    catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete question.',
            500
        );
        return next(error);

    }
    res.status(200).json({ message: 'Deleted question.' });

};


exports.getQuestionsById = getQuestionsById;
exports.getQuestionsByUserId = getQuestionsByUserId;
exports.createdQuestion = createdQuestion;
exports.updateQuestion = updateQuestion;
exports.deleteQuestion = deleteQuestion;
exports.getQuestions=getQuestions;