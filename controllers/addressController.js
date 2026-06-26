const addresses = require("../model/addressModel");

// ======================================
// Add Address
// ======================================
exports.addAddressController = async (req, res) => {
  try {

    const userId = req.userId;

    const {
      fullName,
      phone,
      houseName,
      street,
      city,
      state,
      pincode,
    } = req.body;

    const newAddress = new addresses({
      userId,
      fullName,
      phone,
      houseName,
      street,
      city,
      state,
      pincode,
    });

    await newAddress.save();

    res.status(201).json(newAddress);

  } catch (err) {
    res.status(500).json(err);
  }
};


// ======================================
// Get User Addresses
// ======================================
exports.getUserAddressesController = async (req, res) => {
  try {

    const userId = req.userId;

    const userAddresses = await addresses.find({ userId });

    res.status(200).json(userAddresses);

  } catch (err) {
    res.status(500).json(err);
  }
};


// ======================================
// Get Single Address
// ======================================
exports.getSingleAddressController = async (req, res) => {
  try {

    const { id } = req.params;

    const address = await addresses.findById(id);

    res.status(200).json(address);

  } catch (err) {
    res.status(500).json(err);
  }
};


// ======================================
// Update Address
// ======================================
exports.updateAddressController = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedAddress = await addresses.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedAddress);

  } catch (err) {
    res.status(500).json(err);
  }
};


// ======================================
// Delete Address
// ======================================
exports.deleteAddressController = async (req, res) => {
  try {

    const { id } = req.params;

    await addresses.findByIdAndDelete(id);

    res.status(200).json("Address deleted successfully");

  } catch (err) {
    res.status(500).json(err);
  }
};