const offers = require("../model/offerModel");

// ======================================
// Add Offer (Admin)
// ======================================
exports.addOfferController = async (req, res) => {

  try {

    const {
      title,
      description,
      discount,
      couponCode,
      startDate,
      endDate,
    } = req.body;
     const  offerimage= req.file.filename

    const existingOffer = await offers.findOne({ couponCode });

    if (existingOffer) {
      return res.status(406).json("Offer already exists");
    }

    const newOffer = new offers({
      title,
      description,
      discount,
      couponCode,
      startDate,
      endDate,
      offerimage
    });

    await newOffer.save();

    res.status(201).json(newOffer);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get All Offers
// ======================================
exports.getOffersController = async (req, res) => {

  try {

    const allOffers = await offers.find();

    res.status(200).json(allOffers);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Single Offer
// ======================================
exports.getSingleOfferController = async (req, res) => {

  try {

    const { id } = req.params;

    const offer = await offers.findById(id);

    if (!offer) {
      return res.status(404).json("Offer not found");
    }

    res.status(200).json(offer);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Update Offer
// ======================================
exports.updateOfferController = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedOffer = await offers.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedOffer);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Delete Offer
// ======================================
exports.deleteOfferController = async (req, res) => {

  try {

    const { id } = req.params;

    await offers.findByIdAndDelete(id);

    res.status(200).json("Offer deleted successfully");

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Apply Coupon
exports.applyCouponController = async (req, res) => {

  try {

    const {couponCode} = req.body;

    const offer = await offers.findOne({ couponCode });

    if (!offer) {
      return res.status(404).json("Invalid coupon code");
    }

    res.status(200).json({
      message: "Coupon applied successfully",
      offer,
    });

  } catch (err) {

    res.status(500).json(err);

  }

};