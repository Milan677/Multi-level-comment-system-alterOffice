const express=require("express");
const userRouter=express.Router();
const{userModel}=require("../Model/user.model");
const{userResistration,userLogin}=require('../Controller/user.controller')


userRouter.post('/register',userResistration);
userRouter.post('/login',userLogin);



module.exports={userRouter}

