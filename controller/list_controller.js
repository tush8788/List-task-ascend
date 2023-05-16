const ListDB = require('../models/list');

module.exports.createList=async function(req,res){
  try{
    console.log(req.body);
    let list = await ListDB.create({
        listName:req.body.ListName,
        user:req.user
    });

    if(list){
        req.body.TaskName.map((elem)=>{
            list.tasks.push({taskName:elem,done:false}); 
        });
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