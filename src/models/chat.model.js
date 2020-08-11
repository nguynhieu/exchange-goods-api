const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  authorName: String,
  authorId: String,
  avatar: String,
  content: String,
  isRead: Boolean,
  time: String
});
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
