const mongoose = require("mongoose");
const Tour = require("./tour.model");
const User = require("./user.model");

const billSchema = new mongoose.Schema({
  tourId: String,
  tour: Tour.schema,
  userId: String,
  user: User.schema,
  slot: Number,
  cost: Number,
  createdAt: Date,
  updatedAt: Date,
  status: String,
});
const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
