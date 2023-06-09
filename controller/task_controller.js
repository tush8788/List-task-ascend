const ListDB = require('../models/list');

//delete task
module.exports.delete = async function (req, res) {
    try {
        //find list in db
        let list = await ListDB.findOne({ _id: req.query.listId });

        //check task found or user match or not 
        if (!list || list.user != req.user.id) {
            console.log("user not match or task not found");
            req.flash("error", "user not match or task not found..");
            return res.redirect('/user/signout');
        }

        // remove task form list
        await list.tasks.pull({ _id: req.query.taskId });
        await list.save();
        req.flash("success", "Task delete successfully..");
        return res.redirect('back');

    }
    catch (err) {
        console.log(err);
        req.flash("error", "Internal server error");
        return res.redirect('back');

    }
}

//task done or not
module.exports.taskDoneOrNot = async function (req, res) {
    try {
        //find task in db 
        let list = await ListDB.findById(req.query.listId);

        //check task found or user match or not 
        if (!list || list.user != req.user.id) {
            req.flash("error", "user not match or task not found..");
            return res.redirect('/user/signout');
        }
        //find task in array of tasks
        for (let t of list.tasks) {
            //update task
            if (t._id == req.query.taskId) {
                t.done = req.query.done;
                break;
            }
        }

        await list.save();
        req.flash("success", "task status update..");
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        req.flash("error", "Internal server error");
        return res.redirect('back');
    }
}

//new task page
module.exports.newTaskPage = function (req, res) {
    return res.render('addNewTask', {
        title: "New Task",
        listId: req.query.listId
    })
}

//create new task
module.exports.createNewTask = async function (req, res) {
    try {
        // console.log(req.body);
        let list = await ListDB.findById(req.body.listId);

        //check task found or user match or not 
        if (!list || list.user != req.user.id) {
            req.flash("error", "user not match or task not found..");
            return res.redirect('/user/signout');
        }
        //push new task in tasks array
        await list.tasks.push({ taskName: req.body.newTask, done: false });

        await list.save();
        req.flash("success", "Task add successfully")
        return res.redirect('/')
    }
    catch (err) {
        console.log(err);
        req.flash("error", "Internal server error");
        return res.redirect('back');
    }
}