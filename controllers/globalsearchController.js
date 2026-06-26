const menus = require("../model/menuModal");
const orders = require("../model/orderModel");
const reservations = require("../model/reservationModel");
const staffs = require("../model/staffModel");


// ======================================
// Global Search
// ======================================
exports.globalSearchController = async (req, res) => {

  try {

    const searchKey = req.query.search || "";

    const menuResult = await menus.find({
      foodName: {
        $regex: searchKey,
        $options: "i",
      },
    });

    const orderResult = await orders.find({
      orderStatus: {
        $regex: searchKey,
        $options: "i",
      },
    });

    const reservationResult = await reservations.find({
      customerName: {
        $regex: searchKey,
        $options: "i",
      },
    });

    const staffResult = await staffs.find({
      employeeName: {
        $regex: searchKey,
        $options: "i",
      },
    });

    res.status(200).json({
      menu: menuResult,
      orders: orderResult,
      reservations: reservationResult,
      staff: staffResult,
    });

  } catch (err) {

    res.status(500).json(err);

  }

};