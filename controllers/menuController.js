const menus = require("../model/menuModal");


//add menu item
exports.addMenuItemController = async (req, res) => {
  console.log("Inside addProjectController");
  const userId = req.userId
  console.log(userId);
  const { itemName, description, category, price,availability } = req.body
  const menuPic = req.file.filename
  console.log(itemName, description, category, price,menuPic);

  try {
    const existingMenuItem = await menus.findOne({ itemName })
    if (existingMenuItem) {
      res.status(406).json("Menu already exists in our collection...Please upload another one!!!")
    } else {
      const newMenuItem = new menus({
        itemName,
        description,
        category,
        price,
        menuPic,
        userId
      })
      await newMenuItem.save()
      res.status(200).json(newMenuItem)
    }
  } catch (error) {
    res.status(401).json(error)
  }

}



//get all menu item
exports.getAllMenuItemsController = async (req, res) => {
  try {
    const getAllmenuItems = await menus.find();

    res.status(200).json(getAllmenuItems);
  } catch (err) {
    res.status(500).json(err);
  }
};
//get single menu item
exports.getSingleMenuItemController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const getsingleitem = await menus.findById(id);

    if (! getsingleitem) {
      return res
        .status(404)
        .json("Food item not found");
    }

    res.status(200).json(getsingleitem);
  } catch (err) {
    res.status(500).json(err);
  }
};

//edit menu
exports.editMenuController = async (req, res) => {
  const { id } = req.params;

  const { itemName, description, category, price, availability,menuPic } = req.body;

  const uploadImage = req.file ? req.file.filename : menuPic;

  try {
    const updatedMenu = await menus.findByIdAndUpdate(
      id,
      {
        itemName,
        description,
        category,
        price,
        menuPic: uploadImage,
         availability,
      },
      { new: true }
    );

    await updatedMenu.save();

    res.status(200).json(updatedMenu);
  } catch (err) {
    res.status(401).json(err);
  }
};

// Delete Menu
exports.deleteMenuController = async (req, res) => {
  const { id } = req.params;

  try {
    await menus.findByIdAndDelete(id);

    res.status(200).json("Menu Deleted Successfully");
  } catch (err) {
    res.status(401).json(err);
  }
};