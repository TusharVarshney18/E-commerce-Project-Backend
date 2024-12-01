import orderModel from "../models/orderModels.js"
import userModel from "../models/UserModels.js";
import Razorpay from "razorpay"
import dotenv from 'dotenv';
import crypto from "crypto";

dotenv.config();

console.log({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
})
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});


//placing order for frontend 
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    // Check if all required fields are provided
    if (!userId || !items || !amount || !address || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, items, amount, address, or paymentMethod",
      });
    }

    // Create an order in the database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod, // Ensure this field is saved in your database schema
      status: "Pending",
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Generate Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects the amount in paisa
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await instance.orders.create(options);

    // Send the order details to the frontend
    res.json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error in placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



const verifyorder = async (req, res) => {
  const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  try {
    // Generate expected signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log(razorpay_payment_id, razorpay_signature, razorpay_order_id)

    // Compare signatures
    if (generated_signature === razorpay_signature) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};

const userorders = async (req, res) => {
  try {
    const order = await orderModel.find({ userId: req.body.userId })
    res.json({ success: true, data: order })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error })
  }

}

// listing order for admin panel

const listOrders = async (req, res) => {

  try {
    const orders = await orderModel.find({})
    res.json({ success: true, data: orders })


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })

  }
}

// Api for updating order status

const updateStatus = async (req, res) => {
  try {

    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({ success: true, message: "Status Updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }

}




export { placeOrder, verifyorder, userorders, listOrders, updateStatus }