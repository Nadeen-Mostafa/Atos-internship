const express = require("express");
const QuestionsController = require("../controllers/question-controller");
const { check } = require('express-validator');
const router = express.Router();

router.get('/:qid', QuestionsController.getQuestionsById);

router.get('/user/:uid', QuestionsController.getQuestionsByUserId);

router.get("/",QuestionsController.getQuestions);

router.post('/', [
    check('name')
        .not()
        .isEmpty(),
    check('category')
        .not().isEmpty(),
    check('subCategory')
        .not()
        .isEmpty(),
    check('mark')
        .not()
        .isEmpty(),
    check('expextedTime')
        .not().isEmpty()
], QuestionsController.createdQuestion);

router.patch('/:qid', QuestionsController.updateQuestion);

router.delete('/:qid', QuestionsController.deleteQuestion);


module.exports = router;