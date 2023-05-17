const mongoose = require('mongoose');

// schema
const listSchema = new mongoose.Schema({
    listName:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    tasks:[
        {
            taskName:{
                type:String,
            },
            done:{
                type:Boolean,
                default:false
            }
        }
    ]
},{
    timestamps:true
});

const List = mongoose.model('List',listSchema);

module.exports = List;