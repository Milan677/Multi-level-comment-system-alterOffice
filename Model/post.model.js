const mongoose=require("mongoose");

const postSchema= new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
});

const postModel=mongoose.model('Post',postSchema);

module.exports={postModel}