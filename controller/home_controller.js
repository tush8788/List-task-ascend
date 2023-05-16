module.exports.home = function(req,res){
    return res.end("<h1>home</h1>");
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