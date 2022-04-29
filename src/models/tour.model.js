const mongoose = require("mongoose");

const schema = {
  updatedAt: Date,
  createdAt: Date,
  images: Array,
  title: String,
  description: String,
  location: String,
  price: Number,
  schedule: String,
  departureTime: Date,
  transport: String,
  availableSlot: Number,
};

const tourSchema = new mongoose.Schema(schema);
const Tour = mongoose.model("Tour", tourSchema);

module.exports.schema = schema;
module.exports = Tour;
