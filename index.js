const express=require("express");
const app=express();
require("dotenv").config();
const{connection}=require("./config/db");
const {userRouter}=require("./Routes/user.router");
const {postRouter}=require("./Routes/post.router");
const{commentRouter}=require("./Routes/comment.router")
const cookieParser=require("cookie-parser");
const{authenticate}=require("./Middlewares/authentication");



app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("welcome to the Multylevel Comment system");
})

app.use("/api/user",userRouter);
app.use(authenticate);
app.use("/api",postRouter);
app.use("/api/posts",commentRouter);

const PORT=process.env.PORT || 4561;
app.listen(PORT,async()=>{
    try {
        await connection;
    } catch (error) {
        console.log(error)
    }

    console.log(`app is running at port ${PORT}...`)
})