const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  updatedAt: Date,
  createdAt: Date,
});
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
