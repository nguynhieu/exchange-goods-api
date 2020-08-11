const express = require("express");
const router = express.Router();

const apiPostController = require("../controllers/post.controller");

router.get("/", apiPostController.index);

module.exports = router;
