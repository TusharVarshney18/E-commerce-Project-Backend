import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodControllers.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Route Engine

const storage = multer.diskStorage({
  destination: process.env.NODE_ENV === "production" ? "/tmp/uploads" : "Uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
