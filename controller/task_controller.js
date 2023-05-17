const ListDB = require('../models/list');

//delete task
module.exports.delete=async function(req,res){
    try{
        // console.log(req.query);
        let list = await ListDB.findOne({_id:req.query.listId});
        
        //check task found or user match or not 
        if(!list || list.user != req.user.id){
            console.log("user not match or task not found");
            return res.redirect('/user/signout');
        }
        
        await list.tasks.pull({_id:req.query.taskId});
        await list.save();
        
        return res.redirect('back');

    }
    catch(err){
        console.log(err);
        return res.redirect('back');

    }
}

//task done or not
module.exports.taskDoneOrNot=async function(req,res){
    try{
        // console.log(req.query);

        let list = await ListDB.findById(req.query.listId);

        //check task found or user match or not 
        if(!list || list.user != req.user.id){
            console.log("user not match or task not found");
            return res.redirect('/user/signout');
        }
        
        for (let t of list.tasks){
            if(t._id==req.query.taskId){
                t.done=req.query.done;
                break;
            }
        }

        await list.save();
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}