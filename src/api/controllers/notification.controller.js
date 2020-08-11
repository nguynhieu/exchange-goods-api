const Notification = require("../../models/notification.model");

module.exports.index = async (req, res) => {
  const notifications = await Notification.find().sort({ _id: -1 });

  res.json({ notifications });
};
