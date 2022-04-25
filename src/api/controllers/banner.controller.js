const Banner = require("../../models/banner.model");

module.exports.getBanner = async (req, res) => {
  const banner = await Banner.findOne();

  res.status(200).send({ data: banner });
};
