const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        equired:true,
        unique:true
    },
    email:{
        type:String,
        equired:true,
        unique:true
    },
    password:{type:String,
        equired:true,
    }
});

const userModel=mongoose.model('User',userSchema);

module.exports={userModel}