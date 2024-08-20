const jwt=require("jsonwebtoken");
const{userModel}=require("../Model/user.model");
require("dotenv").config();

const authenticate=async(req,res,next)=>{
    const token=req.cookies.token;

    try {
        const decodeToken=jwt.verify(token,process.env.jwt_secret_key);
        const{userId}=decodeToken;
        

        const user=await userModel.findById(userId);
        if(!user){
            res.status(401).json({ "msg": "pls login" });
        }
        // send the user data via request
        req.user=user;
        next();

    } catch (error) {
        res.status(400).json({ "msg": "something went wrong", "error": error.message });
        
    }
}

module.exports={authenticate}