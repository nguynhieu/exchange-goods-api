const User = require("../../models/user.model");
const Post = require("../../models/post.model");

module.exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return res.sendStatus(404);
  }

  // find posts of user
  const posts = await Post.find({
    userId: user._id,
  }).sort({ _id: -1 });

  res.status(200).send({ user, posts });
};
