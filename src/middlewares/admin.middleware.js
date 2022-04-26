const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!data.isAdmin) {
      return res.status(403).send("UNAUTHORIZE");
    }
  } catch (err) {
    res.status(401).send(err.message);
    return;
  }

  next();
};
