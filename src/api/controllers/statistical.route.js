const Statistical = require("../../models/statistical.model");

module.exports.index = async (req, res) => {
  const statistics = await Statistical.find().sort({ _id: -1 });
  res.json({ data: statistics });
};
