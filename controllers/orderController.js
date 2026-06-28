const orders = require ("../model/orderModel")
const carts = require ("../model/cartModel")




// Place Order
exports.placeOrderController = async (req, res) => {

  try {

    const userId = req.userId;

    const { deliveryAddress, paymentMethod } = req.body;

    // Get all cart items
    const cartItems = await carts.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json("Cart is empty");
    }

    // Calculate Total Amount
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    // Create Order
    const newOrder = new orders({
      userId,
      items: cartItems,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await newOrder.save();

    // Clear Cart After Order
    await carts.deleteMany({ userId });

    res.status(201).json(newOrder);

  } catch (err) {
    res.status(500).json(err);
  }

};


// Get Logged-in User Orders
exports.getUserOrdersController = async (req, res) => {

  try {

    const userId = req.userId;

    const userOrders = await orders.find({ userId });

    res.status(200).json(userOrders);

  } catch (err) {

    res.status(500).json(err);

  }

};



// Get All Orders (Admin)
exports.getAllOrdersController = async (req, res) => {

  try {

    const allOrders = await orders.find();

    res.status(200).json(allOrders);

  } catch (err) {

    res.status(500).json(err);

  }

};



// Update Order Status (Admin)
exports.updateOrderStatusController = async (req, res) => {

  try {

    const { id } = req.params;

    const { orderStatus } = req.body;

    const updatedOrder = await orders.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    res.status(200).json(updatedOrder);

  } catch (err) {

    res.status(500).json(err);

  }

};



// Cancel Order (User)
exports.cancelOrderController = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedOrder = await orders.findByIdAndUpdate(
      id,
      { orderStatus: "Cancelled" },
      { new: true }
    );

    res.status(200).json(updatedOrder);

  } catch (err) {

    res.status(500).json(err);

  }

};