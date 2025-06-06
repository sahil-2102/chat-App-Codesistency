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


export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) return res.status(400).json({message: "All fields are required!"});
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials!"});
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword) {
            return res.status(400).json({message:"Invalid credentials!"});
        }

        generateToken(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullname:user.fullname,
            email:user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        res.status(401).json({success: false, message: "An error occured!"});
    }
}
export const logout = (req, res) => {
    res.send("logout route");
}