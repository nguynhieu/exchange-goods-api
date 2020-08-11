const router = require("express").Router();

const chatController = require("../controllers/chat.controller");

router.get("/", chatController.index);

module.exports = router;
