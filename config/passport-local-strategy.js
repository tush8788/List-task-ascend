const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserDB = require('../models/user');

//passport local strategy
passport.use(new localStrategy({
    //username field
    usernameField:'email',
    //give access of req obj
    passReqToCallback:true
},async function(req,email,password,done){
    try{
        //find user in db
        let user=await UserDB.findOne({email:email});
        
        //if user not found or password not match
        if(!user || password != user.password){
            req.flash('error',"Invaild email or password");
            // console.log("Invaild email or password")
            return done(null,false);
        }

        return done(null,user);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
}));

//serialize user means for passport call this method for create session cookie
passport.serializeUser((user,cb)=>{
    cb(null,user.id);
})
//passport call this for check cookie data valid or not 
passport.deserializeUser( async (id,cb)=>{
    try{
        let user = await UserDB.findById(id);
        if(!user){
            return cb(null,false);
        }
        return cb(null,user);
    }
    catch(err){
        return cb(err);
    }
})
//check user is login or not 
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signin');
}
//login user set in res.locals for use in views folder
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}
