const like = require("../models/like.models");

class LikeController {
  async create(req, res) {
    try {
      const payload = req.currentUser;
      const profileId = payload.id;

      const { post_id } = req.body;
      await like.create({
        post_id,
        user_id: profileId,
      });
      res.status(201).json({ message: "Like add" });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getByPostId(req, res) {
    try {
      const postId = req.params.id;
      const likeList = await like.find({ post_id: postId });
      res.json(likeList);
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
      const result = await like.findOneAndDelete({
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

module.exports = new LikeController();
