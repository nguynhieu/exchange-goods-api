const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "src/public/uploads/" });

const adminController = require("../controllers/admin.controller");

router.get("/user", adminController.getUser);

router.get("/user/:userId", adminController.getUserById);

router.put("/user/:userId", adminController.updateUser);

router.delete("/user/:userId", adminController.deleteUser);

router.post("/tour", upload.array("photos", 6), adminController.createTour);

router.put(
  "/tour/:tourId",
  upload.array("photos", 6),
  adminController.updateTour
);

router.delete("/tour/:tourId", adminController.deleteTour);

router.post("/banner", upload.array("photos", 6), adminController.createBanner);

router.put(
  "/banner/:bannerId",
  upload.array("photos", 6),
  adminController.updateBanner
);

router.delete("/banner/:bannerId", adminController.deleteBanner);

module.exports = router;
