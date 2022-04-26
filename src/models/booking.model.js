const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tourId: String,
  userId: String,
  slot: Number,
  cost: Number,
  createdAt: Date,
  updatedAt: Date,
  status: String,
});
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
