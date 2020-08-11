const router = require("express").Router();

const chatController = require("../controllers/chat.controller");

router.post("/handleChat", chatController.handleChat);

router.post("/setReadChat", chatController.setReadChat);

module.exports = router;
