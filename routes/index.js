const express = require('express');
const homeController = require('../controller/home_controller');
const router = express.Router();

router.get('/',homeController.home);

router.get('/signin',homeController.signInPage);

router.get('/signup',homeController.signUpPage);

//user
router.use('/user',require('./user'));

//list
router.use('/list',require('./list'));

module.exports=router