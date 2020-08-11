const router = require("express").Router();

const exchangeController = require("../controllers/exchange.controller");

router.get("/", exchangeController.index);

router.post("/request-exchange", exchangeController.exchangeHandle);

router.post("/update-read", exchangeController.updateRead);

router.post("/accept-exchange", exchangeController.acceptExchange);

router.post("/decline-exchange", exchangeController.declineExchange);

router.post("/admin-accept", exchangeController.adminAccept);

router.post("/admin-decline", exchangeController.adminDecline);

module.exports = router;
