const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  images: Array,
  title: String,
  description: String,
  updatedAt: Date,
  createdAt: Date,
});
const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
