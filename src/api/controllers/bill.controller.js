const Bill = require("../../models/bill.model");

const BILL_STATUSES = ["PAID", "UNPAID"];

module.exports.getBill = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);

  const bills = await Bill.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Bill.find().count();

  res.status(200).send({
    data: bills,
    pagination: {
      page,
      limit,
      total,
    },
  });
};

module.exports.createBill = async (req, res) => {
  await Bill.insertMany({
    ...req.body,
    status: BILL_STATUSES[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(200).send("Tạo thành công!");
};

module.exports.updateBill = async (req, res) => {
  const { billId } = req.params;

  if (!BILL_STATUSES.includes(req.body.status?.toUpperCase())) {
    return res.status(400).send("Status không hợp lệ!");
  }

  await Bill.updateOne(
    {
      _id: billId,
    },
    { ...req.body, updatedAt: new Date() }
  );

  res.status(200).send("Cập nhập thành công!");
};

module.exports.deleteBill = async (req, res) => {
  const { billId } = req.params;
  await Bill.deleteOne({
    _id: billId,
  });

  res.status(200).send("Xóa thành công!");
};

module.exports.getBillById = async (req, res) => {
  const { billId } = req.params;
  const bill = await Bill.findOne({
    _id: billId,
  });

  res.status(200).send({ data: bill });
};
