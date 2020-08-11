const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "src/public/uploads/" });

const postController = require("../controllers/post.controller");

router.post("/", upload.array("photos", 6), postController.create);

router.post("/like", postController.handleLike);

router.post("/comment", postController.handleComment);

router.post("/filter", postController.handleFilter);

router.get("/:type", postController.filterType);

module.exports = router;
