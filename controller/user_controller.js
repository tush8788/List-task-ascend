const UserDB = require('../models/user');

module.exports.create = async function (req, res) {
    try {
        
        if (req.body.password != req.body.confirmPassword) {
            console.log("password and confirm password not match");
            req.flash('error',"password and confirm password not match")
            return res.redirect('back');
        }
        //find user in DB
        let user = await UserDB.findOne({email:req.body.email});

        if (!user) {
            user = await UserDB.create(req.body);
            req.flash('success',"User create successfully");
            return res.redirect('/signin');
        }

        console.log("User already exist");
        req.flash('error',"User already exist")
        return res.redirect('/signin');

    }
    catch (err) {
        console.log(err);
        req.flash('error',"Internal server error")
        return res.redirect('back');
    }
}

//create session
module.exports.createSession = function (req, res) {
    // console.log("session created");
    req.flash('success',"Signin successfully")
    return res.redirect('/');
}

//signout
module.exports.signOut = function(req,res){
    req.logout((err)=>{
        req.flash('success',"Signout successfully")
        return res.redirect('/signin');
    })
}