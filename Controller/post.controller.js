
const { postModel } = require("../Model/post.model")
const postCreate = async (req, res) => {
    try {
        const { title, content } = req.body;
        const user = req.user;
        
        const newPost=await postModel.create({title,content,userId:user._id});

        res.status(200).json({"msg":"new post created","post":newPost})

    } catch (error) {
        res.status(500).json({ "msg": "something went wrong", "err": error.message })
    }
}

module.exports = { postCreate }