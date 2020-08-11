const Chat = require("../../models/chat.model");

module.exports.index = async (req, res) => {
  const chat = await Chat.find().sort({ _id: -1 });

  res.status(200).send({ chat });
};
