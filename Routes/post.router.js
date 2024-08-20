const express=require("express");
const postRouter=express.Router();
const{userModel}=require("../Model/user.model");
const{postCreate}=require("../Controller/post.controller")

postRouter.post("/create-post",postCreate);

module.exports={postRouter}