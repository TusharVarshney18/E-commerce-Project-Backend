import express from "express";

import cors from "cors";
import { connectDB } from "./Config/db.js";
import foodRouter from "./Routes/foodRoute.js";
import userRouter from "./Routes/UserRoute.js";
import cartRouter from "./Routes/CartRoute.js";
import orderRouter from "./Routes/OrderRoute.js";
// App confiq
const app = express();
const port = 4000;

// Middleware

app.use(express.json());
app.use(cors());

// Db Connection
connectDB();

// Api End Point
app.use("/api/food", foodRouter);
app.use("/images", express.static("Uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


app.get("/", (req, res) => {
  res.send("api is working");
});

app.listen(port, () => {
  console.log(`server has started on http://localhost:${port}`);
});