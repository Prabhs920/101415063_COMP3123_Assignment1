import mongoose from "mongoose";
import User from "../models/user.model.js";
import SHA256 from "js-sha256"

export const registerUser = async (req, res) => {
    const userData = req.body;

    if (!userData.username && !userData.email) {
        res.status(400);
        throw new Error("Please Enter either username or email");
    }

    const hashedPassword = SHA256(userData.password)
    userData.password = hashedPassword
    const date = new Date();
    userData.created_at = date
    userData.updated_at = date 

    const user = new User(userData)

    try {
        await user.save();
        res.status(201).json({ success: true, 
            message: "user successfully created",
            id: user.id
         });
    } catch (error) {
        console.error("Error in Create user:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const authUser = async (req, res) => {
    const { username, email } = req.body;

    const user = await User.findOne({ username: username, email: email });
    // const username = await User.findOne({ email });

    if (user) {
        res.status(200).json({
            message: "login successfull",
            _id: user._id,
        });
    } else {
        res.status(401).json({ success: false, message: "user does not exists"})
    }
};