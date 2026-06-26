const carts = require("../model/cartModel")


// Add Item To Cart
exports.addToCartController = async (req, res) => {
  try {

    const userId = req.userId;

    const { menuId, foodName, image, price } = req.body;

    const existingItem = await carts.findOne({ userId, menuId });

    if (existingItem) {

      existingItem.quantity += 1;
      existingItem.subtotal =
        existingItem.quantity * existingItem.price;

      await existingItem.save();

      return res.status(200).json(existingItem);
    }

    const newCart = new carts({
      userId,
      menuId,
      foodName,
      image,
      price,
      quantity: 1,
      subtotal: price,
    });

    await newCart.save();

    res.status(201).json(newCart);

  } catch (err) {
    res.status(500).json(err);
  }
};


// Get Logged-in User Cart
exports.getCartController = async (req, res) => {
  try {

    const userId = req.userId;

    const cartItems = await carts.find({ userId });

    res.status(200).json(cartItems);

  } catch (err) {
    res.status(500).json(err);
  }
};


// Update Cart Quantity
exports.updateCartController = async (req, res) => {
  try {

    const { id } = req.params;

    const { quantity } = req.body;

    const cartItem = await carts.findById(id);

    if (!cartItem) {
      return res.status(404).json("Cart item not found");
    }

    cartItem.quantity = quantity;
    cartItem.subtotal = quantity * cartItem.price;

    await cartItem.save();

    res.status(200).json(cartItem);

  } catch (err) {
    res.status(500).json(err);
  }
};


// Remove Single Cart Item
exports.removeCartItemController = async (req, res) => {
  try {

    const { id } = req.params;

    await carts.findByIdAndDelete(id);

    res.status(200).json("Item removed successfully");

  } catch (err) {
    res.status(500).json(err);
  }
};


// Clear Cart
exports.clearCartController = async (req, res) => {
  try {

    const userId = req.userId;

    await carts.deleteMany({ userId });

    res.status(200).json("Cart cleared successfully");

  } catch (err) {
    res.status(500).json(err);
  }
};