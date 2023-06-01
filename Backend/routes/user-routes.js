const express=require("express");
const usersController=require("../controllers/user-controller");
const { check } = require('express-validator');
const Auth=require("../middlewares/check-auth");

const router=express.Router();


// router.use(Auth);

router.get('/', usersController.getUsers);

router.post(
    '/signup',
    [
      check('name')
        .not()
        .isEmpty(),
      check('password').isLength({ min: 6 })
    ],
    usersController.signup
  );
router.post('/login', usersController.login);

module.exports = router;