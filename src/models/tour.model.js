const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  updatedAt: Date,
  createdAt: Date,
  image: String,
  title: String,
  description: String,
  location: String,
  price: Number,
  schedule: String,
  departureTime: Date,
  transport: String,
  availableSlot: Number,
});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
