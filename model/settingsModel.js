const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "restaurant_settings",
      unique: true,
    },

    restaurantName: {
      type: String,
      required: true,
    },

    cuisineType: {
      type: String,
      required: true,
    },

    address: {
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

    logo: {
      type: String,
      default: "",
    },

    theme: {
      primaryColor: {
        type: String,
        default: "#ff5722",
      },
      secondaryColor: {
        type: String,
        default: "#ffffff",
      },
    },

    roles: [
      {
        roleName: String,
        permissions: [String],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingsSchema);