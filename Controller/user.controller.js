const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const cookieParser=require("cookie-parser");

// resitration---
const userResistration = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });
        if (user) {
            res.status(400).json({ "msg": "User alredy exist !" })
        }

        // hash the password and save
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(400).json({ "msg": "something went wrong", "error": err.message });
            } else {
               user =new userModel({userName,email,password:hash});
               await user.save();
               res.status(200).json({ "msg": "A new user recently added" });

            }
        })
    } catch (error) {
        res.status(500).json({ "msg": "something went wrong", "error": err.message });
    }
}

//login...
const userLogin=async(req,res)=>{
    try {
        const {  email, password } = req.body;

        const user= await userModel.findOne({email});
       
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    // generating aaccess token
                    var token=jwt.sign({userId:user._id},process.env.jwt_secret_key,{expiresIn:"2h"});

                    // storing the token in cookie
                    res.cookie('token',token);

                    res.status(200).json({"msg":"Login succesfull !","token":token})

                }else{
                    res.status(400).json({"msg":"Wrong credential !","error":err})
                }
            });
        }else{
            res.status(400).json({"msg":"Wrong email !"})
        }
    } catch (error) {
        res.status(500).json({ "msg": "something went wrong", "error": err.message });
    }
}



module.exports = { userResistration , userLogin  }