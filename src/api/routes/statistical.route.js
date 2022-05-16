const router = require("express").Router();
const statisticalController = require("../controllers/statistical.route");

router.get("/", statisticalController.index);

module.exports = router;
