import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    const {fullname, email, password} = req.body;
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message:"All fields are required!"});
        }
        if(password.length < 6){
           return res.status(400).json({message: "Password should be more than or equal to 6 characters!"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){ return res.statusCode(400).json({message: "User already exists!"});}
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email:newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({message: "Invalid user data!"});
        }

    } catch (error) {
        res.status(400).json({message: "Internal server error"});
    }
}


export const login = (req, res) => {
    res.send("login route");
}
export const logout = (req, res) => {
    res.send("logout route");
}