const express = require('express');
const taskController = require('../controller/task_controller');
const passport = require('passport');
const router = express.Router();

//detele task from list
router.get('/delete',passport.checkAuthentication,taskController.delete);

//task done or not
router.get('/doneornot',passport.checkAuthentication,taskController.taskDoneOrNot);

module.exports = router;