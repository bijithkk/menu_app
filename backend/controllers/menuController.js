import menuModel from "../models/menuModel.js";

const createMenu = async (req, res) => {
  try {
    const { menuName, menuDescription } = req.body;

    if (!menuName || !menuDescription) {
      return res.json({
        success: false,
        message: "All fields (Menu Name, description) are required.",
      });
    }

    const newMenu = new menuModel({
      name: req.body.menuName,
      description: req.body.menuDescription,
    });

    console.log(newMenu);

    await newMenu.save();

    res.status(201).json({
      success: true,
      newMenu,
      message: "New Menu added..!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "An error occurred while creating the menu. Please try again.",
        error: error.message,
      });
  }
};

const getMenu = async (req, res) => {
  try {
    console.log(req.params.menuId);
    const menu = await menuModel.findById(req.params.menuId).populate("items");

    res.json({
      success: true,
      menu,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllMenu = async (req, res) => {
  try {
    const menus = await menuModel.find().populate("items");

    res.json({
      success: true,
      menus,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createMenu, getMenu, getAllMenu };
