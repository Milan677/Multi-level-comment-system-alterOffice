const rateLimit=require("express-rate-limit");

const commentRateLimiter=rateLimit({
    windowMs:60*1000, // 1 min
    max:5, // max 5 request from each IP per windwo
    message:'Too many comment from this IP address, please try again later !'
});

module.exports=commentRateLimiter;