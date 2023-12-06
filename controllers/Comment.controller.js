const comment = require("../models/comment.models");

class CommentController {
  async create(req, res) {
    try {
      const payload = req.currentUser;
      const profileId = payload.id;

      const { post_id, content } = req.body;
      await comment.create({
        post_id,
        user_id: profileId,
        content,
      });
      res.status(201).json({ message: "Comment add" });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getByPostId(req, res) {
    try {
      const postId = req.params.id;
      const commentList = await comment
        .find({ post_id: postId })
        .select(" _id content user_id post_id timestamp");
      res.json(commentList);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const payload = req.currentUser;
      const profileId = payload.id;

      const { id } = req.body;
      const result = await comment.findOneAndDelete({
        _id: id,
        user_id: profileId,
      });
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = new CommentController();
