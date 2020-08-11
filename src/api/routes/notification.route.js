const router = require("express").Router();
const apiNotificationController = require("../controllers/notification.controller");

router.get("/", apiNotificationController.index);

module.exports = router;
