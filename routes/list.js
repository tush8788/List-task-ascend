const express = require('express');
const listController = require('../controller/list_controller');
const passport = require('passport');
const router = express.Router();

//create user
router.post('/create',listController.createList);

module.exports=router;