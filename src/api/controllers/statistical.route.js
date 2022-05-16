const Statistical = require("../../models/statistical.model");

const generateStatistical = (year, month) => {
  const months = Array.from(Array(12).keys());

  return {
    year,
    statistics: months.map((m) => ({
      month: m,
      total: m === month ? 1 : 0,
    })),
  };
};

module.exports.index = async (req, res) => {
  const { year } = req.query;

  const statistics = await Statistical.findOne(year ? { year } : {}).sort({
    _id: -1,
  });

  if (statistics.length === 0) {
    return res.json(generateStatistical(year));
  }

  res.json(statistics);
};
