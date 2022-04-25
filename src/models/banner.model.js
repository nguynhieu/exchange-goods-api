const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image: String,
  title: String,
  updatedAt: Date,
  createdAt: Date,
});
const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
