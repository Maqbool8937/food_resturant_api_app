import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

// REGISTER CONTROLLER
export const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;

        // Basic validation
        if (!userName || !email || !password || !phone || !answer || !address) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
        });

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
        });
    } catch (error) {
        console.error("Error in registerController:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// LOGIN CONTROLLER
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide Email and Password",
                success: false,
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// Reset Paassword Controller
export const resetPasswordCoontroller = async (req, res) => {

}