const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
    if (payload.role !== "admin") {
      return res.status(401).json({ message: "You are not admin" });
    } else {
      // передаем прочитанную информацию в запросе и передаем дальше
      req.currentUser = payload;

      next();
    }
  } catch (e) {
    return res.status(401).json({ message: "Token error (bad)" });
  }
};
