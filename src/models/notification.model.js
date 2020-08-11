const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  sender: String,
  viewer: String,
  postId: String,
  time: String,
  isRead: Boolean,
  type: String // Like, comment
});
const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
