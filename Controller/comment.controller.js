const { commentModel } = require("../Model/comment.model");
const { postModel } = require("../Model/post.model");


//.........Craete a comment........
const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        const post = await postModel.findById(postId);
        if (!post) {
            res.status(404).json({ "msg": "post not found" });
        }

        const newComment = await commentModel.create({ text, userId, postId });
        res.status(200).json({ "msg": "new comment added", "comment": newComment })

    } catch (error) {
        res.status(500).json({ "msg": "something went wront in comment.controller.js", "err": error.message })
    }
}

//...............Reply to comment............
const replyToComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { postId, commentId } = req.params;
        const userId = req.user._id;

        const post = await postModel.findById(postId);
        if (!post) {
            res.status(404).json({ "msg": "post not found !" });
        }

        const parentcomment = await commentModel.findById(commentId);
        if (!parentcomment) {
            res.status(404).json({ "msg": "commnet not found !" });
        }

        const reply = await commentModel.create({ text, userId, postId, parentId: commentId });
        await commentModel.findByIdAndUpdate(commentId, { $push: { replies: reply._id } });

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ "msg": "something went wront in comment.controller.js", "err": error.message })
    }
}

//..........get all coments with replies for a specific post..............
const getComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { sortBy, sortOrder } = req.query;

        const comments = await commentModel.find({ postId, parentId: null })
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .populate({ path: "replies", select: { text: 1, createdAt: 1 }, options: { sort: { createdAt: -1 }, limit: 2 } })
            .lean();

        //...........adding total replies to each comment document.....................
        for (let comment in comments) {
            const totalReplies = await commentModel.countDocuments({ parentId: comments[comment]._id });
            comments[comment].totalReplies = totalReplies
        }


        res.status(200).json(comments)

    } catch (error) {
        res.status(500).json({ "msg": "something went wront in comment.controller.js", "err": error.message })
    }
}


//...............get replies of a specific comment with pagination............................. 

const getCommentWithPaggination = async (req, res) => {
    try {
        const { postId, commentId } = req.params;

        const parentComment = await commentModel.findOne({ _id: commentId, postId, parentId: null }).lean();
        if (!parentComment) {
            res.status(404).json({ "msg": "Top level comment not found !" })
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.pageSize, 10) || 1;
        const skip = (page - 1) * limit;

        const replies = await commentModel.find({ parentId: commentId })
            .populate({ path: "replies", select: { text: 1, createdAt: 1 }, options: { sort: { createAt: -1 }, limit: 2 } })
            .skip(skip).limit(limit).lean();


        for (let comment in replies) {
            const totalReplies = await commentModel.countDocuments({ parentId: replies[comment]._id });
            replies[comment].totalReplies = totalReplies
        }

        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ "msg": "something went wront in comment.controller.js", "err": error.message })
    }
}

module.exports = { createComment, replyToComment, getComment, getCommentWithPaggination }