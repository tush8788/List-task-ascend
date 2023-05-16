const ListDB = require('../models/list');

module.exports.home = async function(req,res){
    try{
        let list = await ListDB.find({user:req.user.id});
        
        return res.render('home',{
            title:"Home",
            list
        })
    } 
    catch(err){
        
    }
}

module.exports.signInPage = function(req,res){
    return res.render('signin',{
        title:"Signin",
        url:'/user/create-session',
    })
}

module.exports.signUpPage=function(req,res){
    return res.render('signup',{
        title:"Signup",
        url:'/user/create',
    })
}