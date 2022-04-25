const router = require("express").Router();
const tourController = require("../controllers/tour.controller");

router.get("", tourController.getTours);

router.get("/:tourId", tourController.getTourById);

router.get("/booking", tourController.getBooking);

router.post("/booking", tourController.createBooking);

module.exports = router;
