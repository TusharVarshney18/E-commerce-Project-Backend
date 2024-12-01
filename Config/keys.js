import dotenv from "dotenv";
dotenv.config();


const keys = {
  jwt_secret: process.env.JWT_SECRET,
};

export default keys;
