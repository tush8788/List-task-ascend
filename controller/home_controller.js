const ListDB = require('../models/list');

// home
module.exports.home = async function(req,res){
    try{
        // find all list of task related to login user
        let list = await ListDB.find({user:req.user.id});
        // render
        return res.render('home',{
            title:"Home",
            list
        })
    } 
    catch(err){
        console.log(err);
        req.flash('error',"Internal Server Error");
        return res.redirect('/');
    }
}

// signin page
module.exports.signInPage = function(req,res){
    return res.render('signin',{
        title:"Signin",
        url:'/user/create-session',
    })
}

//signup page
module.exports.signUpPage=function(req,res){
    return res.render('signup',{
        title:"Signup",
        url:'/user/create',
    })
}