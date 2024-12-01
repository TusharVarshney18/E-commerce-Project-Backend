import express from "express";
import { loginUser, registerUser, adminLogin } from "../controllers/userControllers.js";
import adminAuth from "../middleware/AdminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

// protected Admin Route
userRouter.get("/admin/dashboard", adminAuth, (req, res) => {
   res.json({ success: true, message: "Welcome to the admin dashboard!" });
});


export default userRouter;
