const Banner = require("../../models/banner.model");

module.exports.getBanner = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);

  const banners = await Banner.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Banner.find().count();

  res.status(200).send({
    data: banners,
    pagination: {
      page,
      limit,
      total,
    },
  });
};

module.exports.getBannerById = async (req, res) => {
  const { bannerId } = req.params;

  const banner = await Banner.findOne({
    _id: bannerId,
  });

  res.status(200).send({ data: banner });
};
