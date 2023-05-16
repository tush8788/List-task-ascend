const UserDB = require('../models/user');

module.exports.create = async function (req, res) {
    try {
        
        if (req.body.password != req.body.confirmPassword) {
            console.log("password and confirm password not match");
            return res.redirect('back');
        }
        //find user in DB
        let user = await UserDB.findOne({email:req.body.email});

        if (!user) {
            user = await UserDB.create(req.body);
            return res.redirect('/signin');
        }

        console.log("User already exist");
        return res.redirect('/signin');

    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

//create session
module.exports.createSession = function (req, res) {
    console.log("session created");
    return res.redirect('/');
}

//signout
module.exports.signOut = function(req,res){
    req.logout((err)=>{
        return res.redirect('/signin');
    })
}