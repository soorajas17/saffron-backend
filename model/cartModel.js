const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    menuId: {
      type: String,
      required: true,
    },

    foodName: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    subtotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const carts = mongoose.model("cart", cartSchema);

module.exports = carts;