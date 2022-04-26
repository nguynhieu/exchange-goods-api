const router = require("express").Router();

const apiUserController = require("../controllers/user.controller");

router.get("/:id", apiUserController.getUser);

module.exports = router;
