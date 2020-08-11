const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/add-wishlist", userController.addWishlist);

router.post("/deleteItem", userController.deleteItem);

module.exports = router;
