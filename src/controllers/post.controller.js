const cloudinary = require("cloudinary").v2;
const shortid = require("shortid");

const Post = require("../models/post.model");
const Notification = require("../models/notification.model");

module.exports.create = async (req, res) => {
  const urls = [];
  const {
    caption,
    type,
    userId,
    files,
    time,
    address,
    status,
    avatar,
    username
  } = req.body;

  // check if files is an array
  if (files && typeof files === "object") {
    for (const file of files) {
      const { url } = await cloudinary.uploader.upload(file);
      urls.push(url);
    }
  }

  // if files is a string
  else if (files) {
    const { url } = await cloudinary.uploader.upload(files);
    urls.push(url);
  }

  const newPost = {
    postId: shortid.generate(),
    userId,
    avatar,
    username,
    images: urls,
    caption,
    address,
    typeGoods: type,
    comments: [],
    likes: [],
    time,
    status
  };

  await Post.insertMany(newPost);

  res.status(200).send({ newPost });
};

module.exports.handleLike = async (req, res) => {
  const { sender, viewer, postId, type } = req.body;
  const newNotification = {
    sender,
    viewer,
    postId,
    type,
    isRead: false,
    time: new Date()
  };

  // handle like
  if (type === "unlike") {
    await Post.updateOne(
      { postId: postId },
      {
        $pull: {
          likes: sender
        }
      }
    );
    await Notification.deleteMany({
      $and: [{ postId: postId }, { sender: sender }]
    });
  } else {
    await Post.updateOne(
      { postId: postId },
      {
        $push: {
          likes: sender
        }
      }
    );

    if (sender !== viewer) {
      await Notification.insertMany(newNotification);
    }
  }

  //find index of post
  const newPosts = await Post.find().sort({ _id: -1 });
  const indexPost = newPosts.findIndex((post) => post.postId === postId);

  // get data to send client
  const newNotifications = await Notification.find().sort({ _id: -1 });
  const newPost = await Post.findOne({ postId: postId });

  res.status(200).send({ newPost, newNotifications, indexPost });
};

module.exports.handleComment = async (req, res) => {
  const { sender, viewer, avatar, postId, content, time, type } = req.body;

  const newNotification = {
    sender,
    viewer,
    postId,
    type,
    isRead: false,
    time: new Date()
  };

  if (sender !== viewer) {
    await Notification.insertMany(newNotification);
  }

  await Post.updateOne(
    { postId: postId },
    {
      $push: {
        comments: {
          username: sender,
          avatar,
          content,
          time
        }
      }
    }
  );

  // find Index of post
  const newPosts = await Post.find().sort({ _id: -1 });
  const indexPost = newPosts.findIndex((post) => post.postId === postId);

  const newNotifications = await Notification.find().sort({ _id: -1 });
  const newPost = await Post.findOne({ postId: postId });

  res.status(200).send({ newPost, newNotifications, indexPost });
};

module.exports.handleFilter = async (req, res) => {
  const { type } = req.body;

  if (type === "all") {
    const postsFiltered = await Post.find().sort({ _id: -1 });
    res.status(200).send({ postsFiltered });
    return;
  }

  const postsFiltered = await Post.find({ typeGoods: type }).sort({ _id: -1 });

  res.status(200).send({ postsFiltered });
};

module.exports.filterType = async (req, res) => {
  const { type } = req.params;

  if (type === "all") {
    const postsFiltered = await Post.find().sort({ _id: -1 });
    res.status(200).send({ postsFiltered });
    return;
  }

  const postsFiltered = await Post.find({ typeGoods: type }).sort({ _id: -1 });

  res.status(200).send({ postsFiltered });
};
