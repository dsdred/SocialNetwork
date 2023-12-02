const jwt = require("jsonwebtoken");

const successRoles = ["admin", "user"];

module.exports = function (req, res, next) {
  const headAuthorization = req.headers.authorization;
  if (!headAuthorization) {
    return res.status(401).json({ message: "Token error (header)" });
  }

  const data = headAuthorization.split(" ");

  if (data.length !== 2) {
    return res.status(401).json({ message: "Token error (mass2)" });
  }

  try {
    const payload = jwt.verify(data[1], process.env.SECRET_KEY);

    if (successRoles.includes(payload.role)) {
      req.locals = {
        payload: payload,
      };

      next();
    } else {
      return res.status(401).json({ message: "Unverified user" });
    }
  } catch (e) {
    return res.status(401).json({ message: "Token error (bad)" });
  }
};
