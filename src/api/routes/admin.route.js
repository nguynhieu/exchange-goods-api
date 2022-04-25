const router = require("express").Router();

const adminController = require("../controllers/admin.controller");

router.post("/register", adminController.register);

router.post("/login", adminController.login);

router.post("/tour", adminController.createTour);

router.put("/tour/:tourId", adminController.updateTour);

router.delete("/tour/:tourId", adminController.deleteTour);

router.post("/banner", adminController.createBanner);

router.put("/banner/:bannerId", adminController.updateBanner);

router.delete("/banner/:bannerId", adminController.deleteBanner);

module.exports = router;
