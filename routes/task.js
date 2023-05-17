const express = require('express');
const taskController = require('../controller/task_controller');
const passport = require('passport');
const router = express.Router();

//detele task from list
router.get('/delete',passport.checkAuthentication,taskController.delete);

//task done or not
router.get('/doneornot',passport.checkAuthentication,taskController.taskDoneOrNot);

//add new Task
router.get('/new-task',passport.checkAuthentication,taskController.newTaskPage);

//crete task
router.post('/create',passport.checkAuthentication,taskController.createNewTask);

module.exports = router;