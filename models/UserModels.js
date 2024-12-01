import mongoose from "mongoose";

// login cart Schema set

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } // minimize false helps to create empty cartData if not provided
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
