import userModel from "../models/UserModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import keys from "../Config/keys.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesnt exists" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, keys.jwt_secret);
};

//register user

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking user is already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User is Already exists" });
    }

    //Validating email format and Strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter A Valid Email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter A Strong Password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashpassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id); // token generated

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: "Error" });
  }
};

//Route for Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET,)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid Credentials" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export { loginUser, registerUser, adminLogin };
