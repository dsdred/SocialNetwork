//
const { Router } = require("express");
const profileRouter = require("./groups/profile.router");
const likeRouter = require("./groups/like.router");
const postRouter = require("./groups/post.router");
const commentRouter = require("./groups/comment.router");
const messageRouter = require("./groups/message.router");

const router = new Router();
router.use("/profile", profileRouter);
router.use("/like", likeRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/message", messageRouter);

module.exports = router;
