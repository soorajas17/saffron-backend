const reviews = require("../model/reviewModel");


// ======================================
// Add Review
// ======================================
exports.addReviewController = async (req, res) => {

  try {

    const userId = req.userId;

    const { menuId, userName, rating, comment } = req.body;

    const newReview = new reviews({
      userId,
      menuId,
      userName,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json(newReview);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get All Reviews
// ======================================
exports.getAllReviewsController = async (req, res) => {

  try {

    const allReviews = await reviews.find();

    res.status(200).json(allReviews);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Single Review
// ======================================
exports.getSingleReviewController = async (req, res) => {

  try {

    const { id } = req.params;

    const review = await reviews.findById(id);

    res.status(200).json(review);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Reviews By Menu Item
// ======================================
exports.getMenuReviewsController = async (req, res) => {

  try {

    const { menuId } = req.params;

    const menuReviews = await reviews.find({ menuId });

    res.status(200).json(menuReviews);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Logged-in User Reviews
// ======================================
exports.getUserReviewsController = async (req, res) => {

  try {

    const userId = req.userId;

    const userReviews = await reviews.find({ userId });

    res.status(200).json(userReviews);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Update Review
// ======================================
exports.updateReviewController = async (req, res) => {

  try {

    const { id } = req.params;

    const { rating, comment } = req.body;

    const updatedReview = await reviews.findByIdAndUpdate(
      id,
      {
        rating,
        comment,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedReview);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Delete Review
// ======================================
exports.deleteReviewController = async (req, res) => {

  try {

    const { id } = req.params;

    await reviews.findByIdAndDelete(id);

    res.status(200).json("Review deleted successfully");

  } catch (err) {

    res.status(500).json(err);

  }

};