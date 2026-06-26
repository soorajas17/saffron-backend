const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
     itemName: {
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

    menuPic: {
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