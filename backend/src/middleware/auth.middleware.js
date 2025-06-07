import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Not authorized" });
    const decode = jwt.verify(token, process.env.jwt_SECRET);
    req.user = await User.findById(decode.userId).select("-password");
    next();
  } catch (error) {
    console.log("Error in logout controller! ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
