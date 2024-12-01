import express from "express";
import { placeOrder, verifyorder, userorders, listOrders, updateStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post("/verify", verifyorder);
orderRouter.post("/userorders", authMiddleware, userorders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus)

// Route to verify Razorpay payment

export default orderRouter;
