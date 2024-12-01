// File Path: middlewares/authMiddleware.js

import jwt from "jsonwebtoken";
import keys from "../Config/keys.js";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Please log in again.",
    });
  }

  try {
    const decodedToken = jwt.verify(token, keys.jwt_secret);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export default authMiddleware;


