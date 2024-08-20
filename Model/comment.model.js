const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User',require:true },
    postId:{type: mongoose.Schema.Types.ObjectId, ref:'Post',require:true},
    parentId:{type: mongoose.Schema.Types.ObjectId, ref:'Comment',default:null},
    createdAt:{type:Date,default:Date.now},
    replies:[
        {type:mongoose.Schema.Types.ObjectId,ref:"Comment"}
    ]
});

const commentModel = mongoose.model('Comment', commentSchema);

module.exports = { commentModel }