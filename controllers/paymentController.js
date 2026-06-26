const payments = require("../model/paymentModel");

// ======================================
// Add Payment Card
// ======================================
exports.addCardController = async (req, res) => {

  try {

    const userId = req.userId;

    const {
      cardHolderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      cardType,
    } = req.body;

    const newCard = new payments({
      userId,
      cardHolderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      cardType,
    });

    await newCard.save();

    res.status(201).json(newCard);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get User Cards
// ======================================
exports.getCardsController = async (req, res) => {

  try {

    const userId = req.userId;

    const cards = await payments.find({ userId });

    res.status(200).json(cards);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Payment Methods
// ======================================
exports.getPaymentMethodsController = async (req, res) => {

  try {

    const methods = [
      "Cash On Delivery",
      "UPI",
      "Credit Card",
      "Debit Card",
      "Net Banking"
    ];

    res.status(200).json(methods);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Delete Card
// ======================================
exports.deleteCardController = async (req, res) => {

  try {

    const { id } = req.params;

    await payments.findByIdAndDelete(id);

    res.status(200).json("Card deleted successfully");

  } catch (err) {

    res.status(500).json(err);

  }

};