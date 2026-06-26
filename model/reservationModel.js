const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    reservationDate: {
      type: String,
      required: true,
    },

    reservationTime: {
      type: String,
      required: true,
    },

    guestCount: {
      type: Number,
      required: true,
    },

    tableNumber: {
      type: Number,
      default: null,
    },

    specialRequest: {
      type: String,
      default: "",
    },

    reservationStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Arrived", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const reservations = mongoose.model("reservation", reservationSchema);

module.exports = reservations;