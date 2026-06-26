const reservations = require("../model/reservationModel");


// ======================================
// Create Reservation
// ======================================
exports.createReservationController = async (req, res) => {

  try {

    const userId = req.userId;

    const {
      customerName,
      phone,
      email,
      reservationDate,
      reservationTime,
      guestCount,
      specialRequest,
    } = req.body;

    const newReservation = new reservations({
      userId,
      customerName,
      phone,
      email,
      reservationDate,
      reservationTime,
      guestCount,
      specialRequest,
    });

    await newReservation.save();

    res.status(201).json(newReservation);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get All Reservations
// ======================================
exports.getAllReservationsController = async (req, res) => {

  try {

    const allReservations = await reservations.find();

    res.status(200).json(allReservations);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Logged-in User Reservations
// ======================================
exports.getUserReservationsController = async (req, res) => {

  try {

    const userId = req.userId;

    const userReservations = await reservations.find({ userId });

    res.status(200).json(userReservations);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Single Reservation
// ======================================
exports.getSingleReservationController = async (req, res) => {

  try {

    const { id } = req.params;

    const reservation = await reservations.findById(id);

    res.status(200).json(reservation);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Update Reservation
// ======================================
exports.updateReservationController = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      reservationDate,
      reservationTime,
      guestCount,
      specialRequest,
    } = req.body;

    const updatedReservation = await reservations.findByIdAndUpdate(
      id,
      {
        reservationDate,
        reservationTime,
        guestCount,
        specialRequest,
      },
      { new: true }
    );

    res.status(200).json(updatedReservation);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Confirm Reservation (Admin)
// ======================================
exports.confirmReservationController = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedReservation = await reservations.findByIdAndUpdate(
      id,
      { reservationStatus: "Confirmed" },
      { new: true }
    );

    res.status(200).json(updatedReservation);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Mark Reservation as Arrived (Admin)
// ======================================
exports.markArrivedController = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedReservation = await reservations.findByIdAndUpdate(
      id,
      { reservationStatus: "Arrived" },
      { new: true }
    );

    res.status(200).json(updatedReservation);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Cancel Reservation
// ======================================
exports.cancelReservationController = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedReservation = await reservations.findByIdAndUpdate(
      id,
      { reservationStatus: "Cancelled" },
      { new: true }
    );

    res.status(200).json(updatedReservation);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Available Slots
// ======================================
exports.getAvailableSlotsController = async (req, res) => {

  try {

    const slots = [
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM",
      "09:00 PM",
    ];

    res.status(200).json(slots);

  } catch (err) {

    res.status(500).json(err);

  }

};