const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    cardHolderName: {
      type: String,
      required: true,
    },

    cardNumber: {
      type: String,
      required: true,
    },

    expiryMonth: {
      type: String,
      required: true,
    },

    expiryYear: {
      type: String,
      required: true,
    },

    cvv: {
      type: String,
      required: true,
    },

    cardType: {
      type: String,
      enum: ["Visa", "MasterCard", "RuPay"],
      required: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const payments = mongoose.model("payment", paymentSchema);

module.exports = payments;