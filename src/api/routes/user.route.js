const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "src/public/uploads/" });

const apiUserController = require("../controllers/user.controller");

router.get("/:id", apiUserController.getUser);

router.put("/:userId", upload.array("photos", 6), apiUserController.updateUser);

module.exports = router;
