import MenuItem from "../models/itemModel.js";

const createItem = async (req, res) => {
  try {
    const {itemName,description,price} = req.body;

    if(!itemName || !description || !price) {
      return res.json({
        success: false,
        message: "All fields (itemName, description, price) are required.",
      });
    }

    const newItem = new MenuItem({
      menuId: req.params.menuId,
      name: itemName,
      description,
      price
    });

    console.log(newItem);

    await newItem.save();

    res.status(201).json({
      success: true,
      newItem,
      message: "New item added..!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the item. Please try again.",
      error: error.message,
    });
  }
};

export { createItem };
