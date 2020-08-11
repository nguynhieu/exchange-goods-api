const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  postId: String,
  userId: String,
  avatar: String,
  username: String,
  images: [],
  caption: String,
  typeGoods: [],
  address: String,
  comments: [],
  likes: [],
  time: String,
  status: String // WAITING, PENDING, REJECT, RESOVLE
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
