const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const menus = mongoose.model("menu", menuSchema);

module.exports = menus;