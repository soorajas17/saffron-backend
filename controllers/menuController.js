const menu = require("../model/menuModal")

//add menu item
exports.addMenuItem = async (req, res) => {
  try {
    const {
      foodName,
      category,
      description,
      price,
      image,
    } = req.body;

    const existingFood = await Menu.findOne({
      foodName,
    });

    if (existingFood) {
      return res.status(406).json(
        "Food item already exists"
      );
    }

    const newFood = new Menu({
      foodName,
      category,
      description,
      price,
      image,
    });

    await newFood.save();

    res.status(200).json(newFood);
  } catch (err) {
    res.status(500).json(err);
  }
};
//get all menu item
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();

    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json(err);
  }
};
//get single menu item
exports.getSingleMenuItem = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const item = await Menu.findById(id);

    if (!item) {
      return res
        .status(404)
        .json("Food item not found");
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
};
//update menu
exports.updateMenuItem = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      foodName,
      category,
      description,
      price,
      image,
      availability,
    } = req.body;

    const updatedFood =
      await Menu.findByIdAndUpdate(
        id,
        {
          foodName,
          category,
          description,
          price,
          image,
          availability,
        },
        {
          new: true,
        }
      );

    res.status(200).json(updatedFood);
  } catch (err) {
    res.status(500).json(err);
  }
};
//delete menu
exports.deleteMenuItem = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    await Menu.findByIdAndDelete(id);

    res
      .status(200)
      .json("Food item deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};