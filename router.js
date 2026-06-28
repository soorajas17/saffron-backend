const express = require('express')
const authController = require('./controllers/authController')
const menuController = require('./controllers/menuController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerMiddleware = require('./middleware/multerMiddleware')
const cartController = require('./controllers/cartController')
const orderController = require('./controllers/orderController')
const offerController = require("./controllers/offerController");
const reviewController = require("./controllers/reviewController");

const reservationController = require('./controllers/reservationController')
const addressController = require('./controllers/addressController')
const paymentController = require("./controllers/paymentController");
const notificationController = require("./controllers/notificationController");
const dashboardController = require("./controllers/dashboardController");
const staffController = require("./controllers/staffController");
const settingsController = require("./controllers/settingsController");

const searchController = require("./controllers/globalsearchController");
const { getProfileController } = require('./controllers/userController')


const router = new express.Router()

//register
router.post('/register',authController.addUserController)
//login
router.post('/login',authController.logincontroller)
// get all user
router.get("/all-users",jwtMiddleware,authController.getAllUserController)
// profile
router.get("/profile", jwtMiddleware,getProfileController)

//add menu item - admin -jwt
router.post('/add-menu',jwtMiddleware,multerMiddleware.single('menuPic'),menuController.addMenuItemController)
//get all menu item
router.get('/all-menu',menuController.getAllMenuItemsController)
//get single menu item
router.get('/menu/:id',menuController.getSingleMenuItemController)
//edit menu item-admin-jwt
router.put('/menu/:id/edit',jwtMiddleware,multerMiddleware.single('menuPic'),menuController.editMenuController)
//delete menu item -admin-jwt
router.delete('/menu/:id/delete',jwtMiddleware,menuController.deleteMenuController)


// Add Item To Cart-jwt
router.post("/add-to-cart",jwtMiddleware,cartController.addToCartController);
// Get User Cart-jwt
router.get("/get-cart",jwtMiddleware,cartController.getCartController);
// Update Cart Quantity-jwt
router.patch("/cart/:id/edit",jwtMiddleware,cartController.updateCartController);
// Remove Cart Item-jwt
router.delete("/cart/:id/delete",jwtMiddleware,cartController.removeCartItemController);
// Clear Cart-jwt
router.delete("/cart/delete",jwtMiddleware,cartController.clearCartController);


//==========================================ORDERS==========================================
// Place Order
router.post("/place-order", jwtMiddleware, orderController.placeOrderController);
// Get Logged-in User Orders
router.get("/user-order", jwtMiddleware, orderController.getUserOrdersController);
// Get All Orders (Admin)
router.get("/all-order", jwtMiddleware, orderController.getAllOrdersController);
// Update Order Status (Admin)
router.patch("/order/:id/status", jwtMiddleware, orderController.updateOrderStatusController);
// Cancel Order (User)
router.patch("/order/:id/cancel", jwtMiddleware, orderController.cancelOrderController);

// ==========================================RESERVATIONS==========================================
// Create Reservation
router.post("/reservations", jwtMiddleware, reservationController.createReservationController);
// Get All Reservations (Admin)
router.get("/reservations/all", jwtMiddleware, reservationController.getAllReservationsController);
// Get Logged-in User Reservations
router.get("/reservations/user", jwtMiddleware, reservationController.getUserReservationsController);
// Get Single Reservation
router.get("/reservations/:id", jwtMiddleware, reservationController.getSingleReservationController);
// Update Reservation
router.patch("/reservations/:id", jwtMiddleware, reservationController.updateReservationController);
// Confirm Reservation (Admin)
router.patch("/reservations/:id/confirm", jwtMiddleware, reservationController.confirmReservationController);
// Mark Reservation as Arrived (Admin)
router.patch("/reservations/:id/arrived", jwtMiddleware, reservationController.markArrivedController);
// Cancel Reservation
router.delete("/reservations/:id", jwtMiddleware, reservationController.cancelReservationController);
// Get Available Slots
router.get("/reservations/slots", reservationController.getAvailableSlotsController);

// ==========================================OFFERS==========================================

// Add Offer
router.post("/offers", jwtMiddleware, offerController.addOfferController);
// Get All Offers
router.get("/offers", offerController.getOffersController);
// Get Single Offer
router.get("/offers/:id", offerController.getSingleOfferController);
// Update Offer
router.patch("/offers/:id", jwtMiddleware, offerController.updateOfferController);
// Delete Offer
router.delete("/offers/:id", jwtMiddleware, offerController.deleteOfferController);
// Apply Coupon
router.post("/promotions/apply", jwtMiddleware, offerController.applyCouponController);

// ==========================================REVIEWS==========================================
// Add Review
router.post("/review/add", jwtMiddleware, reviewController.addReviewController);
// Get All Reviews
router.get("/review/all", reviewController.getAllReviewsController);
// Get Single Review
router.get("/review/:id", reviewController.getSingleReviewController);
// Get Reviews By Menu Item
router.get("/review/menu/:menuId", reviewController.getMenuReviewsController);
// Get Logged-in User Reviews
router.get("/review/user", jwtMiddleware, reviewController.getUserReviewsController);
// Update Review
router.put("/review/update/:id", jwtMiddleware, reviewController.updateReviewController);
// Delete Review
router.delete("/review/delete/:id", jwtMiddleware, reviewController.deleteReviewController);



// ==========================================ADDRESS==========================================
// Add Address
router.post("/addresses", jwtMiddleware, addressController.addAddressController);
// Get User Addresses
router.get("/addresses", jwtMiddleware, addressController.getUserAddressesController);
// Get Single Address
router.get("/addresses/:id", jwtMiddleware, addressController.getSingleAddressController);
// Update Address
router.patch("/addresses/:id", jwtMiddleware, addressController.updateAddressController);
// Delete Address
router.delete("/addresses/:id", jwtMiddleware, addressController.deleteAddressController);




// ==========================================PAYMENTS==========================================
// Add Card
router.post("/payments/cards", jwtMiddleware, paymentController.addCardController);
// Get User Cards
router.get("/payments/cards", jwtMiddleware, paymentController.getCardsController);
// Get Payment Methods
router.get("/payments/methods", paymentController.getPaymentMethodsController);
// Delete Card
// ==========================================
router.delete("/payments/cards/:id", jwtMiddleware, paymentController.deleteCardController);


// ==========================================NOTIFICATION==========================================
// Create Notification
router.post("/notifications", jwtMiddleware, notificationController.createNotificationController);
// Get User Notifications
router.get("/notifications", jwtMiddleware, notificationController.getNotificationsController);
// Get Unread Notification Count
router.get("/notifications/unread", jwtMiddleware, notificationController.getUnreadCountController);
// Mark Notification As Read
router.patch("/notifications/:id", jwtMiddleware, notificationController.markAsReadController);
// Delete Notification
// ==========================================
router.delete("/notifications/:id", jwtMiddleware, notificationController.deleteNotificationController);

// ==========================================DASHBOARD==========================================
// Get Dashboard Metrics
router.get("/dashboard/metrics", jwtMiddleware, dashboardController.getDashboardMetricsController);
// Get Live Orders
router.get("/dashboard/live-orders", jwtMiddleware, dashboardController.getLiveOrdersController);
// Get Weekly Revenue
router.get("/dashboard/weekly-revenue", jwtMiddleware, dashboardController.getWeeklyRevenueController);
// Get Upcoming Reservations
router.get("/dashboard/upcoming-reservations", jwtMiddleware, dashboardController.getUpcomingReservationsController);

// ==========================================STAFF==========================================
// Add Staff
router.post("/staff", jwtMiddleware, staffController.addStaffController);
// Get All Staff
router.get("/staff", jwtMiddleware, staffController.getStaffController);
// Get Single Staff
// ==========================================
router.get("/staff/:id", jwtMiddleware, staffController.getSingleStaffController);
// Update Staff
router.patch("/staff/:id", jwtMiddleware, staffController.updateStaffController);
// Deactivate Staff
router.patch("/staff/:id/deactivate", jwtMiddleware, staffController.deactivateStaffController);
// Search Staff
router.get("/staff/search", jwtMiddleware, staffController.searchStaffController);


// ==========================================SETTINGS==========================================
// Get Restaurant Profile
router.get("/settings/profile", jwtMiddleware, settingsController.getRestaurantProfileController);
// Update Restaurant Profile
router.patch("/settings/profile", jwtMiddleware, settingsController.updateRestaurantProfileController);
// Upload Logo
router.post("/settings/logo", jwtMiddleware, multerMiddleware.single("logo"), settingsController.uploadLogoController);
// Get Theme Settings
router.get("/settings/theme", jwtMiddleware, settingsController.getThemeController);
// Save Settings
router.patch("/settings", jwtMiddleware, settingsController.saveSettingsController);
// Get User Roles
router.get("/settings/roles", jwtMiddleware, settingsController.getRolesController);
// Update User Roles
router.patch("/settings/roles/:id", jwtMiddleware, settingsController.updateRolesController);

//==========================================GLOBAL SEARCH==========================================
// Global Search
router.get("/search", jwtMiddleware, searchController.globalSearchController);




module.exports = router