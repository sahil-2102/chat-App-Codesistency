import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Not authorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Invalid token!" });
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    console.log("Error in protect controller! ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
