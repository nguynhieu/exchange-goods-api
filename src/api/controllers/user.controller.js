const User = require("../../models/user.model");
const Post = require("../../models/post.model");
const multer = require("multer");
const upload = multer({ dest: "src/public/uploads/" });
const cloudinary = require("cloudinary").v2;

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

module.exports.updateUser = async (req, res) => {
  const urls = [];
  const { files } = req;
  const hasBlockField = typeof req.body.isBlocked !== "undefined";

  // check if files is an array
  if (files && typeof files === "object") {
    for (const file of files) {
      const { url } = await cloudinary.uploader.upload(file.path);
      urls.push(url);
    }
  }
  // if files is a string
  else if (files) {
    const { url } = await cloudinary.uploader.upload(files);
    urls.push(url);
  }

  if (hasBlockField) {
    return res.status(403).send("Forbidden");
  }

  await User.updateOne(
    {
      _id: req.params.userId,
    },
    {
      ...req.body,
      avatar: urls[0],
      updatedAt: new Date(),
    }
  );

  res.status(200).send("Cap nhap thanh cong!");
};
