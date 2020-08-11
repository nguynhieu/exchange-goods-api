const Chat = require("../models/chat.model");

module.exports.handleChat = async (req, res) => {
  const { authorName, authorId, avatar, content, isRead, time } = req.body;

  const chat = {
    authorName,
    authorId,
    avatar,
    content,
    isRead,
    time
  };

  await Chat.insertMany(chat);

  res.status(200).send({ chat });
};

module.exports.setReadChat = async (req, res) => {
  await Chat.updateMany({}, [
    {
      $set: {
        isRead: true
      }
    }
  ]);

  const chats = await Chat.find().sort({ _id: -1 });

  res.status(200).send({ chats });
};
