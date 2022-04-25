const router = require("express").Router();
const billController = require("../controllers/bill.controller");

router.get("/", billController.getBill);

router.get("/:billId", billController.getBillById);

router.post("/", billController.createBill);

router.put("/:billId", billController.updateBill);

router.delete("/:billId", billController.deleteBill);

module.exports = router;
