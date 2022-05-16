const Statistical = require("../../models/statistical.model");

module.exports.index = async (req, res) => {
  const { year } = req.query;

  const statistics = await Statistical.find(year ? { year } : {}).sort({
    _id: -1,
  });
  res.json({ data: statistics });
};
