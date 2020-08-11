const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    res.status(401).send(err.message);
    return;
  }

  next();
};
