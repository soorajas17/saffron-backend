const orders = require("../model/orderModel");
const reservations = require("../model/reservationModel");


// ======================================
// Get Dashboard Metrics
// ======================================
exports.getDashboardMetricsController = async (req, res) => {

  try {

    const totalOrders = await orders.countDocuments();

    const totalReservations = await reservations.countDocuments();

    const allOrders = await orders.find();

    const totalRevenue = allOrders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );

    res.status(200).json({
      totalOrders,
      totalReservations,
      totalRevenue,
    });

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Live Orders
// ======================================
exports.getLiveOrdersController = async (req, res) => {

  try {

    const liveOrders = await orders.find().sort({ createdAt: -1 });

    res.status(200).json(liveOrders);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Weekly Revenue
// ======================================
exports.getWeeklyRevenueController = async (req, res) => {

  try {

    const allOrders = await orders.find();

    const totalRevenue = allOrders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );

    res.status(200).json({
      weeklyRevenue: totalRevenue,
    });

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Upcoming Reservations
// ======================================
exports.getUpcomingReservationsController = async (req, res) => {

  try {

    const reservationList = await reservations.find({
      reservationStatus: "Confirmed",
    });

    res.status(200).json(reservationList);

  } catch (err) {

    res.status(500).json(err);

  }

};