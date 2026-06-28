const settings = require("../model/settingsModel");

const SETTINGS_KEY = "restaurant_settings";


// ===============================
// Get Profile
// ===============================
exports.getRestaurantProfileController = async (req, res) => {
  try {
    const profile = await settings.findOne({ key: SETTINGS_KEY });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ===============================
// Update Profile (SAFE)
// ===============================
exports.updateRestaurantProfileController = async (req, res) => {
  try {
    const allowedUpdates = {
      restaurantName: req.body.restaurantName,
      cuisineType: req.body.cuisineType,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
    };

    const updated = await settings.findOneAndUpdate(
      { key: SETTINGS_KEY },
      { $set: allowedUpdates },
      { new: true, upsert: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ===============================
// Upload Logo
// ===============================
exports.uploadLogoController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updated = await settings.findOneAndUpdate(
      { key: SETTINGS_KEY },
      { logo: req.file.filename },
      { new: true, upsert: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ===============================
// Get Theme
// ===============================
exports.getThemeController = async (req, res) => {
  try {
    const data = await settings.findOne(
      { key: SETTINGS_KEY },
      { theme: 1 }
    );

    res.status(200).json(data?.theme || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ===============================
// Save Settings (FULL UPDATE SAFE)
// ===============================
exports.saveSettingsController = async (req, res) => {
  try {
    const updated = await settings.findOneAndUpdate(
      { key: SETTINGS_KEY },
      { $set: req.body },
      { new: true, upsert: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ===============================
// Get Roles
// ===============================
exports.getRolesController = async (req, res) => {
  try {
    const data = await settings.findOne(
      { key: SETTINGS_KEY },
      { roles: 1 }
    );

    res.status(200).json(data?.roles || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ===============================
// Update Roles (FIXED)
// ===============================
exports.updateRolesController = async (req, res) => {
  try {
    const { roles } = req.body;

    const updated = await settings.findOneAndUpdate(
      { key: SETTINGS_KEY },
      { roles },
      { new: true, upsert: true }
    );

    res.status(200).json(updated.roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};