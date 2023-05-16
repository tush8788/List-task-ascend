const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const expressLayout = require('express-ejs-layouts');

const app = express();

//set up ejs
app.set('view engine','ejs');
app.set('views','./views');

app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use(expressLayout);

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('assets'));

app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up on port ",port);
})