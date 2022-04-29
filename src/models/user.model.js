const mongoose = require("mongoose");

const schema = {
  isAdmin: Boolean,
  avatar: String,
  username: String,
  password: String,
  phone: String,
  email: String,
  address: String,
  isBlocked: Boolean,
};

const userSchema = new mongoose.Schema(schema);
const User = mongoose.model("User", userSchema);

module.exports.schema = schema;
module.exports = User;
