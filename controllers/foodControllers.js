import foodModel from "../models/foodModels.js";
import fs from "fs";

// Add food Item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
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

    fs.unlink(`Uploads/${food.image}`, () => {}); // Delete Images from uploads and mongoDB
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, mesaage: "Food Successfully Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error have been founded " });
  }
};

export { addFood, listFood, removeFood };
