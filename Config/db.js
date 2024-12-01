import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();




const mongokey = process.env.MONGO_KEY;
export const connectDB = async () => {
  await mongoose
    .connect(mongokey
      ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("DB Connected");
    });
};
