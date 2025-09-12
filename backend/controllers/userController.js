import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwtToken from "../utils/jwtToken.js";

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "EMAIL IN USE" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashPassword,
    });

    await newUser.save();

    const token = jwtToken({ id: newUser._id });

    res.status(201).json({
      token,
      user: {
        email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "SERVER ERROR",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "USER NOT FOUND" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "INVALID PASSWORD OR EMAIL" });
    }

    const token = jwtToken({ id: user._id });

    res.status(200).json({
      token,
      user: {
        email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "SERVER ERROR",
      error: error.message,
    });
  }
};
