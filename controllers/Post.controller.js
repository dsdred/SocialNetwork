const post = require("../models/post.models");

class PostController {
  async create(req, res) {
    try {
      const payload = req.currentUser;
      const profileId = payload.id;

      const { content } = req.body;
      await post.create({
        content,
        user_id: profileId,
      });
      res.status(201).json({ message: "Post created" });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getById(req, res) {
    try {
      const postId = req.params.id;
      const postList = await post
        .findOne({ _id: postId })
        .select(" _id content user_id timestamp");
      res.json(postList);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const { id, content } = req.body;
      const postData = await post.findOneAndUpdate(
        { _id: id },
        { content },
        { new: true }
      );
      res.json(postData);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const payload = req.currentUser;

      const { id } = req.body;
      if (payload.role === "admin") {
        const result = await post.findOneAndDelete({ _id: id });
      } else {
        const profileId = payload.id;
        const result = await post.findOneAndDelete({
          _id: id,
          user_id: profileId,
        });
      }
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const result = await post.find().select(" _id content user_id timestamp");
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = new PostController();
