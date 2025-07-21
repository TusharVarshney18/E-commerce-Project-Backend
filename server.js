import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import foodRouter from "./Routes/foodRoute.js";
import userRouter from "./Routes/UserRoute.js";
import cartRouter from "./Routes/CartRoute.js";
import orderRouter from "./Routes/OrderRoute.js";

dotenv.config(); // Initialize environment variables

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-project-frontend-six.vercel.app/",
      "https://e-commerce-project-admin-ten.vercel.app",
      "https://e-commerce-project-backend-psi.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Serve Static Files
app.use("/images", express.static(path.join(process.cwd(), "Uploads")));

// Database Connection
connectDB();

// Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("API is working");
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running locally at http://localhost:${port}`);
});

export default app;
