import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUser = await User.find({_id: {$ne: loggedInUser}}).select("-password");
        if(!filteredUser){
            return res.status(401).json({message: "Failed to fetch users!"});
        }
        res.status(201).json(filteredUser);
    } catch (error) {
        console.log("Error in sidebarUsers controller! ", error.message);
        res.status(500).json({message: "Internal server error!"});
    }
}
export const getMessages = async (req, res) => {
    try {
        const {id: userToChat} = req.param;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId: senderId, receiverId: userToChat},
                {senderId: userToChat, receiverId: myId}
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller! ", error.message);
        res.status(500).json({message: "Internal server error!"});
    }
}
export const sendMessage = async (req,res) => {
    try {
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        const {text, image} = req.body;
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();
        // Still to go
        //Implementation of real-time communication with socket.io

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller! ", error.message);
        res.status(500).json({message: "Internal server error!"});
    }
}