const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
// db
const db = require('./config/mongoose');
//passport auth
const passport = require('passport')
const localStrategy = require('./config/passport-local-strategy');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
// notification
const flash = require('connect-flash');
const notification = require('./config/notification');
// port
const port = process.env.PORT || 8000;

const app = express();

//set up ejs
app.set('view engine','ejs');
app.set('views','./views');

app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use(expressLayout);

app.use(bodyParser.urlencoded({extended:false}));
// access static file
app.use(express.static('assets'));
// genrate session cookie
app.use(expressSession({
    name: "Fotolay",
    secret: "FotolaySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    },
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL||'mongodb://localhost/task_list_ascend',
        autoRemove: false
    }, function (err) {
        console.log(err || "connect successfully");
    })
}))
// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//flash notification
app.use(flash());
app.use(notification.setFlash);
// handle req
app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up on port ",port);
})