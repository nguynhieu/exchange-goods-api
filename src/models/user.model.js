const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  isAdmin: Boolean,
  avatar: String,
  username: String,
  password: String,
  phone: String,
  email: String,
  address: String,
  myWishList: []
});
const User = mongoose.model("User", userSchema);

module.exports = User;
