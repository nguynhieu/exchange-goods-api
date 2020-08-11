const Notification = require("../models/notification.model");

module.exports.updateNotification = async (req, res) => {
  const { viewer } = req.body;

  await Notification.updateMany(
    {
      viewer: viewer
    },
    [
      {
        $set: {
          isRead: true
        }
      }
    ]
  );

  const notifications = await Notification.find().sort({ _id: -1 });

  res.status(200).send({ notifications });
};
