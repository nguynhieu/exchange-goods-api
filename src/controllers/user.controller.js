const User = require("../models/user.model");

module.exports.addWishlist = async (req, res) => {
  const { wishlist, user } = req.body;
  await User.updateOne(
    {
      _id: user._id,
    },
    {
      $push: {
        myWishList: wishlist,
      },
    }
  );

  const userAfterAdd = await User.findOne({ _id: user._id });
  res.status(200).send({ userAfterAdd });
};

module.exports.deleteItem = async (req, res) => {
  const { wishlist, user } = req.body;

  await User.updateOne(
    {
      _id: user._id,
    },
    {
      $set: {
        myWishList: wishlist,
      },
    }
  );

  const userAfterUpdate = await User.findOne({
    _id: user._id,
  });
  res.status(200).send({ userAfterUpdate });
};
