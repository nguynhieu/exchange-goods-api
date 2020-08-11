const Post = require("../../models/post.model");

module.exports.index = async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
};
