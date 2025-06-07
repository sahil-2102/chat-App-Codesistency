import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authorized" });
    const decode = jwt.verify(token, process.env.jwt_SECRET);
    req.user = await User.findById(decode.userId).select("-password");
    next();
}