const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const User = require("../models/user.model");

module.exports.register = async (req, res) => {
  const { username, password, email, phone, address } = req.body;
  const isExistedUser = await User.findOne({ username: username });
  const isExistedemail = await User.findOne({ email: email });

  if (isExistedUser) {
    res.status(401).send("User has already exists");
    return;
  }

  if (isExistedemail) {
    res.status(401).send("Email already in use");
    return;
  }

  if (phone.length !== 10 || phone.indexOf(0) !== 0) {
    res.status(401).send("Phone number incorrect");
    return;
  }

  const hashPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    isAdmin: false,
    username,
    password: hashPassword,
    myWishList: [],
    email,
    phone,
    address,
    avatar:
      "http://res.cloudinary.com/reii/image/upload/v1594436630/h5qjpjt5cp5ykxiswycv.png"
  };

  await User.insertMany(newUser);

  res.sendStatus(200);
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).lean();

  if (!user) {
    res.status(401).send("Người dùng không tồn tại");
    return;
  }

  const comparePass = await bcrypt.compare(password, user.password);

  if (!comparePass) {
    res.status(401).send("Sai mật khẩu, vui lòng nhập lại");
    return;
  }

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE_SECRET
  });

  // delete hash password of user for response data to client
  delete user.hashPassword;
  const auth = {
    token,
    user
  };

  res.status(200).send({ auth });
};
