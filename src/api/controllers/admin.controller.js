const cloudinary = require("cloudinary").v2;

const User = require("../../models/user.model");
const Tour = require("../../models/tour.model");
const Banner = require("../../models/banner.model");

module.exports.getUser = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);

  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await User.find().count();

  res.status(200).send({
    data: users,
    pagination: {
      page,
      limit,
      total,
    },
  });
};

module.exports.getUserById = async (req, res) => {
  const user = await User.findOne({
    _id: req.params.userId,
  });

  res.status(200).send({
    data: user,
  });
};

module.exports.updateUser = async (req, res) => {
  await User.updateOne(
    {
      _id: req.params.userId,
    },
    {
      ...req.body,
      updatedAt: new Date(),
    }
  );

  res.status(200).send("Cap nhap thanh cong!");
};

module.exports.deleteUser = async (req, res) => {
  await User.deleteOne({
    _id: req.params.userId,
  });

  res.status(200).send("Xóa thành công!");
};

module.exports.createTour = async (req, res) => {
  const urls = [];
  const { files } = req.body;

  // check if files is an array
  if (files && typeof files === "object") {
    for (const file of files) {
      const { url } = await cloudinary.uploader.upload(file.path);
      urls.push(url);
    }
  }
  // if files is a string
  else if (files) {
    const { url } = await cloudinary.uploader.upload(files);
    urls.push(url);
  }

  await Tour.insertMany({
    ...req.body,
    images: urls,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(200).send("Tạo thành công!");
};

module.exports.updateTour = async (req, res) => {
  const { tourId } = req.params;
  const urls = [];
  const { files } = req;

  // check if files is an array
  if (files && typeof files === "object") {
    for (const file of files) {
      const { url } = await cloudinary.uploader.upload(file.path);
      urls.push(url);
    }
  }
  // if files is a string
  else if (files) {
    const { url } = await cloudinary.uploader.upload(files);
    urls.push(url);
  }

  await Tour.updateOne(
    {
      _id: tourId,
    },
    {
      ...req.body,
      ...(urls.length ? { images: urls } : {}),
      updatedAt: new Date(),
    }
  );

  res.status(200).send("Cập nhập thành công!");
};

module.exports.deleteTour = async (req, res) => {
  const { tourId } = req.params;
  await Tour.deleteOne({
    _id: tourId,
  });

  res.status(200).send("Xóa thành công!");
};

module.exports.createBanner = async (req, res) => {
  const urls = [];
  const { files } = req;

  // check if files is an array
  if (files && typeof files === "object") {
    for (const file of files) {
      const { url } = await cloudinary.uploader.upload(file.path);
      urls.push(url);
    }
  }
  // if files is a string
  else if (files) {
    const { url } = await cloudinary.uploader.upload(files);
    urls.push(url);
  }

  await Banner.insertMany({
    ...req.body,
    images: urls,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(200).send("Tạo thành công!");
};

module.exports.updateBanner = async (req, res) => {
  const { bannerId } = req.params;

  const urls = [];
  const { files } = req;

  // check if files is an array
  if (files && typeof files === "object") {
    for (const file of files) {
      const { url } = await cloudinary.uploader.upload(file.path);
      urls.push(url);
    }
  }
  // if files is a string
  else if (files) {
    const { url } = await cloudinary.uploader.upload(files);
    urls.push(url);
  }

  await Banner.updateOne(
    {
      _id: bannerId,
    },
    {
      ...req.body,
      ...(urls.length ? { images: urls } : {}),
      updatedAt: new Date(),
    }
  );

  res.status(200).send("Cập nhập thành công!");
};

module.exports.deleteBanner = async (req, res) => {
  const { bannerId } = req.params;

  await Banner.deleteOne({
    _id: bannerId,
  });

  res.status(200).send("Xóa thành công!");
};
