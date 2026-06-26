const settings = require("../model/settingsModel");


// ======================================
// Get Restaurant Profile
// ======================================
exports.getRestaurantProfileController = async (req, res) => {

  try {

    const profile = await settings.findOne();

    res.status(200).json(profile);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Update Restaurant Profile
// ======================================
exports.updateRestaurantProfileController = async (req, res) => {

  try {

    const updatedProfile = await settings.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json(updatedProfile);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Upload Logo
// ======================================
exports.uploadLogoController = async (req, res) => {

  try {

    const logo = req.file.filename;

    const updatedProfile = await settings.findOneAndUpdate(
      {},
      { logo },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedProfile);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Theme Settings
// ======================================
exports.getThemeController = async (req, res) => {

  try {

    const theme = await settings.findOne({}, { theme: 1 });

    res.status(200).json(theme);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Save Settings
// ======================================
exports.saveSettingsController = async (req, res) => {

  try {

    const updatedSettings = await settings.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get User Roles
// ======================================
exports.getRolesController = async (req, res) => {

  try {

    const roles = await settings.findOne({}, { roles: 1 });

    res.status(200).json(roles);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Update User Roles
// ======================================
exports.updateRolesController = async (req, res) => {

  try {

    const { roles } = req.body;

    const updatedRoles = await settings.findOneAndUpdate(
      {},
      { roles },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedRoles);

  } catch (err) {

    res.status(500).json(err);

  }

};