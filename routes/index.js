const express = require('express');
const homeController = require('../controller/home_controller');
const router = express.Router();
const passport = require('passport');

// home
router.get('/',passport.checkAuthentication,homeController.home);

// sign in page
router.get('/signin',homeController.signInPage);

// sign up page
router.get('/signup',homeController.signUpPage);

//user
router.use('/user',require('./user'));

//list
router.use('/list',require('./list'));

//task
router.use('/task',require('./task'));

module.exports=router