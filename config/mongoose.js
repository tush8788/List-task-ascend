const mongoose = require('mongoose');

const dotenv = require('dotenv').config();

mongoose.set('strictQuery',false);

mongoose.connect(process.env.MONGO_URL||'mongodb://localhost/task_list_ascend');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connect DB"));

db.once('open',()=>{console.log("DB Connect Sucessfully")});

module.exports=db;