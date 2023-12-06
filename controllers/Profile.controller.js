require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const profile = require("../models/profile.models");

//Генерация паролей
const genPass = require("omgopass");

class ProfileController {
  async create(req, res) {
    try {
      const { name, surname, email, password } = req.body;

      const hashPassword = bcrypt.hashSync(password, 3);

      await profile.create({
        email,
        password: hashPassword,
        name,
        surname,
        role: "user",
        active: true,
      });
      res.status(201).json({ message: "User created" });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async auth(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await profile.findOne({ email: email });

      if (!userData || userData.active === false) {
        return res.status(404).json({ message: "User not found" });
      }

      if (bcrypt.compareSync(password, userData.password)) {
        return res.status(200).json(
          jwt.sign(
            {
              id: userData._id,
              email: userData.email,
              name: userData.name,
              active: userData.active,
              role: userData.role,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: process.env.TOKEN_TIME,
            }
          )
        );
      }
      res.status(400).json({ message: "Bad password" });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const payload = req.currentUser;
      const profileId = payload.id;

      const { name, surname, email } = req.body;
      const profileData = await profile
        .findOneAndUpdate(
          { _id: profileId },
          { name, surname, email },
          { new: true }
        )
        .select("_id name surname email role active");
      res.json(profileData);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async genPassword(req, res) {
    const password = genPass({ syllablesCount: 5 });

    res.json({ password: password });
  }

  async changepPassword(req, res) {
    try {
      const { id, password } = req.body;
      const hashPassword = bcrypt.hashSync(password, 3);
      const profileData = await profile
        .findOneAndUpdate(
          { _id: id },
          { password: hashPassword },
          { new: true }
        )
        .select("_id name surname email role active");
      res.json(profileData);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body;
      const result = await profile.findOneAndDelete({ _id: id });
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const profileList = await profile
        .find()
        .select("name surname email active");
      res.json(profileList);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getFull(req, res) {
    try {
      const payload = req.currentUser;
      const profileId = payload.id;

      const profileList = await profile
        .findOne({ _id: profileId })
        .select("_id name surname email role active");
      res.json(profileList);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getInfo(req, res) {
    try {
      const payload = req.currentUser;
      const profileId = payload.id;

      const profileList = await profile
        .findOne({ _id: profileId })
        .select("name, surname");
      res.json(profileList);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = new ProfileController();
