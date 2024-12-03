import foodModel from "../models/foodModels.js";
import cloudinary from "../Config/cloudinaryConfig.js";

// Add food Item

const addFood = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "foodItems",
      use_filename: true,
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url, // Save the Cloudinary URL
    });

    await food.save();
    res.json({ success: true, message: "Food Added", data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Adding Food" });
  }
};

// All Food List
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food Item Not Found" });
    }

    const publicId = food.image.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`foodItems/${publicId}`);
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Successfully Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Removing Food Item" });
  }
};

export { addFood, listFood, removeFood };
