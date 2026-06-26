const staffs = require("../model/staffModel");


// ======================================
// Add Staff
// ======================================
exports.addStaffController = async (req, res) => {

  try {

    const {
      employeeName,
      employeeId,
      email,
      phone,
      role,
      department,
      shift,
    } = req.body;

    const existingStaff = await staffs.findOne({
      $or: [{ employeeId }, { email }],
    });

    if (existingStaff) {
      return res.status(406).json("Staff already exists");
    }

    const newStaff = new staffs({
      employeeName,
      employeeId,
      email,
      phone,
      role,
      department,
      shift,
    });

    await newStaff.save();

    res.status(201).json(newStaff);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get All Staff
// ======================================
exports.getStaffController = async (req, res) => {

  try {

    const allStaff = await staffs.find();

    res.status(200).json(allStaff);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Single Staff
// ======================================
exports.getSingleStaffController = async (req, res) => {

  try {

    const { id } = req.params;

    const staff = await staffs.findById(id);

    res.status(200).json(staff);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Update Staff
// ======================================
exports.updateStaffController = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedStaff = await staffs.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedStaff);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Deactivate Staff
// ======================================
exports.deactivateStaffController = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedStaff = await staffs.findByIdAndUpdate(
      id,
      { status: "Inactive" },
      { new: true }
    );

    res.status(200).json(updatedStaff);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Search Staff
// ======================================
exports.searchStaffController = async (req, res) => {

  try {

    const search = req.query.search || "";

    const result = await staffs.find({
      employeeName: {
        $regex: search,
        $options: "i",
      },
    });

    res.status(200).json(result);

  } catch (err) {

    res.status(500).json(err);

  }

};