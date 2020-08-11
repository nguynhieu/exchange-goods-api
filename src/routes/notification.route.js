const router = require("express").Router();

const notificationController = require("../controllers/notification.controller");

router.post("/update-notification", notificationController.updateNotification);

module.exports = router;
