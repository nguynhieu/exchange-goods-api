const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  tourId: String,
  userId: String,
  slot: Number,
  cost: Number,
  createdAt: Date,
  updatedAt: Date,
  status: String,
});
const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
