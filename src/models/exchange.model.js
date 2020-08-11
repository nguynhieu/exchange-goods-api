const mongoose = require("mongoose");
const exchangeSchema = new mongoose.Schema({
  sender: String,
  senderId: String,
  viewer: String,
  viewerId: String,
  addressSender: String,
  addressViewer: String,
  senderPostId: String,
  viewerPostId: String,
  isRead: Boolean,
  status: String, // WAITING, DECLINED, ACCEPTED, SUCCESS (admin handle), FAILED (admin handle)
  reasonCancel: String, // when FAILED
  time: String
});
const Exchange = mongoose.model("Exchange", exchangeSchema);

module.exports = Exchange;
