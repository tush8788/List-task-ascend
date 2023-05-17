const ListDB = require('../models/list');

//create list
module.exports.createList=async function(req,res){
  try{
    
    let list = await ListDB.create({
        listName:req.body.ListName,
        user:req.user
    });

    if(list){
        
        if(Array.isArray(req.body.TaskName)){
          req.body.TaskName.map((elem)=>{
            list.tasks.push({taskName:elem,done:false}); 
          });
        }
        else{
          list.tasks.push({taskName:req.body.TaskName,done:false});
        }

        await list.save();
        
        return res.redirect('back')
    }
    else{
        console.log("error in create list")
        return res.redirect('back')
    }

  }
  catch(err){
    console.log(err)
    return res.redirect('back');
  }
}

//delete list 
module.exports.deleteList = async function(req,res){
  try{
    // console.log(req.query);
    // list find in DB 
    let list = await ListDB.findById(req.query.listId);
    //if list not found or user not match
    if(!list || list.user!=req.user.id){
      console.log("list on found in DB or unauthorize req");
      return res.redirect('/user/signout');
    }

    await list.deleteOne();
    
    return res.redirect('back');

  }
  catch(err){
    console.log(err);
    return res.redirect('back');
  }
}