const mongoose = require("mongoose");

const StatisticSchema = new mongoose.Schema({
  month: Number,
  total: Number,
});

const StatisticalSchema = new mongoose.Schema({
  year: Number,
  statistics: {
    type: [StatisticSchema],
  },
});

const Statistical = mongoose.model("statistical", StatisticalSchema);

module.exports = Statistical;
