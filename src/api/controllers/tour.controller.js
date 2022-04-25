const Tour = require("../../models/tour.model");
const Booking = require("../../models/booking.model");

module.exports.getTours = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);

  const tours = await Tour.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Tour.find().count();

  res.status(200).send({
    data: tours,
    pagination: {
      page,
      limit,
      total,
    },
  });
};

module.exports.getTourById = async (req, res) => {
  const { tourId } = req.params;
  const tour = await Tour.findOne({
    _id: tourId,
  });

  res.status(200).send({ data: tour });
};

module.exports.createBooking = async (req, res) => {
  await Booking.insertMany({
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(200).send("Booking successfully");
};

module.exports.getBooking = async (req, res) => {
  const bookings = await Booking.find();

  res.status(200).send({ data: bookings });
};
