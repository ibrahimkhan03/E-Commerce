const Address = require("../models/addressModel");

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch addresses", err });
  }
};

exports.addOrUpdateAddress = async (req, res) => {
  const { userId, _id, ...rest } = req.body;
  try {
    let address;
    if (_id) {
      address = await Address.findByIdAndUpdate(_id, rest, { new: true });
    } else {
      address = await new Address({ userId, ...rest }).save();
    }

    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Failed to save address", err });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.body;
    await Address.findOneAndDelete({ _id: addressId, userId });
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete address", err });
  }
};
