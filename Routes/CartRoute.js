import express from "express";
import authMiddleWare from "../middleware/auth.js";
import {
  addToCart,
  RemovefromCart,
  getCard,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleWare, addToCart);
cartRouter.post("/remove", authMiddleWare, RemovefromCart);
cartRouter.post("/get", authMiddleWare, getCard);

export default cartRouter;
