const router = require("express").Router();
const bannerController = require("../controllers/banner.controller");

router.get("/", bannerController.getBanner);

router.get("/:bannerId", bannerController.getBannerById);

module.exports = router;
