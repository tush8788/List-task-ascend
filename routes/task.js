const express = require('express');
const taskController = require('../controller/task_controller');
const passport = require('passport');
const router = express.Router();

router.get('/delete',passport.checkAuthentication,taskController.delete);

module.exports = router;