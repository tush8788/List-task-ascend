const express = require('express');
const userController = require('../controller/user_controller');
const passport = require('passport');
const router = express.Router();

//create user
router.post('/create',userController.create);

//create-session
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/signin'}),userController.createSession);

router.get('/signout',userController.signOut);

module.exports=router