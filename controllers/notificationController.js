const notifications = require("../model/notificationModel");

// ======================================
// Create Notification
// ======================================
exports.createNotificationController = async (req, res) => {

  try {

    const { userId, title, message, type } = req.body;

    const newNotification = new notifications({
      userId,
      title,
      message,
      type,
    });

    await newNotification.save();

    res.status(201).json(newNotification);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get User Notifications
// ======================================
exports.getNotificationsController = async (req, res) => {

  try {

    const userId = req.userId;

    const allNotifications = await notifications.find({ userId });

    res.status(200).json(allNotifications);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Get Unread Notification Count
// ======================================
exports.getUnreadCountController = async (req, res) => {

  try {

    const userId = req.userId;

    const unreadCount = await notifications.countDocuments({
      userId,
      isRead: false,
    });

    res.status(200).json({ unreadCount });

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Mark Notification As Read
// ======================================
exports.markAsReadController = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedNotification = await notifications.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    res.status(200).json(updatedNotification);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ======================================
// Delete Notification
// ======================================
exports.deleteNotificationController = async (req, res) => {

  try {

    const { id } = req.params;

    await notifications.findByIdAndDelete(id);

    res.status(200).json("Notification deleted successfully");

  } catch (err) {

    res.status(500).json(err);

  }

};