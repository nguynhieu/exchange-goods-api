const Exchange = require("../models/exchange.model");

module.exports.index = async (req, res) => {
  const exchanges = await Exchange.find().sort({ _id: -1 });

  res.status(200).send({ exchanges });
};

module.exports.exchangeHandle = async (req, res) => {
  const {
    sender,
    senderId,
    viewer,
    viewerId,
    senderPostId,
    viewerPostId,
    address,
    time
  } = req.body;

  const exchange = {
    sender,
    senderId,
    viewer,
    viewerId,
    senderPostId,
    viewerPostId,
    senderAddress: address,
    isRead: false,
    status: "WAITING",
    time
  };

  await Exchange.insertMany(exchange);

  res.status(200).send(exchange);
};

module.exports.updateRead = async (req, res) => {
  await Exchange.updateMany({ viewer: req.body.viewer }, [
    {
      $set: {
        isRead: true
      }
    }
  ]);

  const exchanges = await Exchange.find().sort({ _id: -1 });

  res.status(200).send({ exchanges });
};

module.exports.acceptExchange = async (req, res) => {
  const { exchangeData, addressViewer } = req.body;

  await Exchange.updateOne({ _id: exchangeData._id }, [
    {
      $set: {
        addressViewer,
        status: "ACCEPTED"
      }
    }
  ]);

  const exchanges = await Exchange.find().sort({ _id: -1 });

  res.status(200).send({ exchanges });
};

module.exports.declineExchange = async (req, res) => {
  const { exchangeData } = req.body;

  await Exchange.deleteOne({ _id: exchangeData._id });

  const exchanges = await Exchange.find().sort({ _id: -1 });

  res.status(200).send({ exchanges });
};

module.exports.adminAccept = async (req, res) => {
  const { exchangeData } = req.body;

  await Exchange.updateOne({ _id: exchangeData._id }, [
    {
      $set: {
        status: "SUCCESS"
      }
    }
  ]);

  const exchanges = await Exchange.find().sort({ _id: -1 });

  res.status(200).send({ exchanges });
};

module.exports.adminDecline = async (req, res) => {
  const { exchangeData, reasonCancel } = req.body;

  await Exchange.updateOne({ _id: exchangeData._id }, [
    {
      $set: {
        status: "FAILED",
        reasonCancel
      }
    }
  ]);

  const exchanges = await Exchange.find().sort({ _id: -1 });

  res.status(200).send({ exchanges });
};
