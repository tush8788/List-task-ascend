const express = require('express');
const listController = require('../controller/list_controller');
const passport = require('passport');
const router = express.Router();

//create list
router.post('/create',passport.checkAuthentication,listController.createList);

//delete list
router.get('/delete',passport.checkAuthentication,listController.deleteList);

module.exports=router;